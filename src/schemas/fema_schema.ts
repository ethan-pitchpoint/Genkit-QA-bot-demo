import { z } from "genkit";

/**
 * Represents a date broken into day, month, and year components.
 */
const NominalDateSchema = z.object({
  day: z.string().describe("Day of the month, e.g. '05'"),
  month: z.string().describe("Month of the year, e.g. '09'"),
  year: z.string().describe("Four-digit year, e.g. '2023'"),
}).describe("NominalDate: a simple date object");

/**
 * Indicates which FEMA assistance programs were declared for a disaster.
 */
const ProgramDeclarationSchema = z.object({
  individualAssistance: z.boolean().describe("True if Individual Assistance was declared"),
  individualAndHouseholds: z.boolean().describe("True if Individual & Households Program was declared"),
  hazardMitigation: z.boolean().describe("True if Hazard Mitigation Assistance was declared"),
  publicAssistance: z.boolean().describe("True if Public Assistance was declared"),
}).describe("ProgramDeclaration: FEMA program flags");

/**
 * A single FEMA disaster record.
 */
const DisasterSchema = z.object({
  disasterNumber: z.string().describe("Unique FEMA disaster identifier, e.g. 'DR-4354'"),
  title: z.string().describe("Official title of the disaster declaration"),
  declarationDate: NominalDateSchema.describe("Date FEMA officially declared the disaster"),
  beginDate: NominalDateSchema.describe("Date the incident began"),
  endDate: NominalDateSchema.describe("Date the incident ended"),
  closeoutDate: NominalDateSchema.describe("Date FEMA closed out the disaster"),
  state: z.string().describe("State abbreviation where the disaster occurred"),
  disasterType: z.string().describe("Category of disaster, e.g. 'Flood'"),
  incidentType: z.string().describe("Specific incident type, e.g. 'Flash Flood'"),
  area: z.string().describe("Geographic area affected by the disaster"),
  programDeclared: ProgramDeclarationSchema.describe("Programs declared for this disaster"),
  refreshDate: NominalDateSchema.describe("Last update timestamp for this record"),
}).describe("Disaster: detailed FEMA disaster information");

/**
 * User-provided address inputs for the query.
 */
const InputSchema = z.object({
  addressLine1: z.string().describe("Street address line 1, including unit if any"),
  city: z.string().describe("City name"),
  state: z.string().describe("State abbreviation"),
  postalCode: z.string().describe("ZIP or postal code"),
}).describe("Input: address details");

/**
 * Filters applied to the FEMA disasters search.
 */
const SearchCriteriaSchema = z.object({
  state: z.string().describe("State abbreviation filter"),
  postalCode: z.string().describe("Postal code filter"),
  county: z.string().describe("County name filter"),
  disasters: z.string().describe("Disaster type filter, e.g. 'ANY' or specific categories"),
}).describe("SearchCriteria: search filters");

/**
 * Error returned by the FEMA API.
 */
const ErrorSchema = z.object({
  code: z.string().describe("Error code from the FEMA API"),
  message: z.string().describe("Detailed error message"),
}).describe("Error: API error information");

/**
 * Top-level schema for the FEMADeclaredDisastersResultData message.
 */
export const FEMADeclaredDisastersResultDataSchema = z.object({
  input: InputSchema.describe("User address input for the FEMA query"),
  searchCriteria: SearchCriteriaSchema.describe("Filters used to query FEMA disasters"),
  disaster: z.array(DisasterSchema).optional().describe("All disasters matching the query"),
  disasterLast120Days: z.array(DisasterSchema).optional().describe("Disasters declared in the last 120 days"),
  numberOfDaysSinceLastDisaster: z
    .number()
    .int()
    .optional()
    .describe("Days since the most recent disaster; undefined if no disasters found"),
  error: z.array(ErrorSchema).optional().describe("List of errors returned by the API, if any"),
  targetId: z.string().describe("Unique identifier for this query request"),
}).describe("FEMADeclaredDisastersResultData: complete result set for a FEMA declared disasters lookup");


export type FEMAResultItem = z.infer<typeof FEMADeclaredDisastersResultDataSchema>;
