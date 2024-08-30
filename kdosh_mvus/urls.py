from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from kdosh_mvus import views

router = routers.DefaultRouter()
router.register(r'categorias', views.CategoriasView, 'categorias')
router.register(r'productos', views.ProductoView, 'productos')
router.register(r'atributos', views.AtributoView, 'atributos')
router.register(r'valores_atributos', views.ValorAtributoView, 'valores_atributos')
router.register(r'producto_atributos', views.ProductoAtributoView, 'producto_atributos')
router.register(r'imagenes', views.ImagenView, 'imagenes')
router.register(r'notificaciones', views.NotificacionView, 'notificaciones')
router.register(r'categoria_blogs', views.CategoriaBlogView, 'categoria_blogs')
router.register(r'blogs', views.BlogView, 'blogs')

urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title="KDOSH API's")),
]