from rest_framework import serializers
from .models import Donor, BloodRequest, DonorRequest ,Review


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

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'created_at']
        extra_kwargs = {'user': {'required': False}}     

        
