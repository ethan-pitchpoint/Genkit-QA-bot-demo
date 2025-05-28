import { IDInvestigationResultItem } from '../schemas/ID_investigation_schema.js'

export const ID_DATA: Array<IDInvestigationResultItem> = [
        {
            "targetId": "0000000000011628375",
            "inputData": {
                "name": "Clara Mid Beller",
                "addressLine1": "739 E Banyan St # 3",
                "city": "Ontario",
                "state": "CALIFORNIA",
                "zip": "91761",
                "ssn": "881-81-8881",
                "dateOfBirth": "12/19/1967",
                "phone": "(212) 555-4444(home) (650) 253-0000(business)"
            },
            "score": {
                "validationScore": "3",
                "keyDriver": [
                    {
                        "rank": 1,
                        "description": "Date Of Birth could not be verified"
                    },
                    {
                        "rank": 1,
                        "description": "Name not reported at Address"
                    },
                    {
                        "rank": 1,
                        "description": "Phone Number could not be verified"
                    }
                ]
            },
            "results": {
                "firstName": {
                    "input": "Clara Mid",
                    "result": "Failed"
                },
                "lastName": {
                    "input": "Beller",
                    "result": "Failed"
                },
                "address": {
                    "input": "739 E Banyan St # 3",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Name not reported at Address"
                        ]
                    }
                },
                "phone": {
                    "input": "(212) 555-4444",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Phone Number could not be verified",
                            "Phone reported only with different name(s) or Address(es)",
                            "Phone reported only with different Last name(s)",
                            "Phone reported only with different Address(es)",
                            "Phone reported only with different First name(s)"
                        ]
                    }
                },
                "ssn": {
                    "input": "881-81-8881",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Social Reported Only with Different Address(es)",
                            "Social Reported Only with Different Last Name(s)",
                            "Social Reported Only with Different First Name(s)"
                        ]
                    }
                },
                "dob": {
                    "input": "1967-12-19",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Date Of Birth could not be verified"
                        ]
                    }
                },
                "zip": {
                    "input": "91761",
                    "result": "Pass",
                    "messages": {
                        "message": [
                            "Match to zip+4 file"
                        ]
                    }
                }
            },
            "checks": {
                "notOnSSADeathMasterFile": {
                    "result": "Pass"
                },
                "validUSPSAddress": {
                    "result": "Pass"
                },
                "dwellingType": {
                    "messages": {
                        "message": [
                            "Single Unit"
                        ]
                    }
                },
                "residentialOrBusiness": {
                    "messages": {
                        "message": [
                            "Residence"
                        ]
                    }
                },
                "landUse": {
                    "messages": {
                        "message": [
                            "n/a"
                        ]
                    }
                },
                "householdIncomeEstimate": {
                    "messages": {
                        "message": [
                            "n/a"
                        ]
                    }
                },
                "numberOfChildren": {
                    "messages": {
                        "message": [
                            "n/a"
                        ]
                    }
                }
            },
            "standardizedAddress": {
                "street": "739 E BANYAN ST # 3",
                "city": "ONTARIO",
                "state": "CA",
                "zip": "917616044"
            },
            "velocityInformation": {
                "address": {
                    "numberOfTimesSeen": 0
                },
                "phone": {
                    "numberOfTimesSeen": 0
                }
            }
        },
        {
            "targetId": "0000000000011628387",
            "inputData": {
                "name": "Mario Enrique Carrillo",
                "addressLine1": "739 E Banyan St # 8",
                "city": "Ontario",
                "state": "CALIFORNIA",
                "zip": "91761",
                "ssn": "222-22-2222",
                "dateOfBirth": "04/25/1980",
                "phone": "(212) 555-4444(home) (678) 252-1300(business)"
            },
            "score": {
                "validationScore": "5",
                "keyDriver": [
                    {
                        "rank": 1,
                        "description": "Social Issued Before DOB"
                    },
                    {
                        "rank": 1,
                        "description": "No Name or Address Reported with Social"
                    },
                    {
                        "rank": 1,
                        "description": "Date Of Birth could not be verified"
                    },
                    {
                        "rank": 1,
                        "description": "Name not reported at Address"
                    },
                    {
                        "rank": 1,
                        "description": "Phone Number could not be verified"
                    }
                ]
            },
            "results": {
                "firstName": {
                    "input": "Mario Enrique",
                    "result": "Failed"
                },
                "lastName": {
                    "input": "Carrillo",
                    "result": "Failed"
                },
                "address": {
                    "input": "739 E Banyan St # 8",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Name not reported at Address"
                        ]
                    }
                },
                "phone": {
                    "input": "(212) 555-4444",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Phone Number could not be verified",
                            "Phone reported only with different name(s) or Address(es)",
                            "Phone reported only with different Last name(s)",
                            "Phone reported only with different Address(es)",
                            "Phone reported only with different First name(s)"
                        ]
                    }
                },
                "ssn": {
                    "input": "222-22-2222",
                    "result": "Discrepancy",
                    "messages": {
                        "message": [
                            "Social Issued Before DOB",
                            "No Name or Address Reported with Social"
                        ]
                    }
                },
                "dob": {
                    "input": "1980-04-25",
                    "result": "Failed",
                    "messages": {
                        "message": [
                            "Date Of Birth could not be verified"
                        ]
                    }
                },
                "zip": {
                    "input": "91761",
                    "result": "Pass",
                    "messages": {
                        "message": [
                            "Match to zip+4 file"
                        ]
                    }
                }
            },
            "checks": {
                "notOnSSADeathMasterFile": {
                    "result": "Pass"
                },
                "validUSPSAddress": {
                    "result": "Pass"
                },
                "dwellingType": {
                    "messages": {
                        "message": [
                            "Single Unit"
                        ]
                    }
                },
                "residentialOrBusiness": {
                    "messages": {
                        "message": [
                            "Residence"
                        ]
                    }
                },
                "landUse": {
                    "messages": {
                        "message": [
                            "n/a"
                        ]
                    }
                },
                "householdIncomeEstimate": {
                    "messages": {
                        "message": [
                            "n/a"
                        ]
                    }
                },
                "numberOfChildren": {
                    "messages": {
                        "message": [
                            "n/a"
                        ]
                    }
                }
            },
            "standardizedAddress": {
                "street": "739 E BANYAN ST # 8",
                "city": "ONTARIO",
                "state": "CA",
                "zip": "917616044"
            },
            "velocityInformation": {
                "address": {},
                "phone": {
                    "numberOfTimesSeen": 0
                }
            }
        }
    ]