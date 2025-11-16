from rest_framework import viewsets, filters, status
from .models import Vehicle
from bookings.models import Booking
from .serializers import VehicleSerializer
from rest_framework.permissions import IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from .utils import is_vehicle_available
from datetime import datetime


class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['brand','vehicle_type','fuel_type','price_per_day','is_available']
    search_fields = ['title','brand','model']
    ordering_fields = ['price_per_day','created_at']


    def get_queryset(self):
        # Admin can see all, others only available vehicles
        if self.request.user.is_staff:
            return Vehicle.objects.all().order_by('-created_at')
        return Vehicle.objects.filter(is_available=True).order_by('-created_at')

    def get_permissions(self):
        if self.action in ['create','update','partial_update','destroy']:
            return [IsAdminUser()]
        return [AllowAny()]
    


    @action(detail=True, methods=['get'])
    def availability(self, request, pk=None):
        try:
            vehicle = self.get_object()
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)

        start_date_str = request.GET.get('start_date')
        end_date_str = request.GET.get('end_date')

        if not start_date_str or not end_date_str:
            return Response({'error': 'Start and end dates are required'}, status=status.HTTP_400_BAD_REQUEST)

        start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()

        overlapping = Booking.objects.filter(
            vehicle=vehicle,
            start_date__lte=end_date,
            end_date__gte=start_date
        ).exists()

        return Response({'available': not overlapping})
    

def is_vehicle_available(vehicle, start_date, end_date):
    # Returns True if no overlapping bookings exist
    overlapping = Booking.objects.filter(
        vehicle=vehicle,
        start_date__lte=end_date,
        end_date__gte=start_date
    ).exists()
    return not overlapping


# @api_view(['GET'])
# def check_vehicle_availability(request, pk):
#     try:
#         vehicle = Vehicle.objects.get(pk=pk)
#     except Vehicle.DoesNotExist:
#         return Response({'error': 'Vehicle not found'}, status=404)

#     start_date_str = request.GET.get('start_date')
#     end_date_str = request.GET.get('end_date')

#     if not start_date_str or not end_date_str:
#         return Response({'error': 'Start and end dates are required'}, status=400)

#     try:
#         start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
#         end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
#     except ValueError:
#         return Response({'error': 'Invalid date format'}, status=400)

#     available = is_vehicle_available(vehicle, start_date, end_date)
#     return Response({'available': available})

