import { FEMAResultItem } from '../schemas/fema_schema.js'

export const FEMA_DATA: Array<FEMAResultItem> = [
    {
      "input": {
        "addressLine1": "2 Adams St Apt 1002",
        "city": "Denver",
        "state": "CO",
        "postalCode": "80206-5726"
      },
      "searchCriteria": {
        "state": "CO",
        "postalCode": "80206-5726",
        "county": "DENVER",
        "disasters": "ANY"
      },
      "numberOfDaysSinceLastDisaster": 1833,
      "targetId": "0000000000011628427"
    }
  ]