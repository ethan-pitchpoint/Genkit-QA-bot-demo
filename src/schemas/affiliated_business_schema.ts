import { z } from 'genkit';

// Error information returned when the search encounters an issue
export const ErrorSchema = z.object({
  code: z.string().describe('Error code identifying the type of failure'),
  message: z.string().describe('Detailed description of the error encountered'),
}).describe('Error information');

// Components of a full person name
export const NameSchema = z.object({
  firstName: z.string().describe('First name of the individual'),
  middle: z.string().nullable().describe('Middle name or initial, if present'),
  lastName: z.string().describe('Last name (surname) of the individual'),
  professionalSuffix: z.string().nullable().describe('Professional suffix such as MD, PhD, etc.'),
  nameSuffix: z.string().nullable().describe('Name suffix such as Jr., Sr., III, etc.'),
}).describe('Structured person name');

// Contact details for a business or corporation
export const BusinessContactSchema = z.object({
  name: NameSchema.describe('Full structured name of the contact person'),
  title: z.string().describe('Job title or role of the contact person'),
}).describe('Business contact information');

// Raw, unparsed address fields as received from data source
export const DirtyAddressSchema = z.object({
  line1: z.string().describe('First line of the address, typically street address'),
  city: z.string().describe('City name'),
  state: z.string().describe('State or province code'),
  zip: z.string().describe('Postal or ZIP code'),
  phone: z.string().nullable().describe('Contact phone number, if available'),
}).describe('Unstructured address data');

// Parsed and simplified address components
export const SimplifiedAddressSchema = z.object({
  houseNumber: z.string().describe('Numeric portion of the street address'),
  streetName: z.string().describe('Street name without house number'),
  city: z.string().describe('City name'),
  state: z.string().describe('State or province code'),
  postalCode: z.string().describe('Standardized postal or ZIP code'),
}).describe('Structured address data');

// Container tying raw and simplified address representations
export const AddressHolderSchema = z.object({
  key: z.string().describe('Unique identifier for this address entry'),
  dirtyAddress: DirtyAddressSchema.describe('Original raw address data'),
  simplifiedAddress: SimplifiedAddressSchema.describe('Parsed and standardized address data'),
}).describe('Address holder with raw and parsed formats');

// Corporate entity details
export const CorporationSchema = z.object({
  businessName: z.string().describe('Official registered name of the corporation'),
  address: AddressHolderSchema.describe('Primary address of the corporation'),
  filingAddress: AddressHolderSchema.describe('Registered filing address for official documents'),
  status: z.string().describe('Current operational status of the corporation'),
  registrationType: z.string().describe('Type of registration, e.g., LLC, INC'),
  incorporationState: z.string().describe('State or province where the corporation is incorporated'),
  businessState: z.string().describe('State or province where the corporation currently operates'),
  businessContacts: z.array(BusinessContactSchema).describe('List of corporate contact persons'),
}).describe('Details of a registered corporation');

// Business entity details
export const BusinessSchema = z.object({
  businessNames: z.array(z.string().describe('Alternative or DBA names for the business')).describe('List of business names'),
  addresses: z.array(AddressHolderSchema).describe('Addresses associated with this business'),
  domains: z.array(z.string().describe('Domain names or URLs for the business')).describe('List of website domains'),
  industry: z.string().describe('Industry sector classification'),
  numberOfEmployees: z.string().describe('Reported number of employees'),
  businessContacts: z.array(BusinessContactSchema).describe('Contacts for the business entity'),
}).describe('Details of a business entity');

// Single affiliated business record combining corporations and businesses
export const AffiliatedBusinessRecordSchema = z.object({
  corporations: z.array(CorporationSchema).describe('Associated corporate entities'),
  businesses: z.array(BusinessSchema).describe('Associated business entities'),
  disclosureStatus: z.string().describe('Indicates whether this record must be disclosed'),
}).describe('Affiliated business record');

// Top-level response for affiliated business results
export const AffiliatedBusinessResultDataSchema = z.object({
  targetId: z.string().describe('Unique identifier for the search target'),
  searchStates: z.array(z.string().describe('State codes where the search was performed')).optional().describe('Search states'),
  threeYearSearchStates: z.array(z.string().describe('States searched within the three-year lookback window')).optional().describe('Three-year search window states'),
  errors: z.array(ErrorSchema).optional().describe('Errors encountered during the search'),
  affiliatedBusinessRecords: z.array(AffiliatedBusinessRecordSchema).optional().describe('List of affiliated business records'),
  searchStatesInThreshold: z.array(z.string().describe('States where the search is within threshold parameters')).optional().describe('Search states in threshold'),
}).describe('Result data for an affiliated business search');

export type AffiliatedBusinessResultItem = z.infer<typeof AffiliatedBusinessResultDataSchema>;
