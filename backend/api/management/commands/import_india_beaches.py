import csv
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

from api.models import Beach


class Command(BaseCommand):
    help = "Import India beaches from a CSV file."

    def add_arguments(self, parser):
        parser.add_argument(
            "--file",
            required=True,
            help="Path to CSV file (e.g., backend/data/india_beaches.csv)",
        )

    def handle(self, *args, **options):
        csv_path = Path(options["file"]).expanduser().resolve()

        if not csv_path.exists():
            raise CommandError(f"CSV file not found: {csv_path}")

        created_count = 0
        updated_count = 0

        with csv_path.open("r", encoding="utf-8-sig", newline="") as csv_file:
            reader = csv.DictReader(csv_file)
            required_columns = {"name", "city", "state", "latitude", "longitude"}
            missing = required_columns.difference(reader.fieldnames or [])

            if missing:
                raise CommandError(
                    "CSV missing required columns: "
                    + ", ".join(sorted(missing))
                )

            for index, row in enumerate(reader, start=2):
                try:
                    name = (row.get("name") or "").strip()
                    city = (row.get("city") or "").strip()
                    state = (row.get("state") or "").strip()
                    latitude = float((row.get("latitude") or "").strip())
                    longitude = float((row.get("longitude") or "").strip())
                except ValueError as exc:
                    raise CommandError(
                        f"Invalid latitude/longitude at line {index}: {exc}"
                    ) from exc

                if not name or not city or not state:
                    raise CommandError(
                        f"Missing name/city/state at line {index}. "
                        "These fields are required."
                    )

                water_quality = (row.get("water_quality") or "Unknown").strip() or "Unknown"
                crowd_density = (row.get("crowd_density") or "Unknown").strip() or "Unknown"

                beach, created = Beach.objects.update_or_create(
                    name=name,
                    city=city,
                    state=state,
                    defaults={
                        "latitude": latitude,
                        "longitude": longitude,
                        "water_quality": water_quality,
                        "crowd_density": crowd_density,
                    },
                )

                if created:
                    created_count += 1
                else:
                    updated_count += 1

                self.stdout.write(
                    self.style.NOTICE(
                        f"Imported: {beach.name} ({beach.city}, {beach.state})"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Import complete. Created: {created_count}, Updated: {updated_count}"
            )
        )
