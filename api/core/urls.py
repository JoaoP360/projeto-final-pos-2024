from rest_framework.routers import DefaultRouter # type: ignore
from .views import UserViewSet, PostViewSet, CommentViewSet, AlbumViewSet, PhotoViewSet
from django.urls import path # type: ignore
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
router.register(r'todos', views.TodoViewSet)

urlpatterns = router.urls
from django.urls import path # type: ignore
from . import views

