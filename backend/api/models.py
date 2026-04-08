from django.db import models


class Beach(models.Model):
    name = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    water_quality = models.CharField(max_length=50, default="Unknown")
    crowd_density = models.CharField(max_length=50, default="Unknown")

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.email}"