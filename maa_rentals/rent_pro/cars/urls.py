from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, check_vehicle_availability

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('vehicles/<int:pk>/availability/', check_vehicle_availability, name='vehicle-availability'),
]
