from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, User, OrderItem, ShippingAddress, Order
from base.products import products
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer, OrderItemSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']
    
    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Create order
        
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
            # = data[''],
        )
        # Create shipping address
        shippingAddress = ShippingAddress.objects.create(
             order = order,
             address = data['shippingAddress']['address'],
             postCode = data['shippingAddress']['postCode'],
             city = data['shippingAddress']['city'],
             country = data['shippingAddress']['country'],
        )
        # Create order items and set orderItem relationship 
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            
            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )
            # update stock
            product.countInStock -= item.quantity
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)