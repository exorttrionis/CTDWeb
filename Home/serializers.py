import rest_framework
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import permissions
from Home.models import (
    Task,
    TaskFile,
    UserExtend,
)
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["author", "title", "content", "deadline", "id_task",
                  "id_check", "id_title", "id_deadline", "task_status", "id_content"]

class TaskFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskFile
        fields = ["task", "url"]

class UserExtendSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExtend
        fields = ["user", "dob", "username", "avatar"]
