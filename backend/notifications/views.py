from django.shortcuts import render
from django.http import JsonResponse
from .models import Donor
from .utils import send_sms_notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from django.shortcuts import get_object_or_404
from .models import Donor, Request

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
def send_request(request, donor_id):
    donor = get_object_or_404(Donor, id=donor_id)

    # Save request in DB
    new_request = Request.objects.create(
        donor=donor,
        requester_name=request.data.get("name"),
        requester_phone=request.data.get("phone"),
        message=request.data.get("message", "")
    )

    # Return response
    return Response({"message": "Request sent successfully"}, status=status.HTTP_201_CREATED)
