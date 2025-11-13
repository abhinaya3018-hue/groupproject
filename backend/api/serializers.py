from rest_framework import serializers
from .models import Donor, BloodRequest, DonorRequest


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = '__all__'


class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = '__all__'


class DonorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonorRequest
        fields = '__all__'

        
