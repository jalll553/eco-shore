from django.urls import path
from . import views

urlpatterns = [
    path('weather/', views.get_weather, name='get_weather'),
    path('beaches/', views.get_beaches, name='get_beaches'),
    path('beaches/<int:id>/', views.get_beach_detail, name='get_beach_detail'),
    path('beaches/nearest/', views.nearest_beaches, name='nearest_beaches'),
    path('contact/', views.submit_contact, name='submit_contact'),
]
