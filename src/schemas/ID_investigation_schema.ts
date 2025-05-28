import { z } from "genkit";

/* ═════════════════  Leaf Types  ═════════════════ */

const MessagesSchema = z
  .object({
    message: z
      .array(z.string())
      .describe(
        "List of text strings explaining WHY the parent check or result is Pass/Failed/etc. " +
          'Examples: "Date Of Birth could not be verified", "Single Unit", "Residence".'
      )
  })
  .describe("Container for explanatory messages returned by rule engine");

const ResultItemSchema: z.ZodType = z.lazy(() =>
  z
    .object({
      input: z
        .string()
        .optional()
        .describe("Exact value supplied by the client for this attribute"),
      result: z
        .string()
        .describe(
          'Verification outcome: "Pass", "Failed", "Discrepancy", or other literal'
        ),
      messages: MessagesSchema.optional(),
      dateSeen: z
        .string()
        .optional()
        .describe("Most recent sighting date of this attribute (free-form)"),
      alternate: z.lazy(() => ResultItemSchema).optional()
    })
    .describe("Match result for one attribute (name, SSN, phone, etc.)")
);

const KeyDriverSchema = z
  .object({
    rank: z
      .number()
      .int()
      .describe("1-based importance order; 1 = most influential"),
    description: z
      .string()
      .describe("Short human sentence describing the driver (negative or positive)")
  })
  .describe("Factor that influenced the overall validation score");

const CheckSchema = z
  .object({
    result: z
      .string()
      .optional()
      .describe('High-level outcome such as "Pass", "Failed", "Review"'),
    messages: MessagesSchema.optional()
  })
  .describe("Single compliance / fraud rule evaluation");

const StandardizedAddressSchema = z
  .object({
    street: z
      .string()
      .describe("USPS-formatted street line (uppercase, abbreviated)"),
    city: z.string().describe("City in uppercase"),
    state: z.string().describe("Two-letter state code"),
    zip: z
      .string()
      .describe(
        "ZIP+4 without dash (9 digits); finer geolocation than 5-digit ZIP"
      )
  })
  .describe("Canonical address returned by USPS standardization");

const VelocityItemSchema = z
  .object({
    numberOfTimesSeen: z
      .number()
      .int()
      .optional()
      .describe("Count of historical occurrences of this value"),
    dateSeen: z
      .array(z.string())
      .optional()
      .describe("ISO-8601 timestamps when the value was observed")
  })
  .describe("Historical frequency data for one identifier");

/* ════════════════  Composite Sections  ════════════════ */

const InputDataSchema = z
  .object({
    name: z.string().describe("Full name, may include middle names"),
    addressLine1: z.string().describe("First address line"),
    addressLine2: z.string().optional().describe("Second address line"),
    city: z.string().describe("City as entered by requester"),
    state: z.string().describe("Full state name or abbreviation"),
    zip: z.string().describe("5-digit ZIP"),
    ssn: z
      .string()
      .describe('US Social Security Number in "AAA-GG-SSSS" format'),
    dateOfBirth: z
      .string()
      .describe("Date of birth (MM/DD/YYYY or ISO-8601)"),
    phone: z
      .string()
      .describe(
        'One or more phone numbers, free-form (e.g. "(212) 555-4444(home) ...")'
      )
  })
  .describe("Raw PII exactly as supplied by caller");

const ScoreSchema = z
  .object({
    validationScore: z
      .string()
      .describe(
        'Overall risk score "1"–"5" (string); lower = higher confidence'
      ),
    keyDriver: z.array(KeyDriverSchema).describe("Ranked list of key drivers")
  })
  .describe("Aggregate score plus its explanations");

const ResultsSchema = z
  .object({
    firstName: ResultItemSchema,
    lastName: ResultItemSchema,
    address: ResultItemSchema,
    phone: ResultItemSchema,
    ssn: ResultItemSchema,
    dob: ResultItemSchema,
    zip: ResultItemSchema
  })
  .describe("Attribute-level verification results");

const ChecksSchema = z
  .object({
    notOnOFACList: CheckSchema.optional(),
    notOnSuspectAddressList: CheckSchema.optional(),
    notOnSSADeathMasterFile: CheckSchema.optional(),
    validUSPSAddress: CheckSchema.optional(),
    dwellingType: CheckSchema.optional(),
    residentialOrBusiness: CheckSchema.optional(),
    landUse: CheckSchema.optional(),
    householdIncomeEstimate: CheckSchema.optional(),
    numberOfChildren: CheckSchema.optional()
  })
  .describe("Auxiliary compliance and enrichment checks");

const VelocityInformationSchema = z
  .object({
    address: VelocityItemSchema.optional(),
    phone: VelocityItemSchema.optional()
  })
  .describe("Frequency-of-use signals for address and phone");

/* ═════════════════  Root Schema  ═════════════════ */

export const IDInvestigationResultDataSchema = z
  .object({
    targetId: z
      .string()
      .describe("Unique reference ID for this investigation"),
    inputData: InputDataSchema,
    score: ScoreSchema,
    results: ResultsSchema,
    checks: ChecksSchema.optional(),
    standardizedAddress: StandardizedAddressSchema.optional(),
    velocityInformation: VelocityInformationSchema.optional()
  })
  .describe("Full response payload for IDInvestigationResultData");

export type IDInvestigationResultItem = z.infer<typeof IDInvestigationResultDataSchema>;
  