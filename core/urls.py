from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet, CommentViewSet, AlbumViewSet, PhotoViewSet
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  
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

