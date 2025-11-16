
from django.db import models
from datetime import date

FUEL_TYPES = [('Petrol','Petrol'),('Diesel','Diesel'),('Electric','Electric')]

class Vehicle(models.Model):
    VEHICLE_TYPES = [('car','Car'),('bike','Bike')]
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    vehicle_type = models.CharField(max_length=10, choices=VEHICLE_TYPES)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100, blank=True)
    price_per_day = models.DecimalField(max_digits=8, decimal_places=2)
    seats = models.IntegerField(default=4)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPES, default='Petrol')
    transmission = models.CharField(max_length=20, blank=True)
    image = models.ImageField(upload_to='vehicles/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.brand} {self.title}"
    
    @property
    def is_available_now(self):
        today = date.today()
        # Local import to avoid circular import
        from .utils import is_vehicle_available
        return is_vehicle_available(self, today, today)
