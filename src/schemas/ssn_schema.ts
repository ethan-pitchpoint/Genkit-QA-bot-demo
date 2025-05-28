import { z } from 'genkit';

// Enum for the status of an SSN lookup operation
export const StatusTypeSchema = z.enum([
  "SUCCESS",     // The lookup was successful and data was returned
  "NOT_FOUND",   // No matching SSN was found
  "NO_RESPONSE", // The service did not respond
  "ERROR"        // An error occurred during lookup
]).describe("Status of the SSN lookup operation");

// Schema for a nominal date without timezone information
export const NominalDateSchema = z.object({
  year: z.string().describe("Year component of the date, as a string"),
  month: z.string().describe("Month component of the date, as a string"),
  day: z.string().describe("Day component of the date, as a string")
}).describe("A calendar date represented by year, month, and day strings");

// Schema for an alternative name record
export const UniqueAliasSchema = z.object({
  first: z.string().describe("First name in the alias record"),
  middle: z.string().describe("Middle name or initial in the alias record"),
  last: z.string().describe("Last name in the alias record"),
  lastSeen: NominalDateSchema.describe("The date when this alias was last observed")
}).describe("An alternative alias for an individual, along with the last seen date");

// Schema for a postal address
export const AddressSchema = z.object({
  addressLine1: z.string().describe("Primary street address line"),
  addressLine2: z.string().optional().describe("Secondary street address line, if present"),
  city: z.string().describe("City of the address"),
  postalCode: z.string().describe("Postal or ZIP code"),
  state: z.string().describe("State or province code"),
  country: z.string().describe("Country code (e.g., 'us')")
}).describe("A standard postal address structure");

// Root schema for SSN lookup result data
export const SSNResultDataSchema = z.object({
  targetId: z.string().describe("Unique identifier for the SSN lookup target"),
  uniqueAlias: z.array(UniqueAliasSchema).describe("List of alternative names associated with the SSN"),
  address: AddressSchema.describe("Address details associated with the target"),
  status: StatusTypeSchema.optional().describe("Outcome status of the lookup; defaults to SUCCESS if omitted")
}).describe("Result data structure returned from an SSN lookup operation");

export type SSNResultItem = z.infer<typeof SSNResultDataSchema>;