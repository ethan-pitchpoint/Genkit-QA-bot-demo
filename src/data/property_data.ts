import { PropertyInvestigationResultItem } from '../schemas/property_schema.js'

export const PROPERTY_DATA: Array<PropertyInvestigationResultItem> = [
    {
      "targetId": "0000000000011628427",
      "input": {
        "address": {
          "addressLine1": "2 Adams St Apt 1002",
          "city": "Denver",
          "state": "CO",
          "postalCode": "80206-5726"
        }
      },
      "results": {
        "propertyRecordIdentified": {
          "address": {
            "addressLine1": "2 ADAMS ST 1002",
            "city": "DENVER",
            "state": "CO",
            "postalCode": "80206",
            "county": "DENVER"
          },
          "legalBriefDescription": "MOUNTAIN SHADOWS CONDOS U-1002 PRK-B-24 STR-104",
          "recordingDate": {
            "day": "13",
            "month": "06",
            "year": "2024"
          },
          "yearBuilt": "1974",
          "buildingAreaSqFt": "1080",
          "currentOwnerInformation": {
            "currentOwner": [
              {
                "name": {
                  "unparsedName": "SASMAN ROBIN / SASMAN JOHN"
                },
                "mailingAddress": {
                  "addressLine1": "2 ADAMS ST APT 1002",
                  "city": "DENVER",
                  "state": "CO",
                  "postalCode": "80206",
                  "plusFourPostalCode": "5726"
                }
              }
            ],
            "useCode": "CONDOMINIUM"
          },
          "propertyTaxInformation": {
            "totalAssessmentValue": "499600",
            "improvementValue": "452400",
            "landValue": "47200",
            "taxAmount": "2359.42",
            "assessorMarketValue": "499600",
            "assessmentYear": "2024",
            "totalTaxableValue": "499600",
            "totalMarketValue": "499600"
          },
          "propertySaleAndRefinanceHistory": {
            "propertySaleRecord": [
              {
                "lastRecordingDate": {
                  "day": "13",
                  "month": "06",
                  "year": "2024"
                },
                "sellerName": {
                  "unparsedName": "ISSA JAMES J & GRETTA"
                },
                "titleCompanyName": "HTC",
                "lastSalePriceAmount": "520000",
                "lenderName": "CROSSCOUNTRY MTG",
                "pricePerSqFt": "481.48"
              },
              {
                "lastRecordingDate": {
                  "day": "13",
                  "month": "05",
                  "year": "2016"
                },
                "lastSalePriceAmount": "365000",
                "lenderName": "LIBERTY SVGS BK FSB"
              }
            ],
            "propertyTransactionRecord": [
              {
                "financeRecordingDate": {
                  "day": "23",
                  "month": "11",
                  "year": "2021"
                },
                "borrower": [
                  "ISSA JAMES J",
                  "ISSA GRETTA"
                ],
                "financeTitleCompanyName": "CLEAR TITLE",
                "financeLenderName": "FIRSTBANK",
                "financeTransferTypeDescription": "REFI",
                "financeLoanAmount": "$ 140,000"
              },
              {
                "financeRecordingDate": {
                  "day": "13",
                  "month": "03",
                  "year": "2003"
                },
                "borrower": [
                  "WOODSON WILBERTA"
                ],
                "financeTitleCompanyName": "LAND TITLE GUARANTEE",
                "financeLenderName": "RBC MTG CO",
                "financeTransferTypeDescription": "REFI",
                "financeLoanAmount": "$ 130,000"
              },
              {
                "financeRecordingDate": {
                  "day": "15",
                  "month": "04",
                  "year": "1999"
                },
                "borrower": [
                  "WOODSON WILBERTA"
                ],
                "financeTitleCompanyName": "TRANSNATION TITLE INS CO",
                "financeLenderName": "IRWIN MTG CORP",
                "financeTransferTypeDescription": "REFI",
                "financeLoanAmount": "$ 102,500"
              }
            ],
            "mortgageRecord": [
              {
                "firstMortgageAmount": "494000",
                "priorFirstMorgageAmount": "273750"
              }
            ]
          },
          "daysSinceRecordingDate": "295"
        },
        "comparableProperty": [
          {
            "property": {
              "address": {
                "addressLine1": "3100 E CHERRY CREEK SOUTH DR 1305",
                "city": "DENVER",
                "state": "CO",
                "postalCode": "80209",
                "county": "DENVER"
              },
              "legalBriefDescription": "CHERRY CREEK TOWER CONDOS U-1305 PRK-P-72 STR-S-15",
              "recordingDate": {
                "day": "16",
                "month": "01",
                "year": "2025"
              },
              "yearBuilt": "1962",
              "buildingAreaSqFt": "1107",
              "currentOwnerInformation": {
                "currentOwner": [
                  {
                    "name": {
                      "unparsedName": "GOMEZ MOISES"
                    },
                    "mailingAddress": {
                      "addressLine1": "3100 E CHERRY CREEK SOUTH DR APT 1305",
                      "city": "DENVER",
                      "state": "CO",
                      "postalCode": "80209",
                      "plusFourPostalCode": "3226"
                    },
                    "ownershipType": "MARRIED MAN"
                  }
                ],
                "useCode": "CONDOMINIUM"
              },
              "propertyTaxInformation": {
                "totalAssessmentValue": "585900",
                "improvementValue": "532700",
                "landValue": "53200",
                "taxAmount": "2817.22",
                "assessorMarketValue": "585900",
                "assessmentYear": "2024",
                "totalTaxableValue": "585900",
                "totalMarketValue": "585900"
              },
              "propertySaleAndRefinanceHistory": {
                "propertySaleRecord": [
                  {
                    "lastRecordingDate": {
                      "day": "16",
                      "month": "01",
                      "year": "2025"
                    },
                    "sellerName": {
                      "unparsedName": "WULFF JOHNELL P"
                    },
                    "titleCompanyName": "CHICAGO TITLE CO",
                    "lastSalePriceAmount": "489900",
                    "lenderName": "LEADERONE FIN'L CORP",
                    "pricePerSqFt": "442.55"
                  },
                  {
                    "lastRecordingDate": {
                      "day": "12",
                      "month": "02",
                      "year": "2020"
                    },
                    "lastSalePriceAmount": "540000",
                    "lenderName": "CARDINAL FIN'L CO LP"
                  }
                ],
                "mortgageRecord": [
                  {
                    "firstMortgageAmount": "489900",
                    "priorFirstMorgageAmount": "458877"
                  }
                ]
              },
              "daysSinceRecordingDate": "78"
            },
            "proximity": "0.30"
          },
          {
            "property": {
              "address": {
                "addressLine1": "2700 E CHERRY CREEK SOUTH DR 214",
                "city": "DENVER",
                "state": "CO",
                "postalCode": "80209",
                "county": "DENVER"
              },
              "legalBriefDescription": "2700 CHERRY CREEK SOUTH DRIVE CONDOS U-214 PRK-13,14STR-N/A",
              "recordingDate": {
                "day": "17",
                "month": "01",
                "year": "2025"
              },
              "yearBuilt": "2003",
              "buildingAreaSqFt": "1109",
              "currentOwnerInformation": {
                "currentOwner": [
                  {
                    "name": {
                      "unparsedName": "SHURAK PLUMFLOWER"
                    },
                    "mailingAddress": {
                      "addressLine1": "2700 E CHERRY CREEK SOUTH DR APT 214",
                      "city": "DENVER",
                      "state": "CO",
                      "postalCode": "80209",
                      "plusFourPostalCode": "5046"
                    }
                  }
                ],
                "useCode": "CONDOMINIUM"
              },
              "propertyTaxInformation": {
                "totalAssessmentValue": "563000",
                "improvementValue": "510300",
                "landValue": "52700",
                "taxAmount": "2696.06",
                "assessorMarketValue": "563000",
                "assessmentYear": "2024",
                "totalTaxableValue": "563000",
                "totalMarketValue": "563000"
              },
              "propertySaleAndRefinanceHistory": {
                "propertySaleRecord": [
                  {
                    "lastRecordingDate": {
                      "day": "17",
                      "month": "01",
                      "year": "2025"
                    },
                    "sellerName": {
                      "unparsedName": "TORREY JANE G"
                    },
                    "titleCompanyName": "LAND TITLE GUARANTEE",
                    "lastSalePriceAmount": "532000",
                    "pricePerSqFt": "479.71"
                  },
                  {
                    "lastRecordingDate": {
                      "day": "26",
                      "month": "10",
                      "year": "2005"
                    },
                    "lastSalePriceAmount": "328000"
                  }
                ],
                "mortgageRecord": [
                  {}
                ]
              },
              "daysSinceRecordingDate": "77"
            },
            "proximity": "0.39"
          },
          {
            "property": {
              "address": {
                "addressLine1": "345 FILLMORE ST 305",
                "city": "DENVER",
                "state": "CO",
                "postalCode": "80206",
                "county": "DENVER"
              },
              "legalBriefDescription": "345 FILLMORE CONDOS U-305 PRK-6C,25R",
              "recordingDate": {
                "day": "13",
                "month": "12",
                "year": "2024"
              },
              "yearBuilt": "1985",
              "buildingAreaSqFt": "1207",
              "currentOwnerInformation": {
                "currentOwner": [
                  {
                    "name": {
                      "unparsedName": "WASSERMAN KATHLEEN / WASSERMAN CRAIG"
                    },
                    "mailingAddress": {
                      "addressLine1": "345 FILLMORE ST APT 305",
                      "city": "DENVER",
                      "state": "CO",
                      "postalCode": "80206",
                      "plusFourPostalCode": "4300"
                    }
                  }
                ],
                "useCode": "CONDOMINIUM"
              },
              "propertyTaxInformation": {
                "totalAssessmentValue": "751600",
                "improvementValue": "647200",
                "landValue": "104400",
                "taxAmount": "3696.38",
                "assessorMarketValue": "751600",
                "assessmentYear": "2024",
                "totalTaxableValue": "751600",
                "totalMarketValue": "751600"
              },
              "propertySaleAndRefinanceHistory": {
                "propertySaleRecord": [
                  {
                    "lastRecordingDate": {
                      "day": "13",
                      "month": "12",
                      "year": "2024"
                    },
                    "sellerName": {
                      "unparsedName": "ARMSTRONG VALERIE J"
                    },
                    "titleCompanyName": "LAND TITLE GUARANTEE",
                    "lastSalePriceAmount": "850000",
                    "pricePerSqFt": "704.23"
                  },
                  {
                    "lastRecordingDate": {
                      "day": "13",
                      "month": "06",
                      "year": "2016"
                    },
                    "lastSalePriceAmount": "486400"
                  }
                ],
                "mortgageRecord": [
                  {}
                ]
              },
              "daysSinceRecordingDate": "112"
            },
            "proximity": "0.45"
          },
          {
            "property": {
              "address": {
                "addressLine1": "2500 E CHERRY CREEK SOUTH DR 113",
                "city": "DENVER",
                "state": "CO",
                "postalCode": "80209",
                "county": "DENVER"
              },
              "legalBriefDescription": "PORTICO CONDOS U-113 PRK-191, 192 STR-113",
              "recordingDate": {
                "day": "18",
                "month": "12",
                "year": "2024"
              },
              "yearBuilt": "2000",
              "buildingAreaSqFt": "1185",
              "currentOwnerInformation": {
                "currentOwner": [
                  {
                    "name": {
                      "unparsedName": "KALINOWSKI REBECCA L"
                    },
                    "mailingAddress": {
                      "addressLine1": "2500 E CHERRY CREEK SOUTH DR APT 113",
                      "city": "DENVER",
                      "state": "CO",
                      "postalCode": "80209",
                      "plusFourPostalCode": "3273"
                    }
                  }
                ],
                "useCode": "CONDOMINIUM"
              },
              "propertyTaxInformation": {
                "totalAssessmentValue": "671700",
                "improvementValue": "630600",
                "landValue": "41100",
                "taxAmount": "3272.64",
                "assessorMarketValue": "671700",
                "assessmentYear": "2024",
                "totalTaxableValue": "671700",
                "totalMarketValue": "671700"
              },
              "propertySaleAndRefinanceHistory": {
                "propertySaleRecord": [
                  {
                    "lastRecordingDate": {
                      "day": "18",
                      "month": "12",
                      "year": "2024"
                    },
                    "sellerName": {
                      "unparsedName": "WATSON MATTHEW & NURKA A"
                    },
                    "titleCompanyName": "FIDELITY NATIONAL TITLE CO",
                    "lastSalePriceAmount": "711250",
                    "lenderName": "144525",
                    "pricePerSqFt": "600.21"
                  },
                  {
                    "lastRecordingDate": {
                      "day": "28",
                      "month": "02",
                      "year": "2019"
                    },
                    "lastSalePriceAmount": "578040",
                    "lenderName": "CHERRY CRK MTG CO INC"
                  }
                ],
                "mortgageRecord": [
                  {
                    "firstMortgageAmount": "674500",
                    "priorFirstMorgageAmount": "520230"
                  }
                ]
              },
              "daysSinceRecordingDate": "107"
            },
            "proximity": "0.46"
          },
          {
            "property": {
              "address": {
                "addressLine1": "350 DETROIT ST 206",
                "city": "DENVER",
                "state": "CO",
                "postalCode": "80206",
                "county": "DENVER"
              },
              "legalBriefDescription": "BROMLEY COMMONS CONDOS U-206 GAR-72",
              "recordingDate": {
                "day": "21",
                "month": "03",
                "year": "2025"
              },
              "yearBuilt": "1983",
              "buildingAreaSqFt": "941",
              "currentOwnerInformation": {
                "currentOwner": [
                  {
                    "name": {
                      "unparsedName": "GRAY DAVID / GRAY DIANE K"
                    },
                    "mailingAddress": {
                      "addressLine1": "350 DETROIT ST",
                      "city": "DENVER",
                      "state": "CO",
                      "postalCode": "80206"
                    }
                  }
                ],
                "useCode": "CONDOMINIUM"
              },
              "propertyTaxInformation": {
                "totalAssessmentValue": "478800",
                "improvementValue": "395900",
                "landValue": "82900",
                "taxAmount": "2249.34",
                "assessorMarketValue": "478800",
                "assessmentYear": "2024",
                "totalTaxableValue": "478800",
                "totalMarketValue": "478800"
              },
              "propertySaleAndRefinanceHistory": {
                "propertySaleRecord": [
                  {
                    "lastRecordingDate": {
                      "day": "21",
                      "month": "03",
                      "year": "2025"
                    },
                    "sellerName": {
                      "unparsedName": "NADLER JOHN E"
                    },
                    "titleCompanyName": "LAND TITLE GUARANTEE",
                    "lastSalePriceAmount": "550000",
                    "pricePerSqFt": "584.48"
                  },
                  {
                    "lastRecordingDate": {
                      "day": "04",
                      "month": "03",
                      "year": "2004"
                    },
                    "lastSalePriceAmount": "250000"
                  }
                ],
                "mortgageRecord": [
                  {}
                ]
              },
              "daysSinceRecordingDate": "14"
            },
            "proximity": "0.47"
          }
        ],
        "areaMap": {
          "document": "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",
          "contentType": "image/jpeg"
        }
      },
      "resultType": "hit"
    }
  ]