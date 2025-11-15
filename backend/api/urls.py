from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    DonorViewSet,
    BloodRequestViewSet,
    signup,
    login_view,
    donor_group_counts,
    DonorRequestViewSet,
    send_request,
    ReviewViewSet,  
)

router = DefaultRouter()
router.register(r'donors', DonorViewSet)
router.register(r'bloodrequests', BloodRequestViewSet)
router.register(r'donorrequests', DonorRequestViewSet)
router.register('reviews', ReviewViewSet)

# ⚠️ Remove this — it's not a ViewSet, it’s a function view.
# router.register(r'send_request', DonorRequestViewSet, basename='send_request')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('send_request/<int:donor_id>/', send_request, name='send_request'),
    path('donor_group_counts/', donor_group_counts, name='donor_group_counts'),
    # path('send-email/', views.send_test_email, name='send_email'),
   
]
