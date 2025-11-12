from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DonorViewSet, BloodRequestViewSet, signup, login_view, donor_group_counts, DonorRequestViewSet

router = DefaultRouter()
router.register(r'donors', DonorViewSet)
router.register(r'bloodrequests', BloodRequestViewSet)
router.register(r'donorrequests', DonorRequestViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    # path('api/send_request/<int:id>/',send_request, name='send_request')
    path('donor_group_counts/', donor_group_counts, name='donor_group_counts'),


]
