
# from rest_framework import viewsets, permissions, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django.utils import timezone
# from .models import Booking
# from .serializers import BookingSerializer
# from cars.models import Vehicle
# from rest_framework.permissions import AllowAny,IsAuthenticated


# def update_vehicle_availability(vehicle):
#     active_bookings = vehicle.bookings.filter(end_date__gte=timezone.now().date())
#     vehicle.is_available = not active_bookings.exists()
#     vehicle.save()


# class BookingViewSet(viewsets.ModelViewSet):
#     serializer_class = BookingSerializer
#     queryset = Booking.objects.all().order_by('-created_at')
#     permission_classes=[IsAuthenticated]
#     def get_queryset(self):
#         return Booking.objects.filter(user=self.request.user)



#     def perform_create(self, serializer):
#         # Create booking for logged-in user
#         booking = serializer.save(user=self.request.user)

#         # Mark vehicle unavailable
#         vehicle = booking.vehicle
#         vehicle.is_available = True
#         vehicle.save()

#     @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
#     def my_bookings(self, request):
#         """
#         List bookings for the logged-in user.
#         """
#         user_bookings = Booking.objects.filter(user=request.user)
#         serializer = self.get_serializer(user_bookings, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
#     def approve(self, request, pk=None):
#         booking = self.get_object()
#         booking.status = 'confirmed'
#         booking.save()

#         # Ensure vehicle is unavailable
#         booking.vehicle.is_available = False
#         booking.vehicle.save()
#         return Response({'status': 'approved'}, status=status.HTTP_200_OK)

#     @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
#     def reject(self, request, pk=None):
#         booking = self.get_object()
#         booking.status = 'rejected'
#         booking.save()

#         # Make vehicle available again
#         booking.vehicle.is_available = True
#         booking.vehicle.save()
#         return Response({'status': 'rejected'}, status=status.HTTP_200_OK)


from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Booking
from .serializers import BookingSerializer
from rest_framework.permissions import IsAuthenticated

def update_vehicle_availability(vehicle):
    active_bookings = vehicle.bookings.filter(end_date__gte=timezone.now().date())
    vehicle.is_available = not active_bookings.exists()
    vehicle.save()

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

        # Calculate number of days
        days = (end_date - start_date).days + 1
        total_price = days * vehicle.price_per_day

        # Save booking with total_price
        serializer.save(user=self.request.user, total_price=total_price)

        # Optionally, mark vehicle unavailable
        vehicle.is_available = True
        vehicle.save()


    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_bookings(self, request):
        user_bookings = Booking.objects.filter(user=request.user)
        serializer = self.get_serializer(user_bookings, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        booking.vehicle.is_available = False
        booking.vehicle.save()
        return Response({'status': 'approved'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def reject(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'rejected'
        booking.save()
        booking.vehicle.is_available = True
        booking.vehicle.save()
        return Response({'status': 'rejected'}, status=status.HTTP_200_OK)
