from rest_framework import viewsets
from .models import User, Post, Comment, Album, Photo
from .serializers import UserSerializer, PostSerializer, CommentSerializer, AlbumSerializer, PhotoSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def home(request):
    return HttpResponse("Bem-vindo!")

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return JsonResponse({"message": "Login bem-sucedido!", "user_id": user.id})
            else:
                return JsonResponse({"message": "Senha incorreta!"}, status=400)
        except User.DoesNotExist:
            return JsonResponse({"message": "Usuário não encontrado!"}, status=400)

    return JsonResponse({"message": "Método não permitido!"}, status=405)

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

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
