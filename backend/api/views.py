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


from rest_framework.permissions import AllowAny
from .models import Review
from .serializers import ReviewSerializer

# from django.core.mail import send_mail
# from django.http import HttpResponse



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


@api_view(['GET','POST'])
def send_request(request, donor_id):
    # For debugging, print the donor_id
    print("Received donor ID:", donor_id)
    
    # Example: Save request in DB
    data = request.data
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    message = data.get('message')

    # (Save logic here)
    return Response({'message': 'Request saved successfully!'}, status=status.HTTP_201_CREATED)



class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print(" Incoming data:", request.data)  # 👈 Add this
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(" Validation errors:", serializer.errors)  # 👈 Add this
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def send_test_email(request):
#     subject = "Welcome to Red Connect "
#     message = "Thank you for joining our blood donation network!"
#     email_from = 'your_email@gmail.com'
#     recipient_list = ['receiver@example.com']  # you can use request.user.email

#     send_mail(subject, message, email_from, recipient_list)

#     return HttpResponse("Email sent successfully!")            