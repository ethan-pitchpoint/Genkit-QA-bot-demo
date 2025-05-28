// ForeclosureInvestigationResultData – Zod schema
// Auto‑generated from the protobuf definition plus real JSON examples.
// Each field is annotated with `.describe()` so an LLM has human‑friendly context.
// You can `parse()` API responses with this schema or introspect the metadata.

import { z } from "genkit";

/* ------------------------------------------------------------------
 * Basic reusable pieces
 * ------------------------------------------------------------------ */

/** A calendar date expressed as three strings (always zero‑padded in the JSON we receive). */
export const NominalDateSchema = z
  .object({
    year: z.string().describe("Four‑digit year, e.g. ‘2025’"),
    month: z.string().describe("Month number 1 – 12 as a string"),
    day: z.string().describe("Day of month 1 – 31 as a string"),
  })
  .describe("A simple YYYY‑MM‑DD date split into three string fields (legacy RIS format). *Note:* not ISO‑8601.");

/** A postal address normalised by Risk Insight services. */
export const StandardizedAddressSchema = z
  .object({
    houseNumber: z.string().optional().describe("Street number, no fractions"),
    preDir: z.string().optional().describe("Directional prefix such as ‘N’, ‘SW’"),
    streetName: z.string().optional().describe("Base street name in proper case"),
    streetSuffix: z.string().optional().describe("Street type abbreviation, e.g. ‘St’, ‘Ave’"),
    postDir: z.string().optional().describe("Directional suffix, rarely present"),
    apt: z.string().optional().describe("Apartment / unit designator"),
    aptType: z.string().optional().describe("Full word for the `apt` field, e.g. ‘UNIT’"),
    city: z.string().optional().describe("USPS‑approved municipality name"),
    state: z.string().optional().describe("Two‑letter state / territory code"),
    county: z.string().optional().describe("County name in proper case"),
    zip: z.string().optional().describe("Five‑digit ZIP code"),
    plusFour: z.string().optional().describe("ZIP+4 extension"),
    countyFips: z.string().optional().describe("Five‑digit FIPS county code"),
    metadataRecordType: z.string().optional().describe("RIS internal source flag for this record, e.g. ‘S’ for SmartM‑parsed")
  })
  .describe("Fully parsed single‑line address with big‑int metadata (all fields optional because presence varies by source)");

/* ------------------------------------------------------------------
 * Enum helpers – represented as strings in the JSON payloads we’ve seen
 * ------------------------------------------------------------------ */

export const StatusTypeEnum = z
  .enum(["VALID", "INVALID", "NO_RESPONSE", "NOT_FOUND", "ERROR"])
  .describe("High‑level SSN validation outcome returned by the RIS bureau bridge");

export const PartnerStatusEnum = z
  .enum([
    "MATCHED",
    "NO_EXACT_MATCH",
    "MULTIPLE_MATCH",
    "NO_HIT",
    "INVALID",
    "UNKNOWN",
  ])
  .describe("Matching quality result when reconciling CoreLogic transactions with RIS borrower/subject");

export const TRFLStatusEnum = z.enum([
  "BORROWER_IS_SELLER_BUYER_IS_BANK",
  "BORROWER_LAST_NAME_IS_SELLER",
  "BORROWER_IS_TRUSTOR",
  "BORROWER_LAST_NAME_IS_BUYER",
  "SHERIFF_IS_SELLER",
  "PREVIOUS_BUYER_MATCH_WITH_ASSOCIATED_SHERIFF_RECORD",
]);

