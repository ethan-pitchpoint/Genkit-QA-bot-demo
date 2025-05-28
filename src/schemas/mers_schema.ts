import { z } from "zod";

/* ────────────────────────────────────────────────────────────
   Leaf-level helpers
   ──────────────────────────────────────────────────────────── */

/**
 * Two–letter state FIPS code (stringified number, e.g. `"06"` for CA).
 */
const StateFIPSSchema = z
  .string()
  .regex(/^\d{2}$/, "2-digit numeric FIPS code")
  .describe("State-level FIPS code as a two-character string");

/**
 * Three–digit county FIPS code (stringified number, e.g. `"021"`).
 */
const CountyFIPSSchema = z
  .string()
  .regex(/^\d{3}$/, "3-digit numeric FIPS code")
  .describe("County-level FIPS code as a three-character string");

/**
 * Simple US postal code in the sample data (5 digits; ZIP+4 not observed).
 */
const PostalCodeSchema = z
  .string()
  .regex(/^\d{5}$/, "5-digit ZIP code")
  .describe("5-digit ZIP code");

/* ────────────────────────────────────────────────────────────
   Nested message schemas
   ──────────────────────────────────────────────────────────── */

export const IdentificationSchema = z
  .object({
    /** 3-digit county FIPS code identifying the property’s county. */
    countyFIPSCode: CountyFIPSSchema,
    /** 2-digit state FIPS code identifying the property’s state. */
    stateFIPSCode: StateFIPSSchema,
  })
  .describe("FIPS identifiers that uniquely locate the property");

export const ParsedAddressSchema = z
  .object({
    /** Apartment / suite / unit number, if any. */
    apartmentOrUnit: z.string().optional(),
    /** Compass direction preceding the street name (e.g. N, S, E, W). */
    directionPrefix: z.string().optional(),
    /** Numeric portion of the street address (e.g. 123). */
    houseNumber: z.string().describe("Street number"),
    /** The street name without suffix or prefix. */
    streetName: z.string(),
    /** Street type suffix (e.g. ST, AVE). */
    streetSuffix: z.string().optional(),
  })
  .describe("Street address broken into atomic components");

export const PropertySchema = z
  .object({
    /** City where the collateral property is located. */
    city: z.string(),
    /** Two-letter USPS state code (e.g. CA, VT). */
    state: z.string().length(2),
    /** 5-digit postal code. */
    postalCode: PostalCodeSchema,
    /** Parsed street address parts. */
    parsedStreetAddress: ParsedAddressSchema,
    /** One or more FIPS identifiers for the parcel. */
    identification: z.array(IdentificationSchema),
  })
  .describe("Physical collateral securing the mortgage lien");

export const BorrowerSchema = z
  .object({
    /** Borrower’s legal first name. */
    firstName: z.string(),
    /** Borrower’s middle name or initial. */
    middleName: z.string().optional(),
    /** Borrower’s last (family) name. */
    lastName: z.string(),
    /**
     * Flag indicating that the borrower is a non-natural person
     * (e.g. an LLC). Values seen: `"N"` (natural person) or `"Y"`.
     */
    nonPersonEntityIndicator: z.enum(["Y", "N"]),
    /** Full unparsed name when individual parts are unavailable. */
    unparsedName: z.string().optional(),
    /** Social Security Number (may be masked or absent). */
    ssn: z.string().optional(),
  })
  .describe("Primary obligor on the mortgage");

export const MERSInfoSchema = z
  .object({
    /** 18-digit Mortgage Identification Number assigned by MERS. */
    minNumber: z
      .string()
      .regex(/^\d{18}$/, "18-digit MIN")
      .describe("Unique MERS Mortgage Identification Number"),
    /**
     * `"Y"` if the original mortgagee of record is still in place,
     * `"N"` if it has changed.
     */
    originalMortgageeOfRecordIndicator: z.enum(["Y", "N"]),
    /** Date (MM/DD/YYYY) when the lien was registered with MERS. */
    registrationDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "MM/DD/YYYY"),
  })
  .describe("Core metadata stored in the MERS registry");

