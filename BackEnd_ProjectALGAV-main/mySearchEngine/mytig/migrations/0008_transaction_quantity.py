# Generated by Django 3.2 on 2021-04-16 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mytig', '0007_transaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='quantity',
            field=models.IntegerField(default='0'),
        ),
    ]