export const TransactionEvaluationStatusEnum = z.enum([
  "TRANSFER_TRANSACTION_TYPE",
  "RECORDING_DATE_WITHIN_7_YEARS",
  "DOCUMENT_TYPE_SHERIFF_LIST_MATCH",
  "LENDER_OWNED_SALE_TYPE",
  "BUYER_BORROWER_ENTITY_CODE_SHERIFF_LIST_MATCH",
  "BUYER_BORROWER_NAME_ADMINISTRATOR_LIST_MATCH",
  "SELLER_NAME_MATCH",
  "SELLER_FIRST_NAME_BLANK",
  "PREVIOUS_TRANSACTION_BUYER_BORROWER_NAME_MATCH",
  "DEED_DOCUMENT_TYPE",
  "SELLER_NAME_ADMINISTRATOR_LIST_MATCH",
  "SELLER_NAME_SHERIFF_LIST_MATCH",
  "SELLER_ENTITY_CODE_SHERIFF_LIST_MATCH",
  "LENDER_SOLD_SALE_TYPE",
  "FORECLOSURE_TRANSACTION_TYPE",
  "FORECLOSURE_FORECLOSURE_TYPE",
  "AUCTION_DATE_WITHIN_7_YEARS",
  "SCHEDULED_SALE_DATE_WITHIN_7_YEARS",
  "FIRST_LEGAL_DATE_WITHIN_7_YEARS",
  "PRE_FORECLOSURE_DOCUMENT_TYPE",
  "BUYER_BORROWER_NAME_MATCH",
  "BUYER_BORROWER_FIRST_NAME_BLANK",
  "RELEASE_TRANSACTION_TYPE",
  "BUYER_BORROWER_NAME_TRUST_MATCH",
  "SELLER_NAME_TRUST_MATCH",
  "FORCED_SALE_SALE_TYPE",
  "INCOMPLETE_TRANSFER_RECORD",
  "VESTING_DESCRIPTION_SHERIFF_LIST_MATCH",
  "SALE_TRANSACTION_TYPE",
  "POST_FORECLOSURE_DOCUMENT_TYPE",
  "DOCUMENT_TYPE_CONTAINS_FINANCE",
  "DOCUMENT_DESCRIPTION_IS_CORRECTION_DEED",
  "BUYER_BORROWER_NAME_ANY_TRUST_MATCH",
]);

export const TransactionEvaluationSummaryStatusEnum = z.enum([
  "FINAL_FORECLOSURE_EVENT",
  "POST_FORECLOSURE_EVENT",
  "PRE_FORECLOSURE_EVENT",
  "TRANSFER_TO_LENDER_EVENT",
  "BORROWER_APPEARS_IN_HISTORY",
]);

export const BorrowerOwnedPropertyStatusEnum = z.enum([
  "OWNER_NAME_MATCHES",
  "OWNER_NAME_INCLUDES_TRUST",
  "OWNER_NAME_LAST_NAME_MATCH",
  "MOST_RECENT_BUYER_NAME_MATCH",
]);

export const BorrowerOwnedPropertyStatusSummaryEnum = z.enum([
  "OWNER_NAME_MATCH_CASE",
  "TRUST_CASE",
]);

export const MersStatusEnum = z.enum(["SUCCESS", "FAILED", "NO_RESPONSE"]);

/* ------------------------------------------------------------------
 * Deeply nested pieces (UsageItem, Address, etc.)
 * ------------------------------------------------------------------ */

export const SsnValidationAddressSchema = StandardizedAddressSchema.extend({
  preDir: z.string().optional(),
  postDir: z.string().optional(),
  apt: z.string().optional(),
  aptType: z.string().optional(),
}).describe("Address object used specifically within SSN‑validation responses (fields mirror USPS components)");

export const UsageItemSchema = z
  .object({
    displayName: z.string().describe("Full name exactly as returned by bureau"),
    firstName: z.string().optional().describe("Parsed first name"),
    middleName: z.string().optional().describe("Parsed middle name / initial"),
    lastName: z.string().optional().describe("Parsed last name"),
    dateOfBirth: NominalDateSchema.optional(),
    address: z.string().optional().describe("Single‑line mailing address as originally provided"),
    firstSeen: NominalDateSchema.optional(),
    lastSeen: NominalDateSchema.optional(),
    phone: z.string().optional().describe("10‑digit phone number without punctuation"),
    matchCode: z.number().optional().describe("RIS proprietary numeric quality flag for name ↔ SSN match (higher ⇒ better)"),
  })
  .describe("One historical use of the SSN with associated PII");

