from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  send_request

urlpatterns = [
    path('send_request/<int:donor_id>/', send_request, name='send_request'),  # ✅ Add this line
]
