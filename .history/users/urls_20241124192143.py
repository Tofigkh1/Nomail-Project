from django.urls import path, include
from . import views
from .views import *
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

routers = routers.DefaultRouter()
routers.register('status', views.StatusChoicesViewSet)
routers.register('sociallinks', views.SocialLinksViewset)
routers.register('password-reset-token', PasswordResetTokenViewSet, basename='passwordresettoken')
routers.register('email-verification-token', EmailVerificationTokenViewSet, basename='emailverificationtoken')
routers.register('verify-token', VerifyTokenViewSet, basename='verifytoken')
routers.register('blockedusers', views.BlockedUsersViewset)

urlpatterns = [
    path('', include(routers.urls)),  # Default router URL-ləri
    path('api/messages/<int:user_id>/', views.view_profile, name='view_profile'),  # İstifadəçi profilini göstər
    path('profile/update/<int:user_id>/', views.update_profile, name='update_profile'),  # Profil yeniləmək
    path('block/', views.block_user, name='block_user'),  # İstifadəçini bloklamaq
    path('social-links/update/<int:user_id>/', views.update_social_links, name='update_social_links'),  # Sosial linkləri yeniləmək
    path('add_reminder/', views.add_reminder, name='add_reminder'), 
    path('reminder_list/', views.reminder_list, name='reminder_list'),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
