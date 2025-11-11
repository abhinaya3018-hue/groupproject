from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DonorViewSet, BloodRequestViewSet, donor_group_counts, signup, login_view, send_request

router = DefaultRouter()
router.register(r'donors', DonorViewSet)
router.register(r'bloodrequests', BloodRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('donor_group_counts/', donor_group_counts, name='donor_group_counts'),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('send_request/<int:donor_id>/', send_request, name='send_request'),  # ✅ Add this line
]
