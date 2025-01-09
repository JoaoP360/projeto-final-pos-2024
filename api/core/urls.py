from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet, CommentViewSet, AlbumViewSet, PhotoViewSet
from django.urls import path
from . import views
from .views import login_view

urlpatterns = [
    path('', views.home, name='home'),  
    path('api/login/', login_view),
]
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'photos', PhotoViewSet)

urlpatterns = router.urls
from django.urls import path
from . import views

