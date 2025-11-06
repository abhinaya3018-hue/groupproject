from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DonorViewSet, BloodRequestViewSet
from django.urls import path
from . import views


# Create router and register viewsets
router = DefaultRouter()
router.register('donors', DonorViewSet)
router.register('requests', BloodRequestViewSet)

# Include router URLs
urlpatterns = [
    path('', include(router.urls)),
    #  path('donors/', views.donor_list),  # your existing endpoint
    path('donors/group_counts/', views.donor_group_counts),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
]
