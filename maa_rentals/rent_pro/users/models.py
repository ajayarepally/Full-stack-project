from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=254, null=False, blank=False, unique=True)


    def __str__(self):
        return self.username
