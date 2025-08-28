{
  "name": "NewsAlert",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Titre de l'actualité"
    },
    "description": {
      "type": "string",
      "description": "Description de l'alerte"
    },
    "country": {
      "type": "string",
      "description": "Pays concerné"
    },
    "severity": {
      "type": "string",
      "enum": [
        "info",
        "warning",
        "critical"
      ],
      "default": "info",
      "description": "Niveau de gravité"
    },
    "source": {
      "type": "string",
      "description": "Source de l'information"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "Date de l'actualité"
    },
    "is_active": {
      "type": "boolean",
      "default": true,
      "description": "Alerte active"
    }
  },
  "required": [
    "title",
    "country"
  ]
}
