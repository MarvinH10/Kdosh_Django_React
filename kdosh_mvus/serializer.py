from rest_framework import serializers
from .models import Categoria, Producto, Atributo, ValorAtributo, ProductoAtributo, Imagen, Notificacion, CategoriaBlog, Blog

class CategoriasSerializer(serializers.ModelSerializer):
    parent_nombre = serializers.SerializerMethodField()
    combinacion = serializers.SerializerMethodField()
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'combinacion', 'parent', 'parent_nombre', 'created_at', 'updated_at']
    
    def get_parent_nombre(self, obj):
        return obj.parent.nombre if obj.parent else None
    
    def get_combinacion(self, obj):
        if obj.parent:
            parent_combinacion = self.get_combinacion(obj.parent)
            return f"{parent_combinacion} / {obj.nombre}"
        else:
            return obj.nombre

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

    def create(self, validated_data):
        producto = Producto.objects.create(**validated_data)
        return producto

class AtributosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atributo
        fields = '__all__'

class ValorAtributosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValorAtributo
        fields = '__all__'

class ProductoAtributosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoAtributo
        fields = '__all__'

class ImagensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = '__all__'

class NotificacionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'

class CategoriaBlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaBlog
        fields = '__all__'

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'