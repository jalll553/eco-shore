from django.shortcuts import render

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_weather(request):
    lat = request.GET.get("lat")
    lon = request.GET.get("lon")

    if not lat or not lon:
        return Response({"error": "Latitude and longitude required"}, status=400)

    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"

    response = requests.get(url)
    data = response.json()

    return Response(data)