from rest_framework import viewsets, filters
from .models import Donor, BloodRequest, DonorRequest
from .serializers import DonorSerializer, BloodRequestSerializer, DonorRequestSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Donor
from django.contrib.auth.models import User
from rest_framework import status
from django.shortcuts import redirect
from django.contrib.auth import authenticate
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.permissions import AllowAny
from .models import Review
from .serializers import ReviewSerializer
from django.core.mail import send_mail
from smtplib import SMTPException
from django.conf import settings
import requests
import logging
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet

sms_api_key = settings.FAST2SMS_KEY


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all().order_by('-created_at')
    serializer_class = DonorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'blood_group', 'city']


class BloodRequestViewSet(viewsets.ModelViewSet):
    queryset = BloodRequest.objects.all().order_by('-created_at')
    serializer_class = BloodRequestSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['blood_group', 'city']

class DonorRequestViewSet(viewsets.ModelViewSet):
    queryset = DonorRequest.objects.all().order_by('-created_at')
    serializer_class = DonorRequestSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['donor__name', 'name', 'email', 'phone']    

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all().order_by('-id')
    serializer_class = ReviewSerializer
   

@api_view(['GET'])
def donor_group_counts(request):
    try:
        data = (
            Donor.objects.values('blood_group')
            .annotate(count=Count('blood_group'))
            .order_by('blood_group')
        )
        return Response(list(data))
    except Exception as e:
        print("Error in donor_group_counts:", e)
        return Response({"error": str(e)}, status=500)

@api_view(['POST', 'OPTIONS']) 
def signup(request):
    if request.method == 'OPTIONS':
        return Response(status=200) 

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'detail': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'detail': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response({'detail': 'Signup successful!'}, status=status.HTTP_201_CREATED)


@api_view(['POST', 'OPTIONS']) 
def login_view(request):
    if request.method == 'OPTIONS':
        return Response(status=200) 

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)   




class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        print("Incoming data:", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()   # <-- IMPORTANT FIX
        return Response(serializer.data, status=201)


logger = logging.getLogger(__name__)

@api_view(['POST'])
def send_request(request, donor_id):
    try:
        donor = Donor.objects.get(id=donor_id)
    except Donor.DoesNotExist:
        return Response({"detail": "Donor not found"}, status=status.HTTP_404_NOT_FOUND)

    user_name = request.data.get("name", "").strip()
    phone = request.data.get("phone", "").strip()
    email = request.data.get("email", "").strip()
    message = request.data.get("message", "").strip()

    # validate required fields
    if not user_name or not phone or not email:
        return Response({"detail": "Missing requester name/phone/email"}, status=status.HTTP_400_BAD_REQUEST)

    if not donor.email:
        return Response({"detail": "Donor has no email configured"}, status=status.HTTP_400_BAD_REQUEST)

    subject = f"Blood Request from {user_name}"
    body = f"""Hello {donor.name},

You have received a blood request.

Requester Details:
Name: {user_name}
Phone: {phone}
Email: {email}
Message: {message}

Please respond as soon as possible.
"""

    # SEND EMAIL - with robust error handling
    try:
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [donor.email], fail_silently=False)
    except Exception as e:
        logger.exception("Failed to send email to donor")
        return Response({"detail": "Failed to send email to donor", "error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

    # SEND SMS - wrap in try/except
    try:
        sms_api_key = settings.FAST2SMS_KEY  # put this in settings/env
        sms_message = f"Blood request from {user_name}. Check email for details."
        resp = requests.post(
            "https://www.fast2sms.com/dev/bulkV2",
            headers={"authorization": sms_api_key, "Content-Type": "application/json"},
            json={
                "route": "v3",
                "sender_id": "TXTIND",
                "message": sms_message,
                "language": "english",
                "flash": 0,
                "numbers": donor.phone
            },
            timeout=10
        )
        resp.raise_for_status()
    except Exception as e:
        logger.exception("SMS send failed (non-fatal)")
        # SMS failure may be non-fatal; still return success but notify front-end
        return Response({"message": "Request sent (email OK). SMS failed", "sms_error": str(e)}, status=status.HTTP_200_OK)

    return Response({"message": "Request sent successfully"}, status=status.HTTP_200_OK)