from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Department, Profile, Attendance


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()
    department = serializers.IntegerField(required=False)
    phone = serializers.CharField(required=False)
    face_image = serializers.ImageField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'role',
            'department',
            'phone',
            'face_image'
        ]

    def create(self, validated_data):
        role = validated_data.pop('role')
        department_id = validated_data.pop('department', None)
        phone = validated_data.pop('phone', '')
        face_image = validated_data.pop('face_image')

        user = User.objects.create_user(**validated_data)

        department = None
        if department_id:
            department = Department.objects.get(id=department_id)

        Profile.objects.create(
            user=user,
            role=role,
            department=department,
            phone=phone,
            face_image=face_image
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='profile.role', read_only=True)
    department = serializers.CharField(source='profile.department.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'department']


class AttendanceSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Attendance
        fields = [
            'id',
            'user',
            'username',
            'email',
            'date',
            'time',
            'status',
            'confidence',
            'location'
        ]