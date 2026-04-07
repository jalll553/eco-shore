from django.db import migrations


MOCK_BEACHES = [
    {
        "name": "Radhanagar Beach",
        "city": "Swaraj Dweep",
        "state": "Andaman and Nicobar Islands",
        "latitude": 11.9843,
        "longitude": 92.9826,
        "water_quality": "Good",
        "crowd_density": "Low",
    },
    {
        "name": "Baga Beach",
        "city": "Bardez",
        "state": "Goa",
        "latitude": 15.5553,
        "longitude": 73.7517,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Calangute Beach",
        "city": "Calangute",
        "state": "Goa",
        "latitude": 15.5440,
        "longitude": 73.7553,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Palolem Beach",
        "city": "Canacona",
        "state": "Goa",
        "latitude": 15.0100,
        "longitude": 74.0232,
        "water_quality": "Good",
        "crowd_density": "Medium",
    },
    {
        "name": "Marina Beach",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "latitude": 13.0500,
        "longitude": 80.2824,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Elliot's Beach",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "latitude": 12.9958,
        "longitude": 80.2707,
        "water_quality": "Good",
        "crowd_density": "Medium",
    },
    {
        "name": "Kovalam Beach",
        "city": "Kovalam",
        "state": "Kerala",
        "latitude": 8.3988,
        "longitude": 76.9785,
        "water_quality": "Good",
        "crowd_density": "Medium",
    },
    {
        "name": "Varkala Beach",
        "city": "Varkala",
        "state": "Kerala",
        "latitude": 8.7379,
        "longitude": 76.7164,
        "water_quality": "Good",
        "crowd_density": "Medium",
    },
    {
        "name": "Puri Beach",
        "city": "Puri",
        "state": "Odisha",
        "latitude": 19.7983,
        "longitude": 85.8249,
        "water_quality": "Moderate",
        "crowd_density": "Medium",
    },
    {
        "name": "Gopalpur Beach",
        "city": "Gopalpur",
        "state": "Odisha",
        "latitude": 19.2655,
        "longitude": 84.9130,
        "water_quality": "Good",
        "crowd_density": "Low",
    },
    {
        "name": "Digha Beach",
        "city": "Digha",
        "state": "West Bengal",
        "latitude": 21.6269,
        "longitude": 87.5075,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Mandarmani Beach",
        "city": "Mandarmani",
        "state": "West Bengal",
        "latitude": 21.6588,
        "longitude": 87.7182,
        "water_quality": "Good",
        "crowd_density": "Medium",
    },
    {
        "name": "Juhu Beach",
        "city": "Mumbai",
        "state": "Maharashtra",
        "latitude": 19.0883,
        "longitude": 72.8264,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Girgaum Chowpatty",
        "city": "Mumbai",
        "state": "Maharashtra",
        "latitude": 18.9543,
        "longitude": 72.8125,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Tarkarli Beach",
        "city": "Malvan",
        "state": "Maharashtra",
        "latitude": 16.0117,
        "longitude": 73.4677,
        "water_quality": "Good",
        "crowd_density": "Low",
    },
    {
        "name": "Ramakrishna Beach",
        "city": "Visakhapatnam",
        "state": "Andhra Pradesh",
        "latitude": 17.7140,
        "longitude": 83.3239,
        "water_quality": "Moderate",
        "crowd_density": "High",
    },
    {
        "name": "Rushikonda Beach",
        "city": "Visakhapatnam",
        "state": "Andhra Pradesh",
        "latitude": 17.7846,
        "longitude": 83.3850,
        "water_quality": "Good",
        "crowd_density": "Medium",
    },
    {
        "name": "Dumas Beach",
        "city": "Surat",
        "state": "Gujarat",
        "latitude": 21.0870,
        "longitude": 72.7047,
        "water_quality": "Moderate",
        "crowd_density": "Medium",
    },
    {
        "name": "Mandvi Beach",
        "city": "Kutch",
        "state": "Gujarat",
        "latitude": 22.8325,
        "longitude": 69.3526,
        "water_quality": "Good",
        "crowd_density": "Low",
    },
    {
        "name": "Ganga Beach",
        "city": "Diu",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "latitude": 20.7142,
        "longitude": 70.9936,
        "water_quality": "Good",
        "crowd_density": "Low",
    },
]


def seed_beaches(apps, schema_editor):
    Beach = apps.get_model("api", "Beach")
    for item in MOCK_BEACHES:
        Beach.objects.update_or_create(
            name=item["name"],
            city=item["city"],
            state=item["state"],
            defaults={
                "latitude": item["latitude"],
                "longitude": item["longitude"],
                "water_quality": item["water_quality"],
                "crowd_density": item["crowd_density"],
            },
        )


def unseed_beaches(apps, schema_editor):
    Beach = apps.get_model("api", "Beach")
    for item in MOCK_BEACHES:
        Beach.objects.filter(
            name=item["name"],
            city=item["city"],
            state=item["state"],
        ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_beaches, unseed_beaches),
    ]
