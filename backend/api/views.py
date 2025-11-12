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
from .models import Donor
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.response import Response






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


@csrf_exempt
@api_view(['POST'])
def send_request(request, id):
    """
    Send a request to a donor.
    """
    donor = get_object_or_404(Donor, pk=id)

    name = request.data.get('name')
    phone = request.data.get('phone')
    email = request.data.get('email')
    message = request.data.get('message', '')

    if not name or not phone or not email:
        return Response({'detail': 'Name, phone, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    req = DonorRequest.objects.create(
        donor=donor,
        name=name,
        phone=phone,
        email=email,
        message=message
    )

    return Response({'detail': f'Request sent to {donor.name} successfully!'}, status=status.HTTP_201_CREATED)