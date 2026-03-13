from django.urls import path
from .views import get_weather, get_beaches, get_beach_detail, nearest_beaches

urlpatterns = [
    path('weather/', get_weather),
    path('beaches/', get_beaches),
    path("beach/<int:id>/", get_beach_detail),
    path("nearest-beaches/", nearest_beaches),
]