export const UsageItemHolderSchema: z.ZodType<any> = z
  .object({
    usageItem: z.array(UsageItemSchema).describe("One‑to‑many collection of `UsageItem`s for a specific address"),
    addressDetail: SsnValidationAddressSchema.optional(),
    lastSeen: NominalDateSchema.optional(),
    firstSeen: NominalDateSchema.optional(),
    lastNames: z.array(z.string()).optional().describe("Distinct set of surnames observed at this address"),
    standardizedAddress: StandardizedAddressSchema.optional(),
    id: z.string().describe("Stable UUID keyed by RIS for this usage collection"),
  })
  .describe("Aggregated bureau facts for a single address + SSN combo");

export const SSNValidationInfoSchema = z
  .object({
    status: StatusTypeEnum.optional().describe("Overall validation result – missing if caller sets `shouldErrorOnInvalidSSN` true and status is invalid"),
    usageItemHolder: z
      .array(UsageItemHolderSchema)
      .optional()
      .describe("All address groupings that *passed* bureau validation"),
    shouldErrorOnErrorReport: z
      .boolean()
      .describe("If true the service should fail hard when bureau returns *any* anomaly report"),
    rejectedUsageItemHolder: z
      .array(UsageItemHolderSchema)
      .optional()
      .describe("Address groupings present in the bureau response but excluded because they violate service business rules"),
  })
  .describe("Full SSN verification payload with both accepted and rejected evidence");

/* ------------------------------------------------------------------
 * MERS structures
 * ------------------------------------------------------------------ */

export const MersParsedAddressSchema = z
  .object({
    id: z.string().describe("UUID linking back to MERS detail record"),
    houseNumber: z.string().optional(),
    streetName: z.string().optional(),
    streetSuffix: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    apartmentOrUnit: z.string().optional(),
    directionPrefix: z.string().optional(),
    countyFIPSCode: z.string().optional(),
    stateFIPSCode: z.string().optional(),
    firstSeen: NominalDateSchema.optional(),
    standardizedAddress: StandardizedAddressSchema.optional(),
  })
  .describe("Address block as interpreted from the MERS registry (Mortgage Electronic Registration System)");

export const MersInfoSchema = z
  .object({
    id: z.string().describe("Primary key for the MERS query run"),
    mersParsedAddress: z
      .array(MersParsedAddressSchema)
      .describe("Every property address returned by the MERS search"),
    mersStatusEnum: MersStatusEnum.optional().describe("High‑level status of the MERS call"),
  })
  .describe("Results of querying the MERS registry for any mortgage assignments");

/* ------------------------------------------------------------------
 * Location & transaction‑history blocks
 * ------------------------------------------------------------------ */

export const LocationSchema = z
  .object({
    id: z.string().describe("UUID for the parcel record inside RIS cache"),
    fips: z.string().optional().describe("State+county FIPS code (5 digits)"),
    apn: z.string().optional().describe("Assessor’s Parcel Number (county format)"),
    address: z.string().optional().describe("Single‑line site address"),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    zip4: z.string().optional(),
    unitType: z.string().optional(),
    unitNumber: z.string().optional(),
    owner: z.string().optional().describe("Owner name as stored by county assessor"),
    ownerMatchStatus: z.string().optional().describe("RIS match quality of owner name vs borrower name"),
    county: z.string().optional(),
    streetName: z.string().optional(),
    houseNumber: z.string().optional(),
  })
  .describe("One tax‑parcel or legal‑site record that might relate to the borrower");

export const EntitySchema = z
  .object({
    firstAndMiddleName: z.string().optional(),
    lastOrCorporateName: z.string().optional(),
    unparsedName: z.string().optional().describe("Original buyer/seller string exactly as found in deed"),
    entityCodeDesc: z.string().optional().describe("Classifier string like ‘INDIVIDUAL’, ‘TRUST’, ‘BANK’"),
    transactionEvaluationStatusEnum: z
      .array(TransactionEvaluationStatusEnum)
      .optional()
      .describe("Per‑entity evaluation flags that triggered on this name"),
  })
  .describe("One party (buyer, seller, lender, etc.) appearing on a recorded document");

