from django.db import models
from django.contrib.auth.models import User


BLOOD_GROUPS = [
('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
('AB+', 'AB+'), ('AB-', 'AB-'), ('O+', 'O+'), ('O-', 'O-'),
]


class Donor(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    blood_group = models.CharField(choices=BLOOD_GROUPS, max_length=3)
    city = models.CharField(max_length=100)
    last_donated = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
   





def __str__(self):
    return f"{self.name} ({self.blood_group})"


class BloodRequest(models.Model):
    requester_name = models.CharField(max_length=120)
    blood_group = models.CharField(choices=BLOOD_GROUPS, max_length=3)
    units_required = models.PositiveIntegerField(default=1)
    city = models.CharField(max_length=100)
    contact_phone = models.CharField(max_length=20)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    fulfilled = models.BooleanField(default=False)


def __str__(self):
    return f"Request: {self.blood_group} in {self.city}"