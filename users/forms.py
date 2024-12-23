from django import forms
from .models import Profile, SocialLinks, BlockedUsers
from django.contrib.auth.models import User




class ProfileDetailsForm(forms.ModelForm):
    bio = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter your bio...',
        'class': 'form-control',
        'rows': 5,
    }), required=False)
    
    profile_picture = forms.ImageField(required=False)
    
    class Meta:
        model = Profile
        fields = ['bio', 'profile_picture']


class SocialLinksForm(forms.ModelForm):
    links = forms.CharField(widget=forms.Textarea(attrs={
        'placeholder': 'Enter your social media links...',
        'class': 'form-control',
        'rows': 3,
    }), required=False)
    
    class Meta:
        model = SocialLinks
        fields = ['links']


class BlockUserForm(forms.ModelForm):
    blocked_user = forms.ModelChoiceField(queryset=User.objects.all(), widget=forms.Select(attrs={
        'class': 'form-control',
    }))
    
    class Meta:
        model = BlockedUsers
        fields = ['blocked_user']



class ProfileForm(forms.ModelForm):
    phone = forms.CharField(max_length=15, required=False)
    gender = forms.ChoiceField(choices=[('M', 'Male'), ('F', 'Female')], required=False)
    birth_date = forms.DateField(required=False, widget=forms.TextInput(attrs={'type': 'date'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            try:
                profile = Profile.objects.get(user=user)
                self.fields['phone'].initial = profile.phone
                self.fields['gender'].initial = profile.gender
                self.fields['birth_date'].initial = profile.birth_date
            except Profile.DoesNotExist:
                pass


class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

    phone = forms.CharField(max_length=15)
    gender = forms.ChoiceField(choices=[('male', 'Kişi'), ('female', 'Qadın'), ('other', 'Digər')])
    birth_date = forms.DateField()

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError('Şifrələr uyğun gəlmir.')

        return cleaned_data