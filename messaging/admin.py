from django.contrib import admin
from messaging.models import Chat, PinnedMessages, DeletedMessages, ScheduledMessages

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('user', 'subject', 'pinned', 'favourite', 'sent_at')
    search_fields = ('subject', 'message', 'user__username')
    list_filter = ('pinned', 'favourite', 'seen')

@admin.register(PinnedMessages)
class PinnedMessagesAdmin(admin.ModelAdmin):
    list_display = ('user', 'chat', 'created_at')
    search_fields = ('user__username', 'chat__subject')

@admin.register(DeletedMessages)
class DeletedMessagesAdmin(admin.ModelAdmin):
    list_display = ('user', 'original_message', 'deleted_at')
    search_fields = ('user__username', 'original_message__subject')

@admin.register(ScheduledMessages)
class ScheduledMessagesAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'send_at', 'cancelled')
    search_fields = ('user__username', 'message')
    list_filter = ('cancelled',)
