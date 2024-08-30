from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=200)
    # compuesto = models.CharField(max_length=500)
    parent = models.ForeignKey(
        'self', 
        null=True, 
        blank=True, 
        on_delete=models.CASCADE,
        related_name='children'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    codigo = models.CharField(max_length=200)
    detalle = models.TextField(null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.BooleanField(default=True)
    esFavorito = models.BooleanField(default=True)
    prioridad = models.IntegerField(default=0)
    categoria = models.ForeignKey(
        'Categoria',
        on_delete=models.CASCADE,
        related_name='productos'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre
    
class Atributo(models.Model):
    nombre = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre
    
class ValorAtributo(models.Model):
    # atributo = models.ForeignKey(
    #     'Atributo',
    #     on_delete=models.CASCADE,
    #     related_name='valores_atributos'
    # )
    valor = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.valor
    
class ProductoAtributo(models.Model):
    producto = models.ForeignKey(
        'Producto', 
        on_delete=models.CASCADE,
        related_name='producto_atributos'
    )
    valor_atributo = models.ForeignKey(
        'ValorAtributo', 
        on_delete=models.CASCADE,
        related_name='producto_atributos'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.producto} - {self.valor_atributo}"
    
class Imagen(models.Model):
    producto = models.ForeignKey(
        'Producto', 
        on_delete=models.CASCADE,
        related_name='imagenes'
    )
    ruta = models.CharField(max_length=500)
    es_portada = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Imagen for {self.producto.nombre} - {'Portada' if self.es_portada else 'No Portada'}"
    
class Notificacion(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(null=True, blank=True)
    imagen = models.CharField(max_length=255, null=True, blank=True)
    estado = models.BooleanField(default=True)
    categoria = models.ForeignKey(
        'Categoria', 
        on_delete=models.CASCADE,
        related_name='notificaciones'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo
    
class CategoriaBlog(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre
    
class Blog(models.Model):
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    imagen_destacada = models.CharField(max_length=255, null=True, blank=True)
    fecha_publicacion = models.DateTimeField(null=True, blank=True)
    categoria = models.ForeignKey(
        'CategoriaBlog',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='blogs'
    )
    enlace_social = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo