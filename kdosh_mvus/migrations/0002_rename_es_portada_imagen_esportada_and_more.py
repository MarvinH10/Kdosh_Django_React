# Generated by Django 5.1 on 2024-08-30 20:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kdosh_mvus', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='imagen',
            old_name='es_portada',
            new_name='esPortada',
        ),
        migrations.AddField(
            model_name='valoratributo',
            name='atributo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='valores', to='kdosh_mvus.atributo'),
        ),
        migrations.AlterField(
            model_name='productoatributo',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='atributos', to='kdosh_mvus.producto'),
        ),
        migrations.AlterField(
            model_name='productoatributo',
            name='valor_atributo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='kdosh_mvus.valoratributo'),
        ),
    ]