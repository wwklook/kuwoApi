from django.db import models

# Create your models here.
class UserInfo(models.Model):
    uname = models.CharField(max_length=16)
    password = models.CharField(max_length=32)
