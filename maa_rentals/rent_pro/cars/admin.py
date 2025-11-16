from django.contrib import admin
from .models import Vehicle

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('id','brand','title','vehicle_type','fuel_type','price_per_day','is_active')
    list_filter = ('vehicle_type','fuel_type','is_active','brand')
    search_fields = ('title','brand','model')
    list_editable = ('is_active','price_per_day')  # allows quick updates
