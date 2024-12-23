import uuid


from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from .tasks import send_registration_email 
from datetime import datetime, timedelta
from django.contrib import messages
from django.utils import timezone
from .serializers import *
from .models import *
from .views import *
from .forms import *
from . import views


class StatusChoicesViewSet(viewsets.ModelViewSet):
    serializer_class = StatusChoicesSerializer
    queryset = StatusChoices.objects.all()
    

class SocialLinksViewset(viewsets.ModelViewSet):
    serializer_class = SocialLinksSerializer
    queryset = SocialLinks.objects.all()


class PasswordResetTokenViewSet(viewsets.ViewSet):
    def create(self, request):
        user = request.user 
        token = str(uuid.uuid4())
        expires_at = datetime.now() + timedelta(hours=2)

        password_token = PasswordResetToken.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )

        serializer = PasswordResetTokenSerializer(password_token)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class EmailVerificationTokenViewSet(viewsets.ViewSet):
    def create(self, request):
        user = request.user  
        token = str(uuid.uuid4())
        expires_at = datetime.now() + timedelta(hours=24)

        email_token = EmailVerificationToken.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )

        serializer = EmailVerificationTokenSerializer(email_token)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class VerifyTokenViewSet(viewsets.ViewSet):
    def create(self, request):
        token = request.data.get('token')
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            email_token = EmailVerificationToken.objects.get(token=token)

            if email_token.is_used:
                return Response({"error": "Token already used"}, status=status.HTTP_400_BAD_REQUEST)

            if not email_token.is_valid():
                return Response({"error": "Token expired"}, status=status.HTTP_400_BAD_REQUEST)

            # Mark the token as used
            email_token.mark_as_used()

            return Response({"success": "Token is valid"}, status=status.HTTP_200_OK)

        except EmailVerificationToken.DoesNotExist:
            return Response({"error": "Token not found"}, status=status.HTTP_404_NOT_FOUND)


class BlockedUsersViewset(viewsets.ModelViewSet):
    serializer_class = BlockedUsersSerializer
    queryset = BlockedUsers.objects.all()



# İstifadəçi profilini göstərmək
@require_http_methods(['GET'])
def view_profile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    profile = ProfileDetails.objects.get(user=user)
    return render(request, 'users/profile.html', {'profile': profile})


# Profil məlumatlarını yeniləmək
@require_http_methods(['POST'])
def update_profile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    profile = ProfileDetails.objects.get(user=user)
    bio = request.POST.get('bio')
    profile_picture = request.FILES.get('profile_picture')

    profile.bio = bio
    if profile_picture:
        profile.profile_picture = profile_picture
    profile.save()
    
    return JsonResponse({'message': 'Profile updated successfully'})


# İstifadəçini bloklamaq
@require_http_methods(['POST'])
def block_user(request):
    blocked_by = get_object_or_404(User, id=request.POST.get('blocked_by_id'))
    blocked_user = get_object_or_404(User, id=request.POST.get('blocked_user_id'))
    
    BlockedUsers.objects.create(blocked_by=blocked_by, blocked_user=blocked_user)
    return JsonResponse({'message': f'{blocked_by.username} blocked {blocked_user.username}'})


# Sosial linkləri yeniləmək
@require_http_methods(['POST'])
def update_social_links(request, user_id):
    user = get_object_or_404(User, id=user_id) 
    social_links = SocialLinks.objects.get(user=user)
    links = request.POST.get('links')

    social_links.links = links
    social_links.save()
    
    return JsonResponse({'message': 'Social links updated successfully'})



