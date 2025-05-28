import { z } from 'zod';

// Filters used to configure which records are included or excluded in the search results
const FiltersSchema = z.object({
  bankruptcyLookbackYears: z.string().optional().describe('Years to look back for bankruptcy records'),
  judgmentLookbackYears: z.string().optional().describe('Years to look back for judgment records'),
  lienLookbackYears: z.string().optional().describe('Years to look back for lien records'),
  judgmentNameMatchingStrategy: z.string().optional().describe('Strategy for matching names in judgment records'),
  hideReleasedJudgment: z.string().optional().describe('Whether to hide judgments that have been released'),
  hideZeroAmountJudgment: z.string().optional().describe('Whether to hide judgments with zero amount'),
  hideReleasedLiens: z.string().optional().describe('Whether to hide liens that have been released'),
  hideZeroAmountLiens: z.string().optional().describe('Whether to hide liens with zero amount'),
  excludeBankruptcies: z.string().optional().describe('Whether to exclude bankruptcy records'),
  skipNameValidation: z.string().optional().describe('Whether to skip name validation for subjects'),
  filterVerbiage: z.string().optional().describe('Human-readable summary of applied filters'),
});

// Common date representation with separate day, month, and year fields as strings
const NominalDateSchema = z.object({
  day: z.string().optional().describe('Day of month'),
  month: z.string().optional().describe('Month of year'),
  year: z.string().optional().describe('Four-digit year'),
}).describe('Date represented with separate day, month, and year fields');

// Name details for a person or business
const NameSchema = z.object({
  firstName: z.string().optional().describe('Given name'),
  middleName: z.string().optional().describe('Middle name'),
  lastName: z.string().optional().describe('Family name'),
  nameSuffix: z.string().optional().describe('Suffix (e.g., Jr., Sr.)'),
  professionalSuffix: z.string().optional().describe('Professional suffix (e.g., MD, PhD)'),
  title: z.string().optional().describe('Title or honorific'),
  businessName: z.string().optional().describe('Business or organization name'),
  unparsedName: z.string().optional().describe('Raw name string when no parsing applied'),
}).describe('Structured representation of a name');

// Standard postal address fields
const AddressSchema = z.object({
  addressLine1: z.string().optional().describe('Street address line 1'),
  city: z.string().optional().describe('City name'),
  state: z.string().optional().describe('State or province code'),
  county: z.string().optional().describe('County name'),
  postalCode: z.string().optional().describe('ZIP or postal code'),
}).describe('Postal address information');

// Entity such as an attorney or trustee with contact details
const EntitySchema = z.object({
  name: NameSchema.describe('Name of the entity'),
  phone: z.string().optional().describe('Contact phone number'),
  email: z.string().optional().describe('Contact email address'),
  address: AddressSchema.optional().describe('Mailing address'),
}).describe('Legal or corporate entity with contact information');

// Court details including location and contact
const CourtSchema = z.object({
  id: z.string().optional().describe('Court identifier'),
  name: z.string().optional().describe('Full name of the court'),
  division: z.string().optional().describe('Court division'),
  district: z.string().optional().describe('Court district'),
  phone: z.string().optional().describe('Court contact phone'),
  address: AddressSchema.optional().describe('Physical address of the court'),
}).describe('Court jurisdiction and contact details');

// Party involved in a record, either subject or plaintiff
const SubjectSchema = z.object({
  name: NameSchema.describe('Name of the person or organization'),
  ssn: z.string().optional().describe('Social Security number if available'),
  address: AddressSchema.optional().describe('Address of the subject'),
}).describe('Individual or entity subject to a legal record');

// Recording details for judgments and liens
const RecordingSchema = z.object({
  number: z.string().optional().describe('Recording document number'),
  bookNumber: z.string().optional().describe('Book number in record registry'),
  pageNumber: z.string().optional().describe('Page number in record registry'),
  date: NominalDateSchema.optional().describe('Date the document was recorded'),
}).describe('Official recording metadata');

// Bankruptcy record details
const BankruptcyRecordSchema = z.object({
  chapter: z.string().optional().describe('Chapter of bankruptcy filed (e.g., 7, 11, 13)'),
  caseNumber: z.string().optional().describe('Official court case number'),
  nphId: z.string().optional().describe('Internal unique NPH identifier'),
  assetsAvailable: z.string().optional().describe('Assets available for distribution'),
  noticeType: z.string().optional().describe('Type of notice issued'),
  attorney: EntitySchema.optional().describe('Attorney representing the debtor'),
  trustee: EntitySchema.optional().describe('Trustee assigned to the case'),
  judge: NameSchema.optional().describe('Name of the presiding judge'),
  court: CourtSchema.optional().describe('Court handling the bankruptcy'),
  subject: z.array(SubjectSchema).optional().describe('List of debtors or petitioners'),
  fileDate: NominalDateSchema.optional().describe('Date the bankruptcy was filed'),
  lastUpdateDate: NominalDateSchema.optional().describe('Most recent update to the record'),
  dismissedDate: NominalDateSchema.optional().describe('Date the case was dismissed, if applicable'),
  dischargedDate: NominalDateSchema.optional().describe('Date discharge was granted, if applicable'),
  status: z.string().optional().describe('Current status of the bankruptcy case'),
}).describe('Details of an individual bankruptcy case');