export const TransactionHolderSchema: z.ZodType<any> = z
  .object({
    id: z.string(),
    recordingDate: NominalDateSchema.optional(),
    trflStatusEnum: z.array(TRFLStatusEnum).optional(),
    documentType: z.string().optional(),
    documentDescription: z.string().optional(),
    salePrice: z.string().optional(),
    loanAmount: z.string().optional(),
    buyerBorrower: z.array(EntitySchema).optional(),
    sellers: z.array(EntitySchema).optional(),
    relatedRecordId: z.string().optional(),
    briefLegalDescription: z.string().optional(),
    transactionEvaluationStatusEnum: z.array(TransactionEvaluationStatusEnum).optional(),
    transactionEvaluationSummaryStatusEnum: z
      .array(TransactionEvaluationSummaryStatusEnum)
      .optional(),
    typeOfSale: z.string().optional(),
    foreclosureType: z.string().optional(),
    auctionDate: NominalDateSchema.optional(),
    scheduledSaleDate: NominalDateSchema.optional(),
    firstLegalDate: NominalDateSchema.optional(),
    propertyUsageType: z.string().optional(),
    originalLoansRecordingDate: NominalDateSchema.optional(),
    originalLoansRecorderDocumentNumber: z.string().optional(),
    recorderDocumentNumber: z.string().optional(),
    cancellationDate: NominalDateSchema.optional(),
    lenderName: z.string().optional(),
    assigneeName: z.string().optional(),
    mortgageReleaseDate: NominalDateSchema.optional(),
    vestingDescription: z.string().optional(),
    financeLoanType: z.string().optional(),
    financeTransferTypeDescription: z.string().optional(),
    financeOtherLoanType: z.string().optional(),
    saleDeedTypeDescription: z.string().optional(),
    docTypeDescription: z.string().optional(),
    lisPendensTypeDescription: z.string().optional(),
    financeDocumentNumber: z.string().optional(),
    originalRecordingDate: NominalDateSchema.optional(),
    originalRecordingBookPageId: z.string().optional(),
    originalDocNumberIdentifier: z.string().optional(),
  })
  .describe("One recorded deed/mortgage/release etc. captured from CoreLogic or county images");

export const TransactionHolderContainerSchema = z
  .object({
    sourceId: z
      .string()
      .describe("Origin dataset – e.g. ‘corelogic_voluntary_liens’, ‘blackknight_foreclosure’"),
    status: z.string().optional(),
    transactionHolder: z
      .array(TransactionHolderSchema)
      .optional()
      .describe("Every instrument that survived RIS filtering for this source"),
    partnerStatusEnum: PartnerStatusEnum.optional(),
    ownerName: z.string().optional(),
    locationId: z.array(z.string()).optional(),
    borrowerOwnedPropertyStatusEnum: z
      .array(BorrowerOwnedPropertyStatusEnum)
      .optional(),
    borrowerOwnedPropertyStatusSummaryEnum: z
      .array(BorrowerOwnedPropertyStatusSummaryEnum)
      .optional(),
    propertyUsageType: z.string().optional(),
    recentSalesPrice: z.string().optional(),
    legalDescription: z.string().optional(),
  })
  .describe("Wrapper grouping all documents for a given source with roll‑up analytics");

