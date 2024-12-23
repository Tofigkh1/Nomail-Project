from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (StatusChoices,
                    Profile,
                    SocialLinks,
                    PasswordResetToken,
                    EmailVerificationToken,
                    BlockedUsers,
)


class StatusChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusChoices
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  
        user.save()

        Profile.objects.create(user=user, status=StatusChoices.objects.get(name='Active'))

        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)  
        instance.save()  
        return super().update(instance, validated_data)




class BlockedUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedUsers
        fields = ['id', 'blocked_by', 'blocked_user', 'blocked_at']

    def validate(self, data):
        blocked_by = data.get('blocked_by')
        blocked_user = data.get('blocked_user')

        if blocked_by == blocked_user:
            raise serializers.ValidationError("İstifadəçi özünü bloklaya bilməz.")

        if BlockedUsers.objects.filter(blocked_by=blocked_by, blocked_user=blocked_user).exists():
            raise serializers.ValidationError("İstifadəçi artıq bloklanıb.")

        return data

    def validate_blocked_user(self, value):
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Bloklanan istifadəçi mövcud deyil.")
        return value

class EmailVerificationTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailVerificationToken
        fields = ['user', 'token', 'created_at', 'expires_at', 'is_used']

class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['user', 'token', 'created_at', 'expires_at', 'is_used']

class SocialLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLinks
        fields = ['id', 'user', 'links']