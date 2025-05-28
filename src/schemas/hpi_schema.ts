import { z } from 'genkit';

// ─── Input ─────────────────────────────────────────────────────────────────────
export const InputSchema = z.object({
  addressLine1: z
    .string()
    .nonempty()
    .describe(
      "Primary street address of the property (e.g., house number and street name)"
    ),
  addressLine2: z
    .string()
    .optional()
    .describe("Secondary address info (e.g., apartment or suite number)"),
  city: z.string().describe("City where the property is located"),
  state: z.string().describe("State or region of the property (e.g., two-letter code)"),
  postalCode: z.string().describe("Postal or ZIP code of the property"),
}).describe("Input address information for the HPI query");

// ─── CoreBasedStatisticalArea ─────────────────────────────────────────────────
export const CoreBasedStatisticalAreaSchema = z
  .object({
    code: z.string().describe("CBSA code identifying the metro/micro area"),
    zipCode: z.string().describe("ZIP code covered by this CBSA"),
    name: z.string().describe("Full name of the CBSA (e.g., Denver-Aurora-Lakewood)"),
  })
  .describe("One Core Based Statistical Area entry");

// ─── CoreBasedStatisticalAreaDivision ─────────────────────────────────────────
export const CoreBasedStatisticalAreaDivisionSchema = z
  .object({
    code: z.string().describe("Division code within a CBSA"),
    cbsaCode: z.string().describe("Parent CBSA code for this division"),
    zipCode: z.string().describe("ZIP code covered by this CBSA division"),
    name: z.string().describe("Name of the CBSA division"),
  })
  .describe("One Core Based Statistical Area Division entry");

// ─── HPIValuation ──────────────────────────────────────────────────────────────
export const HPIValuationSchema = z
  .object({
    originalValue: z
      .string()
      .describe("Original valuation figure as a string (e.g., assessed or sale price)"),
    estimatedValue: z
      .string()
      .describe("LLM-friendly estimated valuation (high-precision string)"),
    year: z.string().describe("Four-digit year of the valuation"),
    quarter: z.string().describe("Quarter of the year (1–4) for this valuation"),
  })
  .describe("Valuation snapshot (assessment or sale)");

// ─── Record ────────────────────────────────────────────────────────────────────
export const RecordSchema = z
  .object({
    year: z.string().describe("Year of this historical data point"),
    quarter: z.string().describe("Quarter of the year (1–4)"),
    value: z.string().describe("HPI index value for this quarter"),
    delta: z
      .string()
      .optional()
      .describe("Quarter-over-quarter change (as a decimal), if available"),
  })
  .describe("One historical HPI record");

// ─── Message ───────────────────────────────────────────────────────────────────
export const MessageSchema = z
  .object({
    code: z.string().describe("Machine-readable status or error code"),
    description: z.string().describe("Human-readable explanation of the code"),
  })
  .describe("One status or error message");

// ─── HPIResultData ─────────────────────────────────────────────────────────────
export const HPIResultDataSchema = z
  .object({
    input: InputSchema.describe("User-provided address details"),

    coreBasedStatisticalArea: z
      .array(CoreBasedStatisticalAreaSchema)
      .optional()
      .describe("List of CBSA entries covering the address"),

    coreBasedStatisticalAreaDivision: z
      .array(CoreBasedStatisticalAreaDivisionSchema)
      .optional()
      .describe("List of CBSA division entries covering the address"),

    hpiAssessmentValuation: HPIValuationSchema.describe(
      "Assessed valuation snapshot"
    ),

    hpiSaleValuation: HPIValuationSchema.describe("Sale valuation snapshot"),

    statePriceTrend: z
      .number()
      .optional()
      .describe(
        "State-level price trend as a decimal (from a DoubleValue wrapper)"
      ),

    record: z
      .array(RecordSchema)
      .describe(
        "Historical HPI index records, most recent first; delta may be missing"
      ),

    message: z
      .array(MessageSchema)
      .describe("Any status or error messages returned by the service"),

    targetId: z
      .string()
      .describe("Unique identifier for this HPI lookup request"),
  })
  .describe("Full HPIResultData response for one address");

// Infer TypeScript type if you need it
export type HPIResultItem= z.infer<typeof HPIResultDataSchema>;
