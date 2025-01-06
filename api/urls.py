from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('core/', include('core.urls')),  # Rota para o app "core"
    path('api/', include('core.urls')),  # Inclui as rotas de "core" também em "api/"
]
