from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from cars.views import VehicleViewSet
from bookings.views import BookingViewSet
from users.views import RegisterView, UserListView
from payments.views import CreatePaymentAPIView, VerifyPaymentAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'vehicles', VehicleViewSet, basename='vehicle')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # payments (stubs)
    path('api/payments/create/', CreatePaymentAPIView.as_view()),
    path('api/payments/verify/', VerifyPaymentAPIView.as_view()),

    # router
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)