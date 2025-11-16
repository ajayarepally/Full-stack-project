from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CreatePaymentAPIView(APIView):
    def post(self, request):
        # Expect: { booking_id }
        # TODO: integrate with Razorpay / Stripe here to create order/payment intent
        booking_id = request.data.get('booking_id')
        return Response({'detail':'order-created','order_id': f'test_order_{booking_id}'})

class VerifyPaymentAPIView(APIView):
    def post(self, request):
        # TODO: Verify gateway signature and mark booking as confirmed
        # Expect: payment_id, signature, booking_id, etc.
        return Response({'detail':'payment-verified'})
