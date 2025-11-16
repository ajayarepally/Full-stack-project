from rest_framework import serializers
from .models import Booking
# from cars.models import Vehicle
# from decimal import Decimal
# from django.utils import timezone

# class BookingSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Booking
#         fields = '__all__'
#         depth = 1
#         read_only_fields = ['user', 'status', 'total_price']

#     def validate(self, attrs):
#         vehicle = attrs['vehicle']
#         start_date = attrs['start_date']
#         end_date = attrs['end_date']

#         if start_date > end_date:
#             raise serializers.ValidationError("End date must be after start date.")

#         if start_date < timezone.now().date():
#             raise serializers.ValidationError("Start date cannot be in the past.")

#         # Check overlapping bookings
#         overlapping = Booking.objects.filter(
#             vehicle=vehicle,
#             status__in=['pending', 'confirmed'],
#             start_date__lte=end_date,
#             end_date__gte=start_date
#         ).exists()

#         if overlapping:
#             raise serializers.ValidationError("Vehicle is not available for the selected dates.")

#         return attrs

#     def create(self, validated_data):
#         vehicle = validated_data['vehicle']

#         # Include the last day in booking
#         days = (validated_data['end_date'] - validated_data['start_date']).days + 1

#         # Calculate total price
#         validated_data['total_price'] = (vehicle.price_per_day * Decimal(days)).quantize(Decimal('0.01'))

#         # Set user automatically from context
#         user = self.context['request'].user
#         validated_data['user'] = user

#         return super().create(validated_data)


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'status', 'total_price']
