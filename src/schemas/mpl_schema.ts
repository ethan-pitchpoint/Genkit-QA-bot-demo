import { z } from "genkit";

/* ───────────────────────────────┐
   │  Lowest-level primitives      │
   └──────────────────────────────*/
const XmlDateUtcSchema = z
  .object({
    year: z.number().int().describe("Four-digit UTC year"),
    month: z.number().int().describe("UTC month (1-12)"),
    dayOfMonth: z.number().int().describe("UTC day of month (1-31)"),
  })
  .describe("Calendar date expressed in separate Y/M/D numbers (all UTC)");

const RelatedDetailSchema = z
  .object({
    key: z.string().describe("Name of the metadata attribute"),
    value: z.string().describe("Attribute value as string"),
  })
  .describe("Arbitrary key/value pair that adds context to a watch-list hit");

/* ───────────────────────────────┐
   │  Address / Contact helpers    │
   └──────────────────────────────*/
const AddressSchema = z
  .object({
    addressLine1: z.string().describe("Street line 1").optional(),
    addressLine2: z.string().optional(),
    addressLine3: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    county: z.string().optional(),
    country: z.string().optional(),
    apartmentOrUnit: z.string().optional(),
    directionPrefix: z.string().optional(),
    directionSuffix: z.string().optional(),
    houseNumber: z.string().optional(),
    militaryAPOFPO: z.string().optional(),
    postOfficeBox: z.string().optional(),
    ruralRoute: z.string().optional(),
    streetName: z.string().optional(),
    streetSuffix: z.string().optional(),
    dunsNumber: z.string().optional(),
    addressType: z.string().describe("e.g. Primary, Alternate").optional(),
  })
  .describe("Structured mailing / street address");

const PhoneNumberSchema = z
  .object({
    phoneNumber: z.string().describe("E.164 or free-form phone number"),
    location: z.string().optional(),
    phoneType: z.string().describe("Mobile, landline, fax, etc.").optional(),
    priority: z.string().describe("Order of preference (1 = highest)").optional(),
  })
  .describe("Telephone contact information");

const EmailAddressSchema = z
  .object({
    emailAddress: z.string().email().describe("RFC-5322 compliant e-mail"),
    priority: z.string().optional(),
  })
  .describe("E-mail contact information");

/* ───────────────────────────────┐
   │  Identity & nationality       │
   └──────────────────────────────*/
const AliasSchema = z
  .object({
    aliasName: z.string(),
    aliasCategory: z.string().describe("Strong, weak, nickname, etc.").optional(),
    aliasComment: z.string().optional(),
    mainRecord: z.boolean().describe("TRUE if this is the primary / official alias").optional(),
  })
  .describe("Alternate name for the subject");

const CountrySchema = z
  .object({
    countryName: z.string(),
    mainRecord: z.boolean().optional(),
  })
  .describe("Country associated with the subject");

const LicenseSchema = z
  .object({
    licenseNumber: z.string(),
    licenseType: z.string().describe("E.g. APPRAISER, OTHER"),
    licenseTypeDescription: z.string().optional(),
    licenseStatus: z.string().describe("Active / Expired / Suspended").optional(),
    licenseCertificateType: z.string().optional(),
    licenseEffectiveDate: XmlDateUtcSchema.optional(),
    licenseExpiryDate: XmlDateUtcSchema.optional(),
    licenseIssuingState: z.string().optional(),
    mainRecord: z.boolean().optional(),
  })
  .describe("Professional or regulatory license information");

const IdentificationSchema = z
  .object({
    sourceDescription: z.string().describe("Passport, National ID, etc."),
    value: z.string().describe("ID number or code"),
    country: z.string().optional(),
    expiryDate: XmlDateUtcSchema.optional(),
    issueDate: XmlDateUtcSchema.optional(),
  })
  .describe("Document or identifier issued by an authority");

const DateOfBirthSchema = z
  .object({
    birthDate: XmlDateUtcSchema,
    mainRecord: z.boolean().optional(),
  })
  .describe("Person’s date of birth");

const PlaceOfBirthSchema = z
  .object({
    placeName: z.string().describe("Free-form city/region/country text"),
    mainRecord: z.boolean().optional(),
  })
  .describe("Person’s place of birth");

/* ───────────────────────────────┐
   │  Business / Individual models │
   └──────────────────────────────*/
