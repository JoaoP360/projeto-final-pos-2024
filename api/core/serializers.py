from rest_framework import serializers # type: ignore
from .models import User, Post, Comment, Album, Photo, Todo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.name')
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    class Meta:
        model = Album
        fields = ['id', 'title', 'user', 'user_id']
        
    def create(self, validate_data):
        user_id = validate_data.pop('user')['name']
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError({"user": "Usuário não encontrado."})

        album = Album.objects.create(user=user, **validate_data)
        return album
    
    def update(self, instance, validate_data):
        instance.title = validate_data.get('title', instance.title)
        instance.save()
        return instance

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'