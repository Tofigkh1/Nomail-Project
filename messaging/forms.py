from django import forms
from .models import Chat, ScheduledMessages, PinnedMessages

class SendMessageForm(forms.ModelForm):
    subject = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Enter subject',
        'class': 'form-control',
    }), required=True)

    message = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Type your message...',
        'class': 'form-control',
        'rows': 5,
    }), required=True)

    class Meta:
        model = Chat
        fields = ['subject', 'message']


class ScheduleMessageForm(forms.ModelForm):
    message = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter the message to schedule...',
        'class': 'form-control',
        'rows': 5,
    }), required=True)

    send_at = forms.DateTimeField(widget=forms.DateTimeInput(attrs={
        'type': 'datetime-local',
        'class': 'form-control',
    }), required=True)

    class Meta:
        model = ScheduledMessages
        fields = ['message', 'send_at']


class DeleteMessageForm(forms.Form):
    chat_id = forms.IntegerField(widget=forms.HiddenInput())

    class Meta:
        fields = ['chat_id']


class PinMessageForm(forms.ModelForm):
    class Meta:
        model = PinnedMessages
        fields = ['chat']  


class UnpinMessageForm(forms.Form):
    pinned_message_id = forms.IntegerField(widget=forms.HiddenInput())

    class Meta:
        fields = ['pinned_message_id']