const RelatedEntitySchema = z
  .object({
    subjectId: z.string().describe("Opaque watch-list subject identifier"),
    designation: z.string().describe("SUBJECT / AKA / etc.").optional(),
    entityName: z.string(),
    taxId: z.string().optional(),
    vesselCallsign: z.string().optional(),
    vesselType: z.string().optional(),
    vesselFlag: z.string().optional(),
    vesselOwnerName: z.string().optional(),
    address: z.array(AddressSchema).optional(),
    phoneNumber: z.array(PhoneNumberSchema).optional(),
    emailAddress: z.array(EmailAddressSchema).optional(),
    aka: z.array(AliasSchema).optional(),
    nationality: z.array(CountrySchema).optional(),
    license: z.array(LicenseSchema).optional(),
    identification: z.array(IdentificationSchema).optional(),
  })
  .describe("Corporate subject returned by a watch-list hit");

const RelatedIndividualSchema = z
  .object({
    subjectId: z.string(),
    designation: z.string().optional(),
    individualName: z.string(),
    individualFirstName: z.string().optional(),
    individualLastName: z.string().optional(),
    individualMiddleName: z.string().optional(),
    individualNameSuffix: z.string().optional(),
    individualNamePrefix: z.string().optional(),
    individualNickName: z.string().optional(),
    individualTitle: z.string().optional(),
    individualRank: z.string().optional(),
    address: z.array(AddressSchema).optional(),
    phoneNumber: z.array(PhoneNumberSchema).optional(),
    emailAddress: z.array(EmailAddressSchema).optional(),
    alias: z.array(AliasSchema).optional(),
    dateOfBirth: z.array(DateOfBirthSchema).optional(),
    placeOfBirth: z.array(PlaceOfBirthSchema).optional(),
    nationality: z.array(CountrySchema).optional(),
    citizenship: z.array(CountrySchema).optional(),
    license: z.array(LicenseSchema).optional(),
    identification: z.array(IdentificationSchema).optional(),
  })
  .describe("Natural-person subject returned by a watch-list hit");

/* ───────────────────────────────┐
   │  Watch-list Hit               │
   └──────────────────────────────*/
const WatchListHitSchema = z
  .object({
    subjectType: z
      .string()
      .describe(
        "Program-specific subject class (e.g. OFACSubject, HUDSubject)"
      ),
    program: z.array(z.string()).optional(),
    business: z.array(RelatedEntitySchema).optional(),
    individual: z.array(RelatedIndividualSchema).optional(),
    relatedDetail: z.array(RelatedDetailSchema).optional(),
  })
  .describe("Single match (business or individual) within a watch-list response");

/* ───────────────────────────────┐
   │  Participant (party in loan)  │
   └──────────────────────────────*/
const ParticipantSchema = z
  .object({
    roleType: z
      .string()
      .describe(
        "Domain-specific role (BORROWER, LENDER, APPRAISER, etc.)"
      ),
    companyName: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    appraiserLicense: z.string().optional(),
    unparsedPersonName: z.string().describe("Raw name text if parsing failed").optional(),
    watchListHits: z.array(WatchListHitSchema).optional(),
    correlationId: z
      .string()
      .describe(
        "Encrypted or hashed identifier that ties this participant to upstream systems"
      ),
    appraiserLicenseState: z.string().optional(),
    candidates: z
      .array(WatchListHitSchema)
      .describe("Potential but not confirmed watch-list matches")
      .optional(),
  })
  .describe("Any party associated with the transaction (people, firms, agencies)");

/* ───────────────────────────────┐
   │  SubjectType & WatchList meta │
   └──────────────────────────────*/
const SubjectTypeSchema = z
  .object({
    name: z.string().describe("Canonical subject type label"),
  })
  .describe("Enumeration wrapper used by protobuf for repeated strings");

const WatchListSchema = z
  .object({
    name: z.string().describe("Short code of the watch-list"),
    description: z.string().describe("Human-readable title"),
    subjectTypes: z
      .array(SubjectTypeSchema)
      .describe("Which subject classes this list screens for"),
    customName: z
      .string()
      .describe("Optional client-specific display name")
      .optional(),
  })
  .describe("Definition of an active screening list");

/* ───────────────────────────────┐
   │  Top-level MPLResultData      │
   └──────────────────────────────*/
export const MPLResultDataSchema = z
  .object({
    targetId: z
      .string()
      .describe(
        "Primary key of the transaction / loan package being screened"
      ),
    subjectType: z
      .array(SubjectTypeSchema)
      .describe(
        "All subject classes included in this screening run (mirrors watch-lists used)"
      ),
    participant: z
      .array(ParticipantSchema)
      .describe(
        "Borrowers, lenders, agents, and any other parties extracted from source documents"
      ),
    watchLists: z
      .array(WatchListSchema)
      .describe("Metadata about every watch-list consulted"),
  })
  .describe("End-to-end results of MPL (Mortgage Party List) compliance screening");

  export type MPLResultItem = z.infer<typeof MPLResultDataSchema>;
