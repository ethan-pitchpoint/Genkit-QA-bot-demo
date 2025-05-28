import { DetailedBLJResultItem } from '../schemas/blj_schema.js'

export const BLJ_DATA: Array<DetailedBLJResultItem> = [
    {
      "filters": {
        "excludeBankruptcies": "false",
        "skipNameValidation": "false",
        "filterVerbiage": "Judgment satisfied = 7 years; Judgment unsatisfied = 7 years; Lien released = 7 years; Lien unreleased = 10 years; Bankruptcy chapter 7 or 11 dismissed or discharged = 10 years; Bankruptcy chapter 7 or 11 not dismissed or discharged = 10 years; Bankruptcy chapter 13 dismissed or discharged = 7 years; Bankruptcy chapter 13 not dismissed or discharged = 10 years"
      },
      "error": [
        {
          "code": "4",
          "message": "SSN/Name mismatch; check input if correct contact your support representative"
        }
      ],
      "targetId": "0000000000011628375"
    },
    {
      "filters": {
        "excludeBankruptcies": "false",
        "skipNameValidation": "false",
        "filterVerbiage": "Judgment satisfied = 7 years; Judgment unsatisfied = 7 years; Lien released = 7 years; Lien unreleased = 10 years; Bankruptcy chapter 7 or 11 dismissed or discharged = 10 years; Bankruptcy chapter 7 or 11 not dismissed or discharged = 10 years; Bankruptcy chapter 13 dismissed or discharged = 7 years; Bankruptcy chapter 13 not dismissed or discharged = 10 years"
      },
      "bankruptciesFound": 0,
      "judgmentsFound": 0,
      "liensFound": 0,
      "results": {},
      "message": [
        {
          "code": "0",
          "text": "No Errors"
        }
      ],
      "targetId": "0000000000011628387"
    }
  ]