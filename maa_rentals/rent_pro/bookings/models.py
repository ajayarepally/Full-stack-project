from django.db import models
from django.conf import settings
from cars.models import Vehicle

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('confirmed','Confirmed'),
        ('cancelled','Cancelled'),
        ('rejected','Rejected'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.vehicle} ({self.start_date} to {self.end_date})"

def perform_create(self, serializer):
    vehicle = serializer.validated_data['vehicle']
    if not vehicle.is_active:
        raise serializer.ValidationError("Vehicle is not available")
    serializer.save(user=self.request.user)
    # Mark vehicle as unavailable after booking
    vehicle.is_active = False
    vehicle.save()
