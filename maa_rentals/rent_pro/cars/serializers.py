from rest_framework import serializers
from .models import Vehicle
from rest_framework import viewsets
from bookings.views import update_vehicle_availability
from django.utils import timezone

class VehicleSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()  # dynamic

    class Meta:
        model = Vehicle
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    def get_is_available(self, obj):
        # Vehicle is available if no active bookings exist
        active_bookings = obj.bookings.filter(end_date__gte=timezone.now().date())
        return not active_bookings.exists()
    
    

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    def get_queryset(self):
        # Update availability for all vehicles before returning
        for vehicle in Vehicle.objects.all():
            update_vehicle_availability(vehicle)
        return Vehicle.objects.all()
