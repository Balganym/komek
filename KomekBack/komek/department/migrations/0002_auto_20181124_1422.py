# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2018-11-24 08:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('department', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='timestamp',
            field=models.BigIntegerField(default=1543047755933, verbose_name='Department timestamp'),
        ),
    ]
