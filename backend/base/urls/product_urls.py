from django.urls import path
from base.views import product_views as views


urlpatterns = [ 
    path('', views.getProducts, name='routes'),
    
    path('create/', views.createProduct, name='create-product'),
    path('upload/', views.uploadImage, name='image-upload'),
    
    path('<str:pk>/reviews/', views.CreateProductReview, name='create-review'),
    path('<str:pk>', views.getProduct, name='product'),
    
    path('update/<str:pk>/', views.updateProduct, name='update-product'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
]