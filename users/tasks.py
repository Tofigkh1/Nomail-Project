import os
import base64

from .models import Reminder
from celery import shared_task
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.core.files.base import ContentFile
from django.template.loader import render_to_string


def save_base64_image(data, filename):
    """
    Saves a base64 image to the file system.

    :param data: base64 string of the image.
    :param filename: desired filename without extension.
    :return: file path of the saved image.
    """
    try:
        # Parse the base64 data
        format, imgstr = data.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr), name=f"{filename}.{ext}")

        file_path = os.path.join(settings.MEDIA_ROOT, 'user/img_cars', data.name)
        with open(file_path, 'wb') as f:
            f.write(data.read())

        return file_path
    except Exception as e:
        print(f"Error saving image: {e}")
        return None

@shared_task
def send_registration_email(username, email):
    """
    Sends a registration confirmation email to the user.

    :param username: the username of the registered user.
    :param email: the email address of the registered user.
    """
    subject = 'Qeydiyyatınız tamamlandı'
    recipient_list = [email]

    customer_message = render_to_string('user/register_email.html', {'username': username})

    # Send the email
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL, 
        recipient_list,
        fail_silently=False,
        html_message=customer_message,
    )


@shared_task
def send_reminder():
    now = timezone.now()
    reminders = Reminder.objects.filter(reminder_time__lte=now)
    for reminder in reminders:
        send_mail(
            subject=f"Xatırlatma: {reminder.title}",
            message=reminder.details,
            from_email='no-reply@example.com', 
            recipient_list=[reminder.user.email],
        )
        reminder.delete()