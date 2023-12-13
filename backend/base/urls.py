from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    
    path('products/', views.getProducts, name='routes'),
    path('products/<str:pk>', views.getProduct, name='product'),
    
    path('users/', views.getUsers, name='users-profile'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # path('users/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
