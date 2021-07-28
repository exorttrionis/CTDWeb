from django.urls import path
from .views import HomePageView, AdminPageView, LoginView, Login, Logout, Getuser, createTask, Getadmin, checkTask, ChangeTask, DelTask
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('deleteTask/', DelTask.as_view()),
    path('changeTask/', ChangeTask.as_view()),
    path('checkTask/', checkTask.as_view()),
    path('createTask/', createTask.as_view()),
    path('getadmin/', Getadmin.as_view()),
    path('getuser/', Getuser.as_view()),
    path('logout/', Logout.as_view()),
    path('log/', Login.as_view()),
    path('accounts/login/', LoginView.as_view(), name='login'),
    path('adminsite', login_required(AdminPageView.as_view()), name='adminsite'),
    path('', HomePageView.as_view(), name='Home'),
]
