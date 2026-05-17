from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_home),
    path('departments/', views.departments),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('dashboard/', views.dashboard_stats),
    path('mark-attendance/', views.mark_attendance),
    path('report/', views.attendance_report),
]