import { EmployerIDInvestigationResultItem } from './employer_investigation_schema.js';

export const EMPLOYER_DATA: Array<EmployerIDInvestigationResultItem> = [{
    "searchInput": {
      "companyName": "Google Inc",
      "address": {
        "addressLine1": "1600 Amphitheatre Pkwy # 213",
        "city": "Mountain View",
        "state": "CA",
        "postalCode": "94043"
      },
      "phone": "6502530000"
    },
    "results": {
      "companySearchResult": {
        "companyFound": true,
        "companyName": "GOOGLE INC",
        "address": {
          "addressLine1": "1600 AMPHITHEATRE PKWY",
          "city": "MOUNTAIN VIEW",
          "state": "CA",
          "postalCode": "94043135100"
        },
        "phone": "6502530000",
        "yearOfFirstAppearance": "2015",
        "estimatedSalesVolume": "$521.00",
        "numberOfEmployees": "2",
        "keyExecutive": "PORTER TIMOTHY A ATY"
      },
      "reversePhoneLookupResult": {
        "phoneNumberFound": true,
        "location": "U.S. Type Address",
        "type": "Business",
        "name": "GOOGLE MOUNTAIN VIEW - GLOBAL",
        "address": {
          "addressLine1": " 1600 Amphitheatre Pkwy ",
          "city": "Mountain View",
          "state": "CA",
          "postalCode": "94043-1351"
        }
      },
      "travelDistanceTimeResult": {
        "subjectPropertyAddress": "2 Adams St Apt 1002 Denver, CO 80206-5726",
        "subjectPropertyRoadwayDistance": "1,286 mi",
        "subjectPropertyTravelTime": "19 hours 0 mins",
        "borrowerAddress": "739 E Banyan St # 3 Ontario, CA 91761",
        "borrowerAddressRoadwayDistance": "387 mi",
        "borrowerAddressTravelTime": "5 hours 58 mins",
        "subjectPropertyRoadwayDistanceInMiles": "1286",
        "borrowerAddressRoadwayDistanceInMiles": "387"
      }
    },
    "targetId": "0000000000011628384",
    "borrowerName": "Hello World2!",
  },
  {
    "searchInput": {
      "companyName": "Cintas Corporation # 258",
      "address": {
        "addressLine1": "1055 Progress Industrial Blvd",
        "city": "Lawrenceville",
        "state": "CA",
        "postalCode": "30043"
      },
      "phone": "6782521300"
    },
    "results": {
      "companySearchResult": {
        "companyFound": true,
        "companyName": "CINTAS UNIFORM SVC LWRNCVLL",
        "address": {
          "addressLine1": "1055 PROGRESS INDUSTRIAL BLVD",
          "city": "LAWRENCEVILLE",
          "state": "GA",
          "postalCode": "30043465455"
        },
        "phone": "6783897078",
        "yearOfFirstAppearance": "2019",
        "estimatedSalesVolume": "$13,981.00",
        "numberOfEmployees": "125",
        "keyExecutive": "WHEELER CHRIS",
        "primaryURL": "CINTAS.COM"
      },
      "reversePhoneLookupResult": {
        "phoneNumberFound": true,
        "location": "U.S. Type Address",
        "type": "Business",
        "name": "CINTAS CORP",
        "address": {
          "addressLine1": " ",
          "city": "Lilburn",
          "state": "GA",
          "postalCode": "30047-5807"
        }
      },
      "travelDistanceTimeResult": {
        "subjectPropertyAddress": "2 Adams St Apt 1002 Denver, CO 80206-5726",
        "subjectPropertyRoadwayDistance": "1,422 mi",
        "subjectPropertyTravelTime": "20 hours 45 mins",
        "borrowerAddress": "739 E Banyan St # 8 Ontario, CA 91761",
        "borrowerAddressRoadwayDistance": "2,176 mi",
        "borrowerAddressTravelTime": "1 day 8 hours",
        "subjectPropertyRoadwayDistanceInMiles": "1422",
        "borrowerAddressRoadwayDistanceInMiles": "2176"
      }
    },
    "error": [],
    "targetId": "0000000000011628391",
    "borrowerName": "Hello world!"
  }]
