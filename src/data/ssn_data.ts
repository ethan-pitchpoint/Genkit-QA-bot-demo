import { SSNResultItem } from '../schemas/ssn_schema.js'

export const SSN_DATA: Array<SSNResultItem> = [
    {
      "targetId": "0000000000011628387",
      "uniqueAlias": [
        {
          "first": "Mario",
          "middle": "Enrique",
          "last": "Carrillo",
          "lastSeen": {
            "year": "2025",
            "month": "4",
            "day": "4"
          }
        },
        {
          "first": "MARIA",
          "middle": "E",
          "last": "ARVIZU",
          "lastSeen": {
            "year": "2025",
            "month": "4",
            "day": "4"
          }
        }
      ],
      "address": {
        "addressLine1": "739 E Banyan St # 8",
        "city": "Ontario",
        "postalCode": "91761",
        "state": "CA",
        "country": "us"
      }
    },
    {
      "targetId": "0000000000011628375",
      "uniqueAlias": [
        {
          "first": "Clara",
          "middle": "Mid",
          "last": "Beller",
          "lastSeen": {
            "year": "2025",
            "month": "4",
            "day": "4"
          }
        }
      ],
      "address": {
        "addressLine1": "739 E Banyan St # 3",
        "city": "Ontario",
        "postalCode": "91761",
        "state": "CA",
        "country": "us"
      },
      "status": "ERROR"
    }
  ]