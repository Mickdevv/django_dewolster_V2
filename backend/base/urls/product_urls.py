from django.urls import path
from base.views import product_views as views


urlpatterns = [ 
    path('', views.getProducts, name='routes'),
    path('<str:pk>', views.getProduct, name='product'),
    
    path('create/', views.createProduct, name='create-product'),
    path('update/<str:pk>/', views.deleteProduct, name='update-product'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
]