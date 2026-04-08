from rest_framework import serializers
from .models import Beach, ContactMessage

class BeachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beach
        fields = "__all__"

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
