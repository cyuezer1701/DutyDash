/**
 * Core type definitions for DutyDash — US Import Tariff Lookup.
 */

/* ==================== TARIFF TYPES ==================== */

/** Harmonized System code (e.g., "8471.30", "6110.20.20") */
export type HsCode = string;

/** ISO 3166-1 alpha-2 country code (e.g., "CN", "DE", "MX") */
export type CountryCode = string;

/** Types of additional duties that can apply */
export type DutyType =
  | "mfn"
  | "section301"
  | "ieepa"
  | "reciprocal"
  | "antidumping"
  | "countervailing";

/** A single duty rate component */
export interface DutyRate {
  type: DutyType;
  /** Percentage as decimal (0.25 = 25%) */
  rate: number;
  description: string;
  authority: string;
  /** ISO date string */
  effectiveDate: string;
}

/** A tariff entry for a specific HS code */
export interface TariffEntry {
  hsCode: HsCode;
  description: string;
  /** HTS chapter number (1–99) */
  chapter: number;
  unit: string;
  /** Base MFN rate as decimal (0.05 = 5%) */
  mfnRate: number;
}

/** Country information */
export interface CountryInfo {
  code: CountryCode;
  name: string;
  region: string;
}

/** Country-specific additional duties with HS code pattern filtering */
export interface CountryDuty {
  countryCode: CountryCode;
  /** HS code prefixes this duty applies to (e.g., ["84", "85"] for chapters 84–85). Empty = applies to all. */
  hsCodePatterns: string[];
  duties: DutyRate[];
}

/** Complete tariff lookup result */
export interface TariffResult {
  entry: TariffEntry;
  country: CountryInfo;
  mfnRate: number;
  additionalDuties: DutyRate[];
  /** Total combined rate (MFN + all additional duties) */
  effectiveRate: number;
  /** ISO date string */
  lastUpdated: string;
}

/** Severity level for tariff rate color coding */
export type RateSeverity = "low" | "moderate" | "high" | "extreme";

/* ==================== APP STATE ==================== */

export interface AppState {
  searchQuery: string;
  selectedCountry: CountryCode;
  searchResults: TariffEntry[];
  currentTariffResult: TariffResult | null;
  currentScreen: string;
  isLoading: boolean;
}

/* ==================== VALIDATION ==================== */

export interface ValidationResult {
  valid: boolean;
  message: string;
}

/* ==================== GENERAL ==================== */

export type NotificationType = "info" | "success" | "error" | "warning";
export type RenderCallback = () => void;
