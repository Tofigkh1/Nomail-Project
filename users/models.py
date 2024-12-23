import uuid

from django.contrib.auth.models import User
from django.db import models


class StatusChoices(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    birth_date = models.DateField()
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='media/profile_pics', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.ForeignKey(StatusChoices, on_delete=models.SET_NULL, null=True, blank=True, default=None)

    def __str__(self):
        return f"Profile of {self.user.username}"


class BlockedUsers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    blocked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blocked_by')
    blocked_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blocked_user')
    blocked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.blocked_by.username} blocked {self.blocked_user.username}"

class BaseToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        abstract = True

class SocialLinks(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    links = models.URLField()


class EmailVerificationToken(BaseToken):
    def is_valid(self):
        return not self.is_used and self.expires_at > timezone.now()

    def mark_as_used(self):
        self.is_used = True
        self.save()


class PasswordResetToken(BaseToken):
    def is_valid(self):
        return not self.is_used and self.expires_at > timezone.now()

    def mark_as_used(self):
        self.is_used = True
        self.save()



class Reminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    details = models.TextField()
    reminder_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title