// Judgment record details
const JudgmentRecordSchema = z.object({
  reportToken: z.string().optional().describe('Unique token for retrieving the judgment report'),
  filingType: z.string().optional().describe('Type of filing (e.g., judgment, lien)'),
  courtCaseNumber: z.string().optional().describe('Court-assigned case number'),
  totalJudgmentAmount: z.string().optional().describe('Total amount of the judgment'),
  filingDate: NominalDateSchema.optional().describe('Date the judgment was filed'),
  filingLocation: z.string().optional().describe('Location where the filing occurred'),
  deedCategoryType: z.string().optional().describe('Category of deed associated with judgment'),
  damarDocumentType: z.string().optional().describe('Internal document type identifier'),
  recording: RecordingSchema.optional().describe('Recording metadata for the judgment'),
  abstractIssueDate: NominalDateSchema.optional().describe('Date the abstract was issued'),
  subject: z.array(SubjectSchema).optional().describe('Entities against whom the judgment is entered'),
  plaintiff: SubjectSchema.optional().describe('Entity that obtained the judgment'),
  court: CourtSchema.optional().describe('Court issuing the judgment'),
  lastUpdateDate: NominalDateSchema.optional().describe('Most recent update date'),
  releaseDate: NominalDateSchema.optional().describe('Date the judgment was released or satisfied'),
  status: z.string().optional().describe('Current status of the judgment'),
}).describe('Details of an individual judgment');

// Lien record details
const LienRecordSchema = z.object({
  reportToken: z.string().optional().describe('Unique token for retrieving the lien report'),
  filingType: z.string().optional().describe('Type of filing (e.g., lien, judgment)'),
  courtCaseNumber: z.string().optional().describe('Court-assigned case number'),
  lienIssuingAgency: z.string().optional().describe('Agency that issued the lien'),
  totalLienAmount: z.string().optional().describe('Total amount of the lien'),
  totalJudgmentAmount: z.string().optional().describe('Total judgment amount if lien is judgment lien'),
  filingDate: NominalDateSchema.optional().describe('Date the lien was filed'),
  filingLocation: z.string().optional().describe('Location where the filing occurred'),
  lastRefileOrLienExtensionDate: NominalDateSchema.optional().describe('Date of last refile or extension'),
  deedCategoryType: z.string().optional().describe('Category of deed associated with lien'),
  damarDocumentType: z.string().optional().describe('Internal document type identifier'),
  recording: RecordingSchema.optional().describe('Recording metadata for the lien'),
  taxLienDate: NominalDateSchema.optional().describe('Date the tax lien was created'),
  taxLienSerialLienCertificateNumber: z.string().optional().describe('Serial or certificate number for tax lien'),
  kindOfTax: z.string().optional().describe('Type of tax for the lien'),
  taxPeriodMinimum: NominalDateSchema.optional().describe('Start of the tax period'),
  taxPeriodMaximum: NominalDateSchema.optional().describe('End of the tax period'),
  subject: z.array(SubjectSchema).optional().describe('Entities against whom the lien is placed'),
  plaintiff: SubjectSchema.optional().describe('Entity that initiated the lien'),
  court: CourtSchema.optional().describe('Court where the lien is filed'),
  lastUpdateDate: NominalDateSchema.optional().describe('Most recent update date'),
  releaseDate: NominalDateSchema.optional().describe('Date the lien was released'),
  status: z.string().optional().describe('Current status of the lien'),
}).describe('Details of an individual lien');

// Container for all record types in the detailed results
const ResultsSchema = z.object({
  bankruptcyRecord: z.array(BankruptcyRecordSchema).optional().describe('List of bankruptcy case records'),
  judgmentRecord: z.array(JudgmentRecordSchema).optional().describe('List of judgment records'),
  lienRecord: z.array(LienRecordSchema).optional().describe('List of lien records'),
}).describe('Grouped legal records returned by the search');

const ErrorSchema = z.object({
  code: z.string().describe('Error code indicating issue type'),
  message: z.string().describe('Descriptive error message'),
}).describe('Error encountered during processing');

// Generic message structure for informational messages
const MessageSchema = z.object({
  code: z.string().describe('Message code indicating information type'),
  text: z.string().describe('Human-readable informational message'),
}).describe('Informational message returned by the service');

// Top-level schema combining filters, counts, results, and messages
export const DetailedBLJResultDataSchema = z.object({
  filters: FiltersSchema.describe('Filter settings applied to the search'),
  bankruptciesFound: z.number().int().optional().describe('Count of bankruptcies found'),
  judgmentsFound: z.number().int().optional().describe('Count of judgments found'),
  liensFound: z.number().int().optional().describe('Count of liens found'),
  results: ResultsSchema.optional().describe('Detailed legal records grouped by type'),
  errorCode: z.string().optional().describe('Top-level error code if any'),
  error: z.array(ErrorSchema).optional().describe('List of errors encountered'),
  message: z.array(MessageSchema).optional().describe('List of informational messages'),
  targetId: z.string().describe('Unique identifier for the search target'),
});

export type DetailedBLJResultItem = z.infer<typeof DetailedBLJResultDataSchema>;
