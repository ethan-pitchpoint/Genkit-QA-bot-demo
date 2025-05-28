import { z } from "genkit";
// Basic address information used throughout the schema
const AddressSchema = z.object({
  addressLine1: z.string().describe("Primary street address"),
  addressLine2: z.string().optional().describe("Secondary address line, if any"),
  city: z.string().describe("City name"),
  state: z.string().describe("State or province abbreviation"),
  postalCode: z.string().describe("Primary postal code"),
  plusFourPostalCode: z.string().optional().describe("Postal code extension, if available"),
  apn: z.string().optional().describe("Assessor's parcel number"),
  countyFIPSCode: z.string().optional().describe("County FIPS code"),
  county: z.string().optional().describe("County name"),
}).describe("Standard US postal address details");

// Date with separate string fields for day, month, and year
const NominalDateSchema = z.object({
  day: z.string().describe("Day of the month as a string"),
  month: z.string().describe("Month as a string"),
  year: z.string().describe("Year as a string"),
}).describe("Simple date representation with day, month, and year");

// Parsed and unparsed representation of a person's name
const ParsedNameSchema = z.object({
  firstName: z.string().optional().describe("First name"),
  middleName: z.string().optional().describe("Middle name, if any"),
  lastName: z.string().optional().describe("Last name"),
}).describe("Detailed name broken into components");

const NameSchema = z.object({
  unparsedName: z.string().describe("Full name as found in records"),
  parsedName: ParsedNameSchema.optional(),
  type: z.string().optional().describe("Role type (e.g., buyer, seller)")
}).describe("Person's name information with parsed and raw forms");

// Ownership details for a property
const CurrentOwnerSchema = z.object({
  name: NameSchema,
  mailingAddress: AddressSchema,
  ownershipType: z.string().optional().describe("Ownership category, if available")
}).describe("Individual current owner details");

const CurrentOwnerInformationSchema = z.object({
  currentOwner: z.array(CurrentOwnerSchema).describe("List of current owners"),
  useCode: z.string().describe("Property use code (e.g., residential)")
}).describe("Overall current ownership details");

// Tax assessment and market value breakdown
const PropertyTaxInformationSchema = z.object({
  totalAssessmentValue: z.string().describe("Total assessed value"),
  improvementValue: z.string().describe("Assessed value of improvements"),
  landValue: z.string().describe("Assessed value of land"),
  taxAmount: z.string().describe("Current tax amount due"),
  delinquentYear: z.string().optional().describe("Year of any delinquency"),
  assessorMarketValue: z.string().optional().describe("Market value per assessor"),
  assessmentYear: z.string().optional().describe("Year of the assessment"),
  totalTaxableValue: z.string().optional().describe("Total taxable value"),
  totalMarketValue: z.string().optional().describe("Total market value"),
  marketImprovementValue: z.string().optional().describe("Market value of improvements"),
  marketLandValue: z.string().optional().describe("Market value of land"),
}).describe("Detailed property tax and assessment figures");

// Historical sale, transaction, and mortgage records
const PropertySaleRecordSchema = z.object({
  lastRecordingDate: NominalDateSchema,
  sellerName: NameSchema.optional(),
  titleCompanyName: z.string().optional(),
  lastSalePriceAmount: z.string().optional(),
  buyerName: NameSchema.optional(),
  lenderName: z.string().optional(),
  pricePerSqFt: z.string().optional(),
}).describe("Single property sale history entry");

const PropertyTransactionRecordSchema = z.object({
  financeRecordingDate: NominalDateSchema,
  borrower: z.array(z.string()).optional().describe("Names of borrowers"),
  financeTitleCompanyName: z.string().optional(),
  financeLenderName: z.string().optional(),
  financeTransferTypeDescription: z.string().optional(),
  financeLoanAmount: z.string().optional(),
}).describe("Single finance/transaction history entry");

const MortgageRecordSchema = z.object({
  firstMortgageAmount: z.string().optional(),
  secondMorgageAmount: z.string().optional(),
  priorFirstMorgageAmount: z.string().optional(),
  titleCompanyName: z.string().optional(),
  lastSalePriceAmount: z.string().optional(),
  buyerName: NameSchema.optional(),
}).describe("Single mortgage record entry");

