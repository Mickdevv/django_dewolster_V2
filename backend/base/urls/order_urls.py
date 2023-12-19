from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='add-order-item'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
