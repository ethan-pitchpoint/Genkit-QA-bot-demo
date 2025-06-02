import { AffiliatedBusinessResultDataSchema } from './schemas/affiliated_business_schema.js'
import { AFFILIATED_BUSINESS_DATA } from './data/affiliated_data.js'

import { DetailedBLJResultDataSchema } from './schemas/blj_schema.js'
import { BLJ_DATA } from './data/blj_data.js'

import { EmployerIDInvestigationResultDataSchema } from './schemas/employer_investigation_schema.js'
import { EMPLOYER_DATA } from './data/employer_investigation_data.js'

import { FEMADeclaredDisastersResultDataSchema } from './schemas/fema_schema.js'
import { FEMA_DATA } from './data/fema_data.js'

import { ForeclosureInvestigationResultSchema } from './schemas/forclosure_schema.js'
import { FORCLOSURE_DATA } from './data/forclosure_data.js'

import { HPIResultDataSchema } from './schemas/hpi_schema.js'
import { HPI_DATA } from './data/hpi_data.js'

import { IDInvestigationResultDataSchema } from './schemas/ID_investigation_schema.js'
import { ID_DATA } from './data/ID_investigation_data.js'

import { MERSResultDataSchema } from './schemas/mers_schema.js'
import { MERS_DATA } from './data/mers_data.js'

import { MPLResultDataSchema } from './schemas/mpl_schema.js'
import { MPL_DATA } from './data/mpl_data.js'

import { PropertyInvestigationResultDataSchema } from './schemas/property_schema.js'
import { PROPERTY_DATA } from './data/property_data.js'

import { SSNResultDataSchema } from './schemas/ssn_schema.js'
import { SSN_DATA } from './data/ssn_data.js'

import { z } from 'genkit'