def register_user(request):
    if request.method == 'POST':
        # Form məlumatlarının götürülməsi
        username = request.POST.get('username')
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        birth_date = request.POST.get('birth_date')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        # Daxil edilən məlumatların yoxlanması
        if not username:
            messages.error(request, 'İstifadəçi adı daxil edilməlidir.')
            return render(request, 'user/register_user.html')
        
        if not email:
            messages.error(request, 'E-mail daxil edilməlidir.')
            return render(request, 'user/register_user.html')
        
        if password != confirm_password:
            messages.error(request, 'Şifrələr uyğun deyil.')
            return render(request, 'user/register_user.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Bu istifadəçi adı artıq mövcuddur.')
            return render(request, 'user/register_user.html')

        # İstifadəçi yaradılması
        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        user.save()

        # Profil məlumatlarının qeyd olunması və ya yenilənməsi
        try:
            profile = Profile.objects.get(user=user)
            profile.phone = phone
            profile.gender = gender
            profile.birth_date = birth_date
            profile.save()
        except ObjectDoesNotExist:
            profile = Profile.objects.create(user=user, phone=phone, gender=gender, birth_date=birth_date)
        
        # JWT Token-lərin yaradılması
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Token-ləri cookie-lərdə saxla
        response = redirect('home')
        response.set_cookie('access_token', access_token, httponly=True)
        response.set_cookie('refresh_token', refresh_token, httponly=True)

        # Celery vasitəsilə qeydiyyat e-poçtunu göndər
        send_registration_email.delay(username, email)

        messages.success(request, 'Qeydiyyat uğurla tamamlandı və e-poçt göndərildi.')
        return response
    
    return render(request, 'user/register_user.html')



def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('email')
        password = request.POST.get('password')

        # İstifadəçinin autentifikasiyası
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)

            # JWT Token-lərin yaradılması
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Token-ləri cookie-lərdə saxla
            response = redirect('home')
            response.set_cookie('access_token', access_token, httponly=True)
            response.set_cookie('refresh_token', refresh_token, httponly=True)
            
            return response
        else:
            messages.error(request, 'Yanlış istifadəçi adı və ya şifrə.')
    
    return render(request, 'user/login_user.html')




def create_email_verification_token(user):
    token = str(uuid.uuid4())  
    expires_at = datetime.now() + timedelta(hours=24)  
    
    email_token = EmailVerificationToken.objects.create(
        user=user,
        token=token,
        expires_at=expires_at
    )
    
    return email_token



def create_password_reset_token(user):
    token = str(uuid.uuid4())
    expires_at = datetime.now() + timedelta(hours=2)  
    
    password_reset_token = PasswordResetToken.objects.create(
        user=user,
        token=token,
        expires_at=expires_at
    )
    
    return password_reset_token

def verify_email_token(token):
    try:
        email_token = EmailVerificationToken.objects.get(token=token)
        
        if email_token.is_used:
            return False  
        
        if email_token.expires_at < datetime.now():
            return False  
        

        return True
    except EmailVerificationToken.DoesNotExist:
        return False 


def verify_password_reset_token(token):
    try:
        password_token = PasswordResetToken.objects.get(token=token)
        
        if password_token.is_used:
            return False
        
        if password_token.expires_at < datetime.now():
            return False
        
        return True
    except PasswordResetToken.DoesNotExist:
        return False


def mark_token_as_used(token_instance):
    token_instance.is_used = True
    token_instance.save()



@login_required
def add_reminder(request):
    if request.method == 'POST':
        form = ReminderForm(request.POST)
        if form.is_valid():
            reminder = form.save(commit=False)
            reminder.user = request.user 
            reminder.save()
            return redirect('reminder_list')  
    else:
        form = ReminderForm()
    return render(request, 'add_reminder.html', {'form': form})


@login_required
def reminder_list(request):
    reminders = Reminder.objects.filter(user=request.user, reminder_time__gte=timezone.now())
    return render(request, 'reminder_list.html', {'reminders': reminders})  










class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        form = RegisterForm(data=request.data)
        if form.is_valid():
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                password=form.cleaned_data['password']
            )
            user.profile.phone = form.cleaned_data.get('phone')
            user.profile.gender = form.cleaned_data.get('gender')
            user.profile.birth_date = form.cleaned_data.get('birth_date')
            user.profile.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response({"errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)