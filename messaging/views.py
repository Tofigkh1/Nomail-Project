
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from django.utils import timezone
from users.models import User
from .serializers import *
from . models import *
from .views import *
from . import views


class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

class ScheduledMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduledMessagesSerializer
    queryset = ScheduledMessages.objects.all()

class PinnedMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = PinnedMessagesSerializer
    queryset = PinnedMessages.objects.all()

class DeletedMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = DeletedMessagesSerializer
    queryset = DeletedMessages.objects.all()



# Mesaj yaratmaq və göndərmək
@require_http_methods(['POST'])
def send_message(request):
    user = get_object_or_404(User, id=request.POST.get('user_id'))
    subject = request.POST.get('subject')
    message_text = request.POST.get('message')

    active_chat_exists = Chat.objects.filter(user=user).exists()

    # Mesaj göndərir
    chat = Chat.objects.create(user=user, subject=subject, message=message_text)

    if active_chat_exists:
        mail_active = True
    else:
        mail_active = False

    return JsonResponse({
        'message': 'Message sent successfully',
        'chat_id': chat.id,
        'mail_active': mail_active  
    })



# Bütün mesajları göstərmək
@require_http_methods(['GET'])
def list_messages(request, user_id):
    user = get_object_or_404(User, id=user_id)
    messages = Chat.objects.filter(user=user).order_by('-sent_at')
    return render(request, 'messages/list_messages.html', {'messages': messages})


# Planlaşdırılmış mesajları yaratmaq
@require_http_methods(['POST'])
def schedule_message(request):
    user = get_object_or_404(User, id=request.POST.get('user_id'))
    chat_id = request.POST.get('chat_id')
    chat = get_object_or_404(Chat, id=chat_id)
    message_text = request.POST.get('message')
    send_at = request.POST.get('send_at')

    ScheduledMessages.objects.create(user=user, chat=chat, message=message_text, send_at=send_at)
    return JsonResponse({'message': 'Message scheduled successfully'})


# Silinmiş mesajları idarə etmək
@require_http_methods(['POST'])
def delete_message(request):
    user = get_object_or_404(User, id=request.POST.get('user_id'))
    chat_id = request.POST.get('chat_id')
    chat = get_object_or_404(Chat, id=chat_id)
    DeletedMessages.objects.create(user=user, original_chat=chat, message=chat.message)
    chat.delete()
    return JsonResponse({'message': 'Message deleted successfully'})


# Pin edilən mesajları göstərmək
@require_http_methods(['GET'])
def pinned_messages(request, user_id):
    user = get_object_or_404(User, id=user_id)
    pinned = PinnedMessages.objects.filter(user=user).order_by('-created_at')
    return render(request, 'messages/pinned_messages.html', {'pinned_messages': pinned})