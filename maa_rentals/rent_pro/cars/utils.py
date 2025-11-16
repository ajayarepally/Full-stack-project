# def is_vehicle_available(vehicle, start_date, end_date):
#     from bookings.models import Booking  # local import
#     overlapping = Booking.objects.filter(
#         vehicle=vehicle,
#         status__in=['pending','confirmed'],
#         start_date__lte=end_date,
#         end_date__gte=start_date
#     ).exists()
#     return not overlapping
# from bookings.models import Booking

# def is_vehicle_available(vehicle, start_date, end_date):
#     overlapping = Booking.objects.filter(
#         vehicle=vehicle,
#         start_date__lte=end_date,
#         end_date__gte=start_date,
#     ).exists()
#     return not overlapping
from datetime import date
from bookings.models import Booking  # ✅ Correct import

def is_vehicle_available(vehicle, start_date, end_date):
    """
    Returns True if the vehicle is available between given dates.
    """
    overlapping_bookings = Booking.objects.filter(
        vehicle=vehicle,
        start_date__lte=end_date,
        end_date__gte=start_date
    )
    return not overlapping_bookings.exists()