export const LienSchema = z
  .object({
    custodianOrganizationIdentifier: z.string().optional(),
    custodianOrganizationName: z.string().optional(),
    deactivationDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/)
      .optional()
      .describe("MM/DD/YYYY when the MIN was deactivated"),
    foreclosureStatusType: z.string().optional(),
    foreclosureStatusTypeOtherDescription: z.string().optional(),
    interimFunderOrganizationIdentifier: z.string().optional(),
    interimFunderOrganizationName: z.string().optional(),
    investorOrganizationIdentifier: z.string().optional(),
    investorOrganizationName: z.string().optional(),
    investorLoanIdentifier: z.string().optional(),
    /** Priority of the lien (e.g. `FirstLien`, `SecondLien`). */
    lienPriorityType: z.string(),
    lienPriorityTypeOtherDescription: z.string().optional(),
    /** `"Y"` if the organization is related to MERS; `"N"` otherwise. */
    minAffiliationIndicator: z.enum(["Y", "N"]),
    /** `"Y"` if the MIN has been archived by MERS. */
    minArchivedIndicator: z.enum(["Y", "N"]),
    /** Current MIN status (e.g. `Active`, `Inactive`). */
    minStatusType: z.string(),
    minStatusTypeOtherDescription: z.string().optional(),
    /** Original note (loan) date. */
    noteDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
    /** Original loan amount as a numeric string without decimals. */
    originalLoanAmount: z
      .string()
      .regex(/^\d+$/, "Whole-dollar amount as a string"),
    poolIdentifier: z.string().optional(),
    servicerOrganizationIdentifier: z.string(),
    servicerOrganizationName: z.string(),
    subservicerOrganizationIdentifier: z.string().optional(),
    subservicerOrganizationName: z.string().optional(),
    merSiRegistrationIndicator: z.enum(["Y", "N"]),
    propertyPreservation1OrganizationIdentifier: z.string().optional(),
    propertyPreservation1OrganizationName: z.string().optional(),
    propertyPreservation2OrganizationIdentifier: z.string().optional(),
    propertyPreservation2OrganizationName: z.string().optional(),
    propertyPreservation3OrganizationIdentifier: z.string().optional(),
    propertyPreservation3OrganizationName: z.string().optional(),
    propertyPreservation4OrganizationIdentifier: z.string().optional(),
    propertyPreservation4OrganizationName: z.string().optional(),
    securitizationIdentifier: z.string().optional(),
    /** `"Y"` if the property is owner-occupied. */
    ownerOccupiedIndicator: z.enum(["Y", "N"]),
    /** Name of the original note holder, if explicitly provided. */
    originalNoteHolder: z.string().optional(),
    originatingOrganizationIdentifier: z.string().optional(),

    /** Nested borrower, property, and MERS-specific info. */
    borrower: BorrowerSchema,
    property: PropertySchema,
    mersInfo: MERSInfoSchema,
  })
  .describe("One mortgage lien (MIN) record returned from the MERS query");

export const ErrorSchema = z
  .object({
    /** Machine-readable error code (e.g. `E015`). */
    code: z.string(),
    /** Human-readable description of the error. */
    description: z.string(),
    /** Categorisation of the condition that triggered the error. */
    condition: z.string().optional(),
    /** Name of the field or component associated with the error. */
    name: z.string().optional(),
  })
  .describe("Error returned by the MERS service for this query");

/* ────────────────────────────────────────────────────────────
   Top-level message schema
   ──────────────────────────────────────────────────────────── */

/**
 * Full response object for a single MERS lookup, including
 * counts by MIN status and a list of all liens found.
 */
export const MERSResultDataSchema = z.object({
  targetId: z.string(),

  counts: z.record(z.number()),

  lien: z.array(LienSchema),

  /**
   * Service-level errors.  
   * Optional: if the API call succeeds this field is often absent,
   * in which case it is coerced to an empty array.
   */
  error: z.array(ErrorSchema).optional(),
//   error: z.array(ErrorSchema).optional().default([]),
});



  export type MERSResultItem = z.infer<typeof MERSResultDataSchema>;
