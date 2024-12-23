from django.urls import path, include
from . import views
from .views import *
from rest_framework  import routers
from django.conf import settings
from django.conf.urls.static import static


routers = routers.DefaultRouter()
routers.register('chat', views.ChatViewSet)
routers.register('pinnedmessages', views.PinnedMessagesViewSet)
routers.register('deletedmessages', views.DeletedMessagesViewSet)
routers.register('scheduledmessages', views.ScheduledMessagesViewSet)


urlpatterns = [
    path('', include(routers.urls)),  
    path('api/send/', views.send_message, name='send_message'),
    path('api/messages/<int:user_id>/', views.list_messages, name='list_messages'),
    path('api/schedule/', views.schedule_message, name='schedule_message'),
    path('api/delete/', views.delete_message, name='delete_message'),
    path('api/pinned/<int:user_id>/', views.pinned_messages, name='pinned_messages'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)