const PropertySaleAndRefinanceHistorySchema = z.object({
  propertySaleRecord: z.array(PropertySaleRecordSchema).describe("List of sale records"),
  propertyTransactionRecord: z.array(PropertyTransactionRecordSchema).optional().describe("List of finance transactions, if any"),
  mortgageRecord: z.array(MortgageRecordSchema).describe("List of mortgage records"),
}).describe("Full sale and refinance history, with transactions optional");

// Main property details
const PropertySchema = z.object({
  address: AddressSchema,
  legalBriefDescription: z.string().describe("Legal description of the property"),
  recordingDate: NominalDateSchema,
  buyers: z.array(NameSchema).optional().describe("Buyers involved in the transaction"),
  yearBuilt: z.string().optional(),
  buildingAreaSqFt: z.string().optional(),
  lotSizeSqFt: z.string().optional(),
  lotSize: z.string().optional(),
  lotSizeUnit: z.string().optional(),
  totalRooms: z.string().optional(),
  bedrooms: z.string().optional(),
  baths: z.string().optional(),
  partialBaths: z.string().optional(),
  garageType: z.string().optional(),
  currentOwnerInformation: CurrentOwnerInformationSchema,
  propertyTaxInformation: PropertyTaxInformationSchema,
  propertySaleAndRefinanceHistory: PropertySaleAndRefinanceHistorySchema,
  indicator: z.string().optional(),
  landUse: z.string().optional(),
  stories: z.string().optional(),
  pool: z.string().optional(),
  daysSinceRecordingDate: z.string().optional(),
}).describe("Comprehensive record for a single property");

const MultiplePropertiesSchema = z.object({
  property: z.array(PropertySchema).describe("List of multiple properties found"),
}).describe("Wrapper for handling multiple properties in the input");

// Transaction and comparables in the results
const TransactionSchema = z.object({
  recordingDate: NominalDateSchema,
  transactionType: z.string().describe("Type of transaction"),
  buyers: z.array(NameSchema).optional(),
  sellers: z.array(NameSchema).optional(),
  saleAmount: z.string().optional(),
  loanAmount: z.string().optional(),
  lenders: z.array(NameSchema).optional(),
  documentDescription: z.string().optional(),
  transactionId: z.string().optional(),
  documentNumber: z.string().optional(),
}).describe("Generic transaction entry in results");

const ComparablePropertySchema = z.object({
  property: PropertySchema,
  proximity: z.string().describe("Proximity score/distance to subject property"),
  indicator: z.string().optional(),
}).describe("Comparable property used for valuation comparison");

const AreaMapSchema = z.object({
  document: z.string().describe("Base64-encoded map image"),
  contentType: z.string().describe("MIME type of the map document"),
}).describe("Geospatial map data for the property");

// Results wrapper containing all returned data
const ResultsSchema = z.object({
  propertyRecordIdentified: PropertySchema,
  instantTransactionHistory: PropertySchema.optional().describe("Initial transaction history, if included"),
  transaction: z.array(TransactionSchema).optional().describe("List of transactions, if any"),
  comparableProperty: z.array(ComparablePropertySchema).describe("List of comparables"),
  areaMap: AreaMapSchema,
}).describe("Container for all result sections of the investigation, with some fields optional");

const ErrorSchema = z.object({
  code: z.string().describe("Error code from the investigation service"),
  message: z.string().describe("Descriptive error message"),
}).describe("Error information returned by the service");

// Top-level schema for the full investigation response
export const PropertyInvestigationResultDataSchema = z.object({
  targetId: z.string().describe("Unique identifier for the target property"),
  input: z.object({ address: AddressSchema }).describe("Original input address provided"),
  multipleProperties: MultiplePropertiesSchema.optional(),
  results: ResultsSchema,
  error: z.array(ErrorSchema).optional().describe("List of errors encountered"),
  resultType: z.string().describe("Overall result type, e.g., 'hit' or 'miss'"),
}).describe("Full response format for property investigation results");

export type PropertyInvestigationResultItem = z.infer<typeof PropertyInvestigationResultDataSchema>;
