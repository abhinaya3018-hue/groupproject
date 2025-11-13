from django.contrib import admin
from .models import Donor, BloodRequest, DonorRequest

@admin.register(DonorRequest)
class DonorRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'donor', 'name', 'email', 'phone', 'message', 'created_at')
    search_fields = ('name', 'email', 'donor__name')
