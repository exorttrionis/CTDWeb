from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import views as auth_views
import debug_toolbar
from django.urls import include, path
urlpatterns = [
    path('finish-task/', FinishTask.as_view()),
    path('remove-task/', DeleteTask.as_view()),
    path('get-file/', DownloadFile.as_view()),
    path('get-all-task/', GetListTask.as_view()),
    path('test-upload/', GetFileUpload.as_view()),
    path('getuser/', Getuser.as_view()),
    path('logout/', Logout.as_view()),
    path('log/', Login.as_view()),
    path('new/', NewPageView.as_view(), name='new'),
    path('about/', AboutPageView.as_view(), name='about'),
    path('Dao-tao/', EduPageView.as_view(), name='edu'),
    path('accounts/login/', LoginView.as_view(), name='login'),
    path('adminsite', login_required(AdminPageView.as_view()), name='adminsite'),
    path('', HomePageView.as_view(), name='Home'),
    path('__debug__/', include(debug_toolbar.urls)),
]
