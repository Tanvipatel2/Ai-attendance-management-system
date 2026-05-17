import os
import base64
from datetime import datetime, time

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Department, Profile, Attendance
from .serializers import (
    DepartmentSerializer,
    RegisterSerializer,
    UserSerializer,
    AttendanceSerializer
)
from .ai_utils import compare_faces


@api_view(['GET'])
def api_home(request):
    return Response({
        "message": "AI Attendance Management System API is running"
    })


@api_view(['GET'])
def departments(request):
    data = Department.objects.all()
    serializer = DepartmentSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "User registered successfully"
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        serializer = UserSerializer(user)
        return Response({
            "message": "Login successful",
            "user": serializer.data
        })

    return Response({
        "error": "Invalid username or password"
    }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def dashboard_stats(request):
    total_users = User.objects.count()
    total_attendance = Attendance.objects.count()
    today_attendance = Attendance.objects.filter(
        date=datetime.today().date()
    ).count()
    late_count = Attendance.objects.filter(status='LATE').count()

    return Response({
        "total_users": total_users,
        "total_attendance": total_attendance,
        "today_attendance": today_attendance,
        "late_count": late_count
    })


@api_view(['GET'])
def attendance_report(request):
    records = Attendance.objects.all().order_by('-date', '-time')
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def mark_attendance(request):
    user_id = request.data.get('user_id')
    image_data = request.data.get('captured_image')
    location = request.data.get('location', '')

    if not user_id or not image_data:
        return Response({
            "error": "user_id and captured_image are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)
    except:
        return Response({
            "error": "User profile not found"
        }, status=status.HTTP_404_NOT_FOUND)

    if Attendance.objects.filter(user=user, date=datetime.today().date()).exists():
        return Response({
            "error": "Attendance already marked today"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        format, imgstr = image_data.split(';base64,')
        image_file = ContentFile(
            base64.b64decode(imgstr),
            name=f'{user.username}_live.png'
        )
    except:
        return Response({
            "error": "Invalid image format"
        }, status=status.HTTP_400_BAD_REQUEST)

    live_dir = os.path.join(settings.MEDIA_ROOT, 'live_faces')
    os.makedirs(live_dir, exist_ok=True)

    live_path = os.path.join(live_dir, image_file.name)

    with open(live_path, 'wb') as f:
        f.write(image_file.read())

    is_match, confidence = compare_faces(profile.face_image.path, live_path)

    if not is_match:
        return Response({
            "error": "Face not matched",
            "confidence": confidence
        }, status=status.HTTP_400_BAD_REQUEST)

    current_time = datetime.now().time()

    if current_time > time(9, 30):
        status_value = 'LATE'
    else:
        status_value = 'PRESENT'

    attendance = Attendance.objects.create(
        user=user,
        status=status_value,
        confidence=confidence,
        location=location
    )

    serializer = AttendanceSerializer(attendance)

    return Response({
        "message": "Attendance marked successfully",
        "attendance": serializer.data
    })