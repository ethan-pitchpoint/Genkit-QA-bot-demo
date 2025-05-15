import { z } from "genkit";

export type EmployerIDInvestigationResultItem = z.infer<typeof EmployerIDInvestigationResultDataSchema>;

/** Postal address for any party (company, phone-owner, property, borrower) */
export const AddressSchema = z.object({
  addressLine1: z
    .string()
    .optional().describe("Street address (first line) as it appears in public records or user input"),
  city: z.string().optional().describe("City name for the address"),
  state: z.string().optional().describe("State / province / region code for the address"),
  postalCode: z.string().optional().describe("Postal or ZIP code for the address"),
});

/** Information the system tried to look up, exactly as it was supplied */
export const SearchInputSchema = z.object({
  companyName: z
    .string()
    .optional().describe("Company name entered by the borrower or investigator"),
  address: AddressSchema.optional().describe(
    "Physical or mailing address entered for the employer search"
  ),
  phone: z
    .string()
    .optional().describe("Phone number entered for the employer search (digits, any format)"),
});

/** Result of a company-database search */
export const CompanySearchResultSchema = z.object({
  companyFound: z
    .boolean()
    .optional().describe("True if an entity matching the input was located in the reference database"),
  companyName: z
    .string()
    .optional().describe("Official or trade name returned by the database, if found"),
  address: AddressSchema.optional().describe(
    "Canonical address returned for the matched company"
  ),
  phone: z.string().optional().describe("Primary phone number on record for the company"),
  yearEstablished: z
    .string()
    .optional().describe("Four-digit year the company was founded or incorporated"),
  yearOfFirstAppearance: z
    .string()
    .optional().describe("Earliest year the company appears in any public record"),
  estimatedSalesVolume: z
    .string()
    .optional().describe("Annual revenue estimate (text representation, e.g. “$5M–$10M”)"),
  numberOfEmployees: z
    .string()
    .optional().describe("Estimated headcount range for the company"),
  keyExecutive: z
    .string()
    .optional().describe("Name of the principal executive or owner on file"),
  primaryURL: z.string().optional().describe("Main website URL for the company"),
});

/** Result of reverse-phone lookup */
export const ReversePhoneLookupResultSchema = z.object({
  phoneNumberFound: z
    .boolean()
    .optional().describe("True if the phone number exists in the reverse-lookup service"),
  location: z
    .string()
    .optional().describe("Free-text locality string associated with the phone number"),
  type: z
    .string()
    .optional().describe('Line type such as "landline", "mobile", "VoIP", etc.'),
  name: z
    .string()
    .optional().describe("Subscriber or business name registered to the phone number"),
  address: AddressSchema.optional().describe(
    "Address tied to the phone subscriber if available"
  ),
});

/** Point-to-point distance and travel metrics */
export const TravelDistanceTimeResultSchema = z.object({
  subjectPropertyAddress: z
    .string()
    .optional().describe("Address of the collateral (property under review)"),
  subjectPropertyRoadwayDistance: z
    .string()
    .optional().describe("Driving distance from employer to subject property (text, e.g. “12.3 km”)"),
  subjectPropertyTravelTime: z
    .string()
    .optional().describe("Estimated driving time from employer to subject property (e.g. “18 min”)"),
  borrowerAddress: z
    .string()
    .optional().describe("Residential address of the borrower"),
  borrowerAddressRoadwayDistance: z
    .string()
    .optional().describe("Driving distance from employer to borrower residence"),
  borrowerAddressTravelTime: z
    .string()
    .optional().describe("Estimated driving time from employer to borrower residence"),
  subjectPropertyRoadwayDistanceInMiles: z
    .string()
    .optional().describe("Driving distance to subject property converted to miles (numeric string)"),
  borrowerAddressRoadwayDistanceInMiles: z
    .string()
    .optional().describe("Driving distance to borrower residence converted to miles (numeric string)"),
});

/** Container for all result types */
export const ResultsSchema = z.object({
  companySearchResult: CompanySearchResultSchema.optional().describe(
    "Structured data returned from a business-database search"
  ),
  reversePhoneLookupResult: ReversePhoneLookupResultSchema.optional().describe(
    "Structured data returned from a reverse-phone lookup"
  ),
  travelDistanceTimeResult: TravelDistanceTimeResultSchema.optional().describe(
    "Driving distance and time metrics between employer, property and borrower"
  ),
});

/** Error details for partial or failed lookups */
export const ErrorSchema = z.object({
  code: z.string().optional().describe("Machine-readable error code (e.g. “NO_MATCH”)"),
  message: z
    .string()
    .optional().describe("Human-readable explanation of why the lookup failed"),
});

/** Top-level envelope for an employer-ID investigation */
export const EmployerIDInvestigationResultDataSchema = z.object({
  searchInput: SearchInputSchema.optional().describe(
    "Original input parameters used to perform the investigation"
  ),
  results: ResultsSchema.optional().describe(
    "Successful lookup data for company, phone, and travel distance"
  ),
  error: z
    .array(ErrorSchema)
    .optional().describe("List of errors encountered during the investigation"),
  targetId: z
    .string()
    .optional().optional().describe("Unique identifier linking this investigation to the requesting system"),
  borrowerName: z
    .string()
    .optional()
    .describe("Name of the borrower related to this employee")
});
