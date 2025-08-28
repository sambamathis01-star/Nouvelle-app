{
  "name": "Trip",
  "type": "object",
  "properties": {
    "traveler_name": {
      "type": "string",
      "description": "Nom du voyageur"
    },
    "traveler_email": {
      "type": "string",
      "format": "email",
      "description": "Email du voyageur"
    },
    "destination_country": {
      "type": "string",
      "description": "Pays de destination"
    },
    "destination_city": {
      "type": "string",
      "description": "Ville de destination"
    },
    "departure_date": {
      "type": "string",
      "format": "date",
      "description": "Date de départ"
    },
    "return_date": {
      "type": "string",
      "format": "date",
      "description": "Date de retour"
    },
    "purpose": {
      "type": "string",
      "description": "Motif du voyage"
    },
    "status": {
      "type": "string",
      "enum": [
        "planned",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "planned",
      "description": "Statut du voyage"
    },
    "emergency_contact": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "relationship": {
          "type": "string"
        }
      }
    },
    "accommodation": {
      "type": "string",
      "description": "Informations d'hébergement"
    },
    "notes": {
      "type": "string",
      "description": "Notes supplémentaires"
    }
  },
  "required": [
    "traveler_name",
    "destination_country",
    "departure_date",
    "return_date"
  ]
}
