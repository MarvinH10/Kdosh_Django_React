from django.contrib import admin
from .models import Categoria, Producto, Atributo, ValorAtributo, ProductoAtributo, Imagen, Notificacion, CategoriaBlog, Blog

admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(Atributo)
admin.site.register(ValorAtributo)
admin.site.register(ProductoAtributo)
admin.site.register(Imagen)
admin.site.register(Notificacion)
admin.site.register(CategoriaBlog)
admin.site.register(Blog)