/**
 * Pure tariff business logic.
 * No side effects, no DOM, no Firebase dependencies.
 */

import { HS_CODE_PATTERN, RATE_THRESHOLDS } from "../constants/app-constants";
import type {
  TariffEntry,
  TariffResult,
  CountryInfo,
  CountryDuty,
  DutyRate,
  RateSeverity,
  ValidationResult,
} from "../types/index";

/**
 * Validates an HS code format.
 * Valid: "8471", "8471.30", "8471.30.01"
 */
export function validateHsCode(code: string): ValidationResult {
  if (!code || !code.trim()) {
    return { valid: false, message: "HS code is required" };
  }
  const trimmed = code.trim();
  if (!HS_CODE_PATTERN.test(trimmed)) {
    return {
      valid: false,
      message:
        "Invalid HS code format. Use digits and dots (e.g., 8471.30)",
    };
  }
  return { valid: true, message: "" };
}

/**
 * Normalizes an HS code by trimming whitespace and removing extra spaces.
 */
export function normalizeHsCode(input: string): string {
  return input.replace(/\s+/g, "").trim();
}

/**
 * Searches tariff entries by HS code prefix or description keyword.
 * Case-insensitive. Returns up to `limit` results.
 */
export function searchTariffEntries(
  query: string,
  entries: TariffEntry[],
  limit: number = 20,
): TariffEntry[] {
  if (!query || !query.trim()) return [];

  const q = query.trim().toLowerCase();
  const isHsQuery = /^\d/.test(q);

  const matches = entries.filter((entry) => {
    if (isHsQuery) {
      // Match HS code prefix (e.g., "84" matches "8471.30")
      const normalizedHs = entry.hsCode.replace(/\./g, "");
      const normalizedQuery = q.replace(/\./g, "");
      return normalizedHs.startsWith(normalizedQuery);
    }
    // Match description keywords
    return entry.description.toLowerCase().includes(q);
  });

  return matches.slice(0, limit);
}

/**
 * Finds a tariff entry by exact HS code match.
 * Also matches if the query is a prefix of the stored HS code.
 */
export function findTariffEntry(
  hsCode: string,
  entries: TariffEntry[],
): TariffEntry | null {
  const normalized = normalizeHsCode(hsCode);
  return (
    entries.find((e) => normalizeHsCode(e.hsCode) === normalized) ??
    entries.find((e) => normalizeHsCode(e.hsCode).startsWith(normalized)) ??
    null
  );
}

/**
 * Gets all applicable additional duties for an HS code from a specific country.
 * Filters by HS code chapter/prefix patterns.
 */
export function getApplicableDuties(
  hsCode: string,
  countryCode: string,
  countryDuties: CountryDuty[],
): DutyRate[] {
  const chapter = hsCode.slice(0, 2);
  const duties: DutyRate[] = [];

  for (const cd of countryDuties) {
    if (cd.countryCode !== countryCode) continue;

    // Empty patterns = applies to all HS codes
    const applies =
      cd.hsCodePatterns.length === 0 ||
      cd.hsCodePatterns.some(
        (pattern) => chapter.startsWith(pattern) || hsCode.startsWith(pattern),
      );

    if (applies) {
      duties.push(...cd.duties);
    }
  }

  return duties;
}

/**
 * Calculates the total effective tariff rate.
 * effectiveRate = mfnRate + sum(additionalDuty rates)
 */
export function calculateEffectiveRate(
  mfnRate: number,
  additionalDuties: DutyRate[],
): number {
  const additionalTotal = additionalDuties.reduce((sum, d) => sum + d.rate, 0);
  return mfnRate + additionalTotal;
}

/**
 * Builds a complete TariffResult from an entry, country, and duty data.
 */
export function buildTariffResult(
  entry: TariffEntry,
  country: CountryInfo,
  countryDuties: CountryDuty[],
  lastUpdated: string,
): TariffResult {
  const additionalDuties = getApplicableDuties(
    entry.hsCode,
    country.code,
    countryDuties,
  );
  const effectiveRate = calculateEffectiveRate(entry.mfnRate, additionalDuties);

  return {
    entry,
    country,
    mfnRate: entry.mfnRate,
    additionalDuties,
    effectiveRate,
    lastUpdated,
  };
}

/**
 * Determines rate severity for color coding.
 * low: 0–5%, moderate: 5–15%, high: 15–30%, extreme: >30%
 */
export function getRateSeverity(rate: number): RateSeverity {
  if (rate <= RATE_THRESHOLDS.LOW_MAX) return "low";
  if (rate <= RATE_THRESHOLDS.MODERATE_MAX) return "moderate";
  if (rate <= RATE_THRESHOLDS.HIGH_MAX) return "high";
  return "extreme";
}

/**
 * Formats a decimal rate as a percentage string.
 * e.g., 0.25 → "25.0%", 0 → "0.0%", 0.075 → "7.5%"
 */
export function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}
