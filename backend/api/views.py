from rest_framework import viewsets, filters
from .models import Donor, BloodRequest
from .serializers import DonorSerializer, BloodRequestSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Donor
from django.contrib.auth.models import User
from rest_framework import status
from django.shortcuts import redirect
from django.contrib.auth import authenticate

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

@api_view(['GET'])
def donor_group_counts(request):
    
    data = Donor.objects.values('blood_group').order_by('blood_group')
    result = {}
    for item in data:
        group = item['blood_group']
        result[group] = result.get(group, 0) + 1
    return Response(result) 

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
    
       

