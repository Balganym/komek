# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2018-11-24 11:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authe', '0004_auto_20181124_1716'),
    ]

    operations = [
        migrations.CreateModel(
            name='TokenLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=500)),
                ('deleted', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tokens', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterIndexTogether(
            name='tokenlog',
            index_together=set([('token', 'user')]),
        ),
    ]
