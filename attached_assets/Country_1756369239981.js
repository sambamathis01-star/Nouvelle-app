{
  "name": "Country",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Nom du pays"
    },
    "code": {
      "type": "string",
      "description": "Code ISO du pays"
    },
    "security_level": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high",
        "critical"
      ],
      "default": "medium",
      "description": "Niveau de risque sécuritaire"
    },
    "travel_advisory": {
      "type": "string",
      "description": "Conseil aux voyageurs"
    },
    "security_risks": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Liste des risques de sécurité"
    },
    "health_risks": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Risques sanitaires"
    },
    "embassy_info": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      }
    },
    "last_updated": {
      "type": "string",
      "format": "date",
      "description": "Dernière mise à jour des données"
    }
  },
  "required": [
    "name",
    "code"
  ]
}
