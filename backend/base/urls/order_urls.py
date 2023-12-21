from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='add-order-item'),
    path('', views.getOrders, name='my-orders'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='deliver'),
    path('<str:pk>/outfordelivery/', views.updateOrderToOutForDelivery, name='out-for-delivery'),
]
