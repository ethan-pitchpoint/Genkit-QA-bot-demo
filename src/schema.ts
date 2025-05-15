import { z } from "genkit";

export type EmployerIDInvestigationResultItem = z.infer<typeof EmployerIDInvestigationResultDataSchema>;

/** Postal address for any party (company, phone-owner, property, borrower) */
export const AddressSchema = z.object({
  addressLine1: z
    .string()
    .optional()
    .describe(
      "First line of the street / mailing address exactly as supplied or standardized (may include unit, suite, or PO box)"
    ),
  city: z
    .string()
    .optional()
    .describe("City / town / municipality name in mixed case or all caps"),
  state: z
    .string()
    .optional()
    .describe(
      "Two-letter state, province, or region code (e.g. \'CA\', \'ON\') or full region name when a code is unavailable"
    ),
  postalCode: z
    .string()
    .optional()
    .describe(
      "Postal or ZIP code - may include ZIP+4 (\'94043-1351\') or 11-digit vendor-specific codes (\'94043135100\')"
    ),
});

/** Information the system tried to look up, exactly as it was supplied */
export const SearchInputSchema = z.object({
  companyName: z
    .string()
    .optional()
    .describe(
      "Employer name entered by the borrower / investigator (no cleaning or canonicalization applied)"
    ),
  address: AddressSchema.optional().describe(
    "Street address entered for the employer search (verbatim user input)"
  ),
  phone: z
    .string()
    .optional()
    .describe(
      "Phone number entered for the search; digits only or any user formatting (hyphens, spaces, parentheses)"
    ),
});

/** Result of a company-database search */
export const CompanySearchResultSchema = z.object({
  companyFound: z
    .boolean()
    .optional()
    .describe(
      "True when at least one record judged to match the input company was returned (provider may JSON-encode this boolean as a string)"
    ),
  companyName: z
    .string()
    .optional()
    .describe(
      "Exact legal or trade name returned by the business-data provider (often all caps)"
    ),
  address: AddressSchema.optional().describe(
    "Canonical business address returned (generally USPS / Canada Post-formatted)"
  ),
  phone: z
    .string()
    .optional()
    .describe("Main business phone number on file, digits only"),
  yearEstablished: z
    .string()
    .optional()
    .describe(
      "Four-digit year the business was founded, incorporated, or first registered"
    ),
  yearOfFirstAppearance: z
    .string()
    .optional()
    .describe(
      "Earliest year the business appears in any public record (can differ from establishment year)"
    ),
  estimatedSalesVolume: z
    .string()
    .optional()
    .describe(
      'Estimated annual revenue, including currency symbol and punctuation (e.g. \'$5M-$10M\', \'$13,981.00\')'
    ),
  numberOfEmployees: z
    .string()
    .optional()
    .describe(
      'Estimated headcount returned as a numeric string or range (e.g. \'2\', \'125\', \'100-249\')'
    ),
  keyExecutive: z
    .string()
    .optional()
    .describe("Name of the principal executive / owner on file"),
  primaryURL: z
    .string()
    .optional()
    .describe(
      "Company homepage or base domain, sometimes returned in uppercase (e.g. \'CINTAS.COM\')"
    ),
});

/** Result of reverse-phone lookup */
export const ReversePhoneLookupResultSchema = z.object({
  phoneNumberFound: z
    .boolean()
    .optional()
    .describe(
      "True when a record for the supplied phone number exists in the reverse-lookup service"
    ),
  location: z
    .string()
    .optional()
    .describe(
      "Free-text locality string for the number (often \'City, ST\' or generic \'U.S. Type Address\')"
    ),
  type: z
    .string()
    .optional()
    .describe(
      'Line / usage type such as \'landline\', \'mobile\', \'VoIP\', or provider-specific values like \'Business\''
    ),
  name: z
    .string()
    .optional()
    .describe(
      "Subscriber or business name registered to the phone number (often all caps)"
    ),
  address: AddressSchema.optional().describe(
    "Address tied to the phone subscriber when available"
  ),
});

/** Point-to-point distance and travel metrics */
export const TravelDistanceTimeResultSchema = z.object({
  subjectPropertyAddress: z
    .string()
    .optional()
    .describe("Full text address of the collateral property under review"),
  subjectPropertyRoadwayDistance: z
    .string()
    .optional()
    .describe(
      'Formatted driving distance from employer to property (e.g. \'1,286 mi\', \'12.3 km\')'
    ),
  subjectPropertyTravelTime: z
    .string()
    .optional()
    .describe(
      'Formatted drive time from employer to property (e.g. \'19 hours 0 mins\', \'1 day 8 hours\')'
    ),
  borrowerAddress: z
    .string()
    .optional()
    .describe("Residential mailing address of the borrower"),
  borrowerAddressRoadwayDistance: z
    .string()
    .optional()
    .describe(
      "Formatted driving distance from employer to borrower residence (includes units, punctuation)"
    ),
  borrowerAddressTravelTime: z
    .string()
    .optional()
    .describe(
      "Formatted drive time from employer to borrower residence (human-readable)"
    ),
  subjectPropertyRoadwayDistanceInMiles: z
    .string()
    .optional()
    .describe(
      "Distance to subject property expressed as plain miles (numeric string, no units or commas)"
    ),
  borrowerAddressRoadwayDistanceInMiles: z
    .string()
    .optional()
    .describe(
      "Distance to borrower residence in plain miles (numeric string, no units or commas)"
    ),
});

/** Container for all result types */
export const ResultsSchema = z.object({
  companySearchResult: CompanySearchResultSchema.optional().describe(
    "Business-database match details for the employer"
  ),
  reversePhoneLookupResult: ReversePhoneLookupResultSchema.optional().describe(
    "Reverse-lookup data for the supplied phone number"
  ),
  travelDistanceTimeResult: TravelDistanceTimeResultSchema.optional().describe(
    "Driving distance and travel time metrics linking employer, property, and borrower"
  ),
});

/** Error details for partial or failed lookups */
export const ErrorSchema = z.object({
  code: z
    .string()
    .optional()
    .describe(
      'Machine-readable error code (e.g. \'NO_MATCH\', \'TIMEOUT\', \'RATE_LIMIT\')'
    ),
  message: z
    .string()
    .optional()
    .describe("Human-readable explanation of the error"),
});

/** Top-level envelope for an employer-ID investigation */
export const EmployerIDInvestigationResultDataSchema = z.object({
  searchInput: SearchInputSchema.optional().describe(
    "Un-standardized input parameters captured before the investigation ran"
  ),
  results: ResultsSchema.optional().describe(
    "Aggregated datasets returned when lookups succeed"
  ),
  error: z
    .array(ErrorSchema)
    .optional()
    .describe(
      "Non-fatal errors or warnings for individual lookup steps (empty when all steps succeed)"
    ),
  targetId: z
    .string()
    .optional()
    .describe(
      "Opaque identifier that links this investigation record back to the caller\'s system"
    ),
  borrowerName: z
    .string()
    .optional()
    .describe("Name of the borrower associated with this employer inquiry"),
});
