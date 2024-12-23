from django.contrib import admin
from users.models import (
    Profile,
    StatusChoices, 
    SocialLinks, 
    PasswordResetToken, 
    EmailVerificationToken, 
    BlockedUsers,
    BaseToken,
    Reminder
)

admin.site.register(StatusChoices)
admin.site.register(SocialLinks)
admin.site.register(BlockedUsers)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'gender', 'birth_date', 'updated_at')  
    search_fields = ('user__username', 'user__email', 'phone')  
    list_filter = ('gender', 'birth_date')  
    readonly_fields = ('created_at', 'updated_at') 
    
    fieldsets = (
        ('Main Information', {
            'fields': ('user', 'phone', 'gender', 'birth_date')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )

@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'created_at', 'expires_at', 'is_used')  
    search_fields = ('user__username', 'token')  
    list_filter = ('is_used', 'expires_at')  
    readonly_fields = ('created_at', 'expires_at')  

@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'created_at', 'expires_at', 'is_used')  
    search_fields = ('user__username', 'token') 
    list_filter = ('is_used', 'expires_at')  
    readonly_fields = ('created_at', 'expires_at') 


@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'reminder_time')
    list_filter = ('reminder_time',)