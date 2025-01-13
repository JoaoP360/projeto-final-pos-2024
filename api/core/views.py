from rest_framework import viewsets
from .models import User, Post, Comment, Album, Photo, Todo
from rest_framework.response import Response
from .serializers import UserSerializer, PostSerializer, CommentSerializer, AlbumSerializer, PhotoSerializer, TodoSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bem-vindo!")
     
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    def get_queryset(self):
        user_pk = self.kwargs.get("user_pk")
        if user_pk:
            return Album.objects.filter(user=user_pk)
        return super().get_queryset()

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer