from django.utils import timezone
from rest_framework import serializers
from .models import Chat, PinnedMessages, DeletedMessages, ScheduledMessages


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'user', 'subject', 'message', 'pinned', 'favourite', 'seen', 'forwarded_from', 'attachment', 'sent_at', 'seen_at']

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Mesaj boş ola bilməz.")
        return value



class PinnedMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PinnedMessages
        fields = ['id', 'user', 'chat', 'created_at']

    def validate_chat(self, value):
        if not value:
            raise serializers.ValidationError("Chat məlumatı tələb olunur.")
        return value




class DeletedMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeletedMessages
        fields = ['id', 'original_message', 'deleted_at', 'user', 'message']

    def validate_original_message(self, value):
        if value is None:
            raise serializers.ValidationError("Orijinal mesaj tələb olunur.")
        return value




class ScheduledMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledMessages
        fields = ['id', 'user', 'chat', 'message', 'send_at', 'cancelled']

    def validate_send_at(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Mesajın göndərilmə tarixi keçmişdə ola bilməz.")
        return value
    
    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Planlaşdırılan mesaj boş ola bilməz.")
        return value
