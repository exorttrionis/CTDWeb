from django.shortcuts import render
# Create your views here.
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from django.http import JsonResponse
from django.views import View
from django.contrib.auth import authenticate, login

from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from Home.models import Task, TaskFile, UserExtend
from Home.serializers import TaskSerializer, TaskFileSerializer, UserExtendSerializer

import datetime


class HomePageView(TemplateView):
    template_name = "Home.html"


@method_decorator(login_required, name='dispatch')
class AdminPageView(TemplateView):
    template_name = "admin.html"


class LoginView(LoginView):
    redirect_authenticated_user = True
    template_name = "login.html"


class Login(View):
    def post(self, request):
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            # print(username)
            # print(password)
            user = authenticate(username=username, password=password)
            if user is not None and (user.is_authenticated):
                login(request, user)
                return JsonResponse("done", status=200, safe=False)
                # return HttpResponseRedirect("http://127.0.0.1:8000/adminsite#")
            else:
                return JsonResponse("fail", status=200, safe=False)


class Logout(View):
    def get(self, request):
        if request.method == 'GET':
            logout(request)
            return JsonResponse("done", status=200, safe=False)


class Getuser(View):
    def get(self, request):
        if request.user.is_authenticated == True:
            username = request.user.username
            return JsonResponse(username, status=200, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class createTask(View):
    def post(self, request):
        if request.method == 'POST':
            title = request.POST.get('title')
            content = request.POST.get('content')
            deadline = request.POST.get('deadline')
            id_content = request.POST.get('id_content')
            id_check = request.POST.get('id_check')
            id_task = request.POST.get('id_task')
            id_deadline = request.POST.get('id_deadline')
            deadline = datetime.datetime.strptime(
                deadline, '%d/%m/%Y').strftime('%Y-%m-%d')
            id_title = request.POST.get('id_title')
            author = request.POST.get('author')
            task_status = request.POST.get('task_status')
            NewTask = Task(title=title, content=content, deadline=deadline,
                           id_content=id_content, id_check=id_check,
                           id_task=id_task, id_deadline=id_deadline, id_title=id_title, author=author, task_status=task_status)
            NewTask.save()
            return JsonResponse('done', status=200, safe=False)


class Getadmin(View):
    def get(self, request):
        if request.user.is_authenticated == True:
            ListTask = Task.objects.all()
            serializer = TaskSerializer(ListTask, many=True)
            return JsonResponse(serializer.data, status=200, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class checkTask(View):
    def post(self, request):
        if request.user.is_authenticated == True and request.method == 'POST':
            id_task = request.POST.get('id_task')
            status = request.POST.get('task_status')
            obj = Task.objects.get(id_task=id_task)
            obj.task_status = status
            obj.save()
            return JsonResponse("done check ", status=200, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class ChangeTask(View):
    def post(self, request):
        if request.user.is_authenticated == True and request.method == 'POST':
            id_task = request.POST.get('id_task')
            new_content = request.POST.get('new_content')
            new_deadline = request.POST.get('new_deadline')
            new_deadline = datetime.datetime.strptime(
            new_deadline, '%d/%m/%Y').strftime('%Y-%m-%d')
            new_title = request.POST.get('new_title')
            obj = Task.objects.get(id_task=id_task)
            obj.content = new_content
            obj.deadline = new_deadline
            obj.title = new_title
            obj.save()
            return JsonResponse("done check ", status=200, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class DelTask(View):
    def post(self, request):
        if request.user.is_authenticated == True and request.method == 'POST':
            id_task = request.POST.get('id_task')
            print(id_task)
            obj = Task.objects.get(id_task=id_task)
            obj.delete()
            return JsonResponse("done delete ", status=200, safe=False)
