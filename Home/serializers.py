import rest_framework
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import permissions
from Home.models import *


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "task_title", "task_content", "priority", "deadline", "taskstatus",
                  "user_create","created_at"]


class FilelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filelist
        fields = ["id", "task", "file_path", "file_type"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ctdprofile
        fields = ["avatar", "user_id"]


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['username', 'id', 'first_name','last_name']