export const toolConfigs = [
  {
    name: 'getEmployerDetails',
    description: `
Provides employer-verification data for every borrower.
- Content: raw employer name / address / phone as entered by borrower, matched business-profile record (legal name, year established, revenue, employee count, key executive, website), reverse-phone lookup result, and driving distance / travel time between employer, borrower residence, and subject property.
- Use when: the user asks about employers, workplaces, or commute feasibility.`,
    schema: EmployerIDInvestigationResultDataSchema,
    data: EMPLOYER_DATA,
    item_description: 'A list of all employer verification results and their corresponding borrowers',
    category_name: 'employer'
  },

  {
    name: 'getAffiliatedBusinessDetails',
    description: `
Provides affiliated-business search results that link borrowers to corporations or DBAs they control.
- Content: full corporate filings, alternate business names, parsed + raw addresses, domains, industry, employee counts, disclosureStatus flag, states searched (including 3-year “recent” window), and any search-level errors.
- Use when: the user asks about borrower-controlled companies or RESPA disclosure obligations.`,
    schema: AffiliatedBusinessResultDataSchema,
    data: AFFILIATED_BUSINESS_DATA,
    item_description: 'Full affiliated-business result payloads (one per borrower)',
    category_name: 'affiliated business'
  },

  {
    name: 'getBLJDetails',
    description: `
Provides detailed Bankruptcy-Judgment-Lien (BLJ) history.
- Content: filter settings (look-back years, hide-released flags), record counts, and full abstracts for bankruptcies, civil judgments, and tax/mechanic liens (case numbers, chapters, courts, plaintiffs, filing + release dates, amounts, status).
- Use when: the user wants legal encumbrances or public-record risk on a borrower.`,
    schema: DetailedBLJResultDataSchema,
    data: BLJ_DATA,
    item_description: 'Complete BLJ result sets for each borrower',
    category_name: 'BLJ'
  },

  {
    name: 'getFEMADisasterDetails',
    description: `
Provides FEMA declared-disaster history verification for the borrower's geography.
- Content: disaster number, title, incident begin/end, declaration + close-out dates, disaster + incident types, program declarations (IA, PA, HM), and a convenience list of disasters declared in the last 120 days.
- Use when: the user asks about natural-disaster or catastrophe exposure.`,
    schema: FEMADeclaredDisastersResultDataSchema,
    data: FEMA_DATA,
    item_description: 'FEMA disaster lookup results',
    category_name: 'FEMA'
  },

  {
    name: 'getForeclosureDetails',
    description: `
Provides a comprehensive foreclosure investigation that merges bureau SSN validation, parcel matching, CoreLogic & Black Knight public-record history, MERS registry hits, and Freddie-Mac TFRL checks.
- Content: historical addresses, transaction holders with evaluation flags, MERS lien info, owner-name match quality, foreclosure stage flags, partnerStatus, and configuration thresholds.
- Use when: the user asks whether a borrower is in, near, or past foreclosure, or about property-ownership risk.`,
    schema: ForeclosureInvestigationResultSchema,
    data: FORCLOSURE_DATA,
    item_description: 'Foreclosure-investigation results',
    category_name: 'Forclosure'
  },

  {
    name: 'getHPIResults',
    description: `
Provides FHFA Home-Price-Index (HPI) valuations and quarterly history.
- Content: assessed valuation snapshot, modeled sale valuation, CBSA + CBSA-division context, state-level price trend, and an array of quarterly index values with delta where available.
- Use when: the user wants local market appreciation data or historical price curves.`,
    schema: HPIResultDataSchema,
    data: HPI_DATA,
    item_description: 'HPI valuation and index history',
    category_name: 'HPI'
  },

  {
    name: 'getIDVerificationDetails',
    description: `
Provides full borrower ID-verification (KYC) payloads.
- Content: sensitive personal information, supplied PII, overall validation score (1–5) + ranked key drivers, attribute-level pass/fail for name, SSN, DOB, address, phone, compliance checks (OFAC, SSA DMF, dwelling type, land-use, income estimate, children count), and velocity signals (times seen, timestamps).
- Use when: the user needs identity confidence, fraud screening, or KYC audit detail.`,
    schema: IDInvestigationResultDataSchema,
    data: ID_DATA,
    item_description: 'Detailed ID-verification result sets',
    category_name: 'Borrower ID'
  },

  {
    name: 'getMERSDetails',
    description: `
Provides MERS registry lien information tied to the borrower or property.
- Content: counts of liens by minStatusType, plus an array of lien blocks with borrower, property, servicer, investor, lien priority, loan amount, owner-occupied flag, registration/deactivation dates, and any service-level errors.
- Use when: the user asks about mortgage servicing, lien priority, or MIN history.`,
    schema: MERSResultDataSchema,
    data: MERS_DATA,
    item_description: 'MERS lien records for each borrower/property',
    category_name: 'MERS lien'
  },

  {
    name: 'getMPLScreeningDetails',
    description: `
Provides Mortgage Party List (MPL) compliance-screening results.
- Content: every loan participant (borrower, lender, broker, appraiser, etc.), confirmed watch-list hits, candidate matches, subjectType list, and watch-list metadata (OFAC, HUD LDP, FHFA SCP, etc.).
- Use when: the user needs AML / sanctioned-party checks or to explain a Compliance “clear / review” decision.`,
    schema: MPLResultDataSchema,
    data: MPL_DATA,
    item_description: 'MPL screening results',
    category_name: 'MPL screening'
  },

  {
    name: 'getPropertyInvestigationDetails',
    description: `
Provides a full property dossier for the collateral address.
- Content: parsed USPS address, legal description, tax and assessment figures, current owner(s) + mailing address, sale & refinance history, mortgage records, comparable properties with proximity metrics, a base64 area-map image, and an optional multiple-property list if the input was ambiguous.
- Use when: the user asks for valuation comps, tax details, ownership confirmation, or property characteristics.`,
    schema: PropertyInvestigationResultDataSchema,
    data: PROPERTY_DATA,
    item_description: 'Property-investigation result sets',
    category_name: 'Property investigation'
  },

  {
    name: 'getSSNDetails',
    description: `
Provides a lightweight SSN verification.
- Content: primary address, array of alternate names (aliases), and a status code (SUCCESS, NOT_FOUND, NO_RESPONSE, ERROR).
- Use when: the user simply needs to check whether an SSN resolves and which name/address it carries, without the full ID or foreclosure pull.`,
    schema: SSNResultDataSchema,
    data: SSN_DATA,
    item_description: 'SSN verification results',
    category_name: 'Borrower SSN'
  },
];


// const getEmployerDetails = ai.defineTool({
//         name: 'getEmployerDetails',
//         // description: "Gets detailed information about the employers and the verification results of each employer for each borrower. Any question related to employers, businesses, and companies should be answered using this tool.",
//         description: "Gets the employer verification data for all borrowers. Use this tool when the user asks a question relating to employers.",
//         inputSchema: z.object({}),
//         outputSchema: z.object({
//             employerData: z.array(EmployerIDInvestigationResultDataSchema)
//                 .describe('A list of all employer verification results and their corresponding borrowers.'),
//         }),
//     },
//     async () => Promise.resolve({ employerData: EMPLOYER_DATA })
//     );

//   const getIDDetails = ai.defineTool({
//     name: 'getIDDetails',
//     description: "Gets the ID verification data for all borrowers. Use this tool when the user asks a question relating to borrowers",
//     inputSchema: z.object({}),
//     outputSchema: z.object({
//       IDData: z.array(IDInvestigationResultDataSchema)
//         .describe('A list of ID verification results for all borrowers')
//     }),
//   },
//   async () => Promise.resolve({ IDData: ID_DATA })
// )