export const TransactionHistoryInfoSchema = z
  .object({
    transactionHolder: z.array(TransactionHolderSchema).optional(),
    tfrlStatus: z.string().optional().describe("True/No flag from Freddie Mac TFRL service"),
    trflStatusList: z.array(TRFLStatusEnum).optional(),
    newAddressesFoundCount: z.number().optional(),
    locationId: z.array(z.string()).optional(),
    partnerStatus: PartnerStatusEnum.optional(),
    propertyUsageType: z.string().optional(),
    recentSalesPrice: z.string().optional(),
    borrowerOwnedPropertyStatusEnum: z
      .array(BorrowerOwnedPropertyStatusEnum)
      .optional(),
    borrowerOwnedPropertyStatusSummaryEnum: z
      .array(BorrowerOwnedPropertyStatusSummaryEnum)
      .optional(),
    legalDescription: z.string().optional(),
    ownerName: z.string().optional(),
    transactionHolderContainer: z
      .array(TransactionHolderContainerSchema)
      .optional(),
  })
  .describe("Full purchase/sale/finance history as aggregated from multiple public‑record sources");

export const MailingAddressEvaluationSummarySchema = z
  .object({
    tfrlStatus: z.string().optional(),
    tfrlBorrowerName: z.string().optional(),
    tfrlRecordingDate: z.string().optional(),
    tfrlHit: z.boolean().optional(),
    ownershipStatus: z.string().optional(),
  })
  .describe("Light‑weight roll‑up flags for the mailing address, driven by Freddie Mac TFRL checks");

export const MailingAddressInfoSchema = z
  .object({
    id: z.string(),
    apn: z.string().optional(),
    fips: z.string().optional(),
    locationId: z.string().optional(),
    ssnValidationSearchableAddressId: z.array(z.string()).optional(),
    transactionHistoryInfo: TransactionHistoryInfoSchema.optional(),
    usageItemHolderId: z.string().optional(),
    evaluationSummary: MailingAddressEvaluationSummarySchema.optional(),
  })
  .describe("A mailing address that might belong to the borrower plus all public‑record activity at that address");

export const SSNValidationSearchableAddressSchema = z
  .object({
    id: z.string(),
    usageItemHolderId: z.string().optional(),
    mailingAddresInfoId: z.array(z.string()).optional(),
    locationId: z.array(z.string()).optional(),
    mersParsedAddressId: z.string().optional(),
  })
  .describe("Join table linking bureau addresses, parcel locations, MERS hits, and RIS mailingAddressInfo rows");

/* ------------------------------------------------------------------
 * Top‑level schema
 * ------------------------------------------------------------------ */

export const UniqueAliasSchema = z
  .object({
    first: z.string().optional(),
    middle: z.string().optional(),
    last: z.string().optional(),
    lastSeen: NominalDateSchema.optional(),
  })
  .describe("Alternate spellings / name variations observed for the borrower (often from bureau data)");

export const ForeclosureInvestigationResultSchema = z
  .object({
    targetId: z.string().describe("Primary borrower identifier (legacy DVS id – 16‑digit zero‑padded string)"),
    shouldErrorOnInvalidSSN: z
      .boolean()
      .describe("If true, service will throw instead of returning partial results when SSN is invalid"),
    uniqueAlias: z.array(UniqueAliasSchema).optional(),
    ssnValidationInfo: SSNValidationInfoSchema.optional(),
    location: z.array(LocationSchema).optional(),
    ssnValidationSearchableAddress: z
      .array(SSNValidationSearchableAddressSchema)
      .optional(),
    mailingAddressInfo: z.array(MailingAddressInfoSchema).optional(),
    nameMatchThreshold: z
      .number()
      .describe("Fuzzy‑match threshold (0–1) used to decide if parcel owner resembles borrower"),
    mersInfo: MersInfoSchema.optional(),
    shouldErrorOnMissingTxn: z
      .boolean()
      .describe("If true, service will throw when no public‑record documents are found for any address"),
    executionStrategy: z
      .string()
      .optional()
      .describe("Algorithm profile indicating which data vendors and matching heuristics were run"),
    maxAgeSSNAddress: z
      .string()
      .optional()
      .describe("How far back (years) we accept SSN address evidence when linking to parcels"),
  })
  .describe(
    "Full response from the RIS Foreclosure Investigation microservice – merges bureau, parcel, CoreLogic, MERS, and in‑house analytics."
  );

  export type ForeclosureInvestigationResultItem = z.infer<typeof ForeclosureInvestigationResultSchema>;
