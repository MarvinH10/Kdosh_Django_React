from rest_framework import viewsets
from .serializer import CategoriasSerializer, ProductosSerializer, AtributosSerializer, ValorAtributosSerializer, ProductoAtributosSerializer, ImagensSerializer, NotificacionsSerializer, CategoriaBlogsSerializer, BlogsSerializer
from .models import Categoria, Producto, Atributo, ValorAtributo, ProductoAtributo, Imagen, Notificacion, CategoriaBlog, Blog

class CategoriasView(viewsets.ModelViewSet):
    serializer_class = CategoriasSerializer
    queryset = Categoria.objects.all()


class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductosSerializer
    queryset = Producto.objects.all()


class AtributoView(viewsets.ModelViewSet):
    serializer_class = AtributosSerializer
    queryset = Atributo.objects.all()


class ValorAtributoView(viewsets.ModelViewSet):
    serializer_class = ValorAtributosSerializer
    queryset = ValorAtributo.objects.all()


class ProductoAtributoView(viewsets.ModelViewSet):
    serializer_class = ProductoAtributosSerializer
    queryset = ProductoAtributo.objects.all()

class ImagenView(viewsets.ModelViewSet):
    serializer_class = ImagensSerializer
    queryset = Imagen.objects.all()

class NotificacionView(viewsets.ModelViewSet):
    serializer_class = NotificacionsSerializer
    queryset = Notificacion.objects.all()

class CategoriaBlogView(viewsets.ModelViewSet):
    serializer_class = CategoriaBlogsSerializer
    queryset = CategoriaBlog.objects.all()

class BlogView(viewsets.ModelViewSet):
    serializer_class = BlogsSerializer
    queryset = Blog.objects.all()