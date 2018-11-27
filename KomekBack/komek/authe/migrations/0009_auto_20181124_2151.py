# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2018-11-24 15:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authe', '0008_auto_20181124_2135'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mainuser',
            name='user_type',
            field=models.SmallIntegerField(choices=[(0, 'User'), (1, 'Social Worker'), (2, 'Commission Head'), (3, 'Departmental Worker'), (4, 'Departmental Commission')], default=0, verbose_name='User type'),
        ),
    ]
