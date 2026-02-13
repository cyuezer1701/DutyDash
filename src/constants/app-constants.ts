/* ==================== APP CONSTANTS ==================== */

export const APP_NAME = "DutyDash" as const;
export const APP_VERSION = "0.1.0" as const;

/**
 * HS code validation pattern: 4-digit chapter, optional 2-digit subheading, optional 2-4 digit suffix
 * Valid examples: "8471", "8471.30", "8471.30.01", "6110.20.2080"
 */
export const HS_CODE_PATTERN = /^\d{4}(\.\d{2}(\.\d{2,4})?)?$/;

/**
 * Rate severity thresholds (as decimals).
 * Used for color coding tariff rates.
 */
export const RATE_THRESHOLDS = {
  LOW_MAX: 0.05,
  MODERATE_MAX: 0.15,
  HIGH_MAX: 0.30,
} as const;

/**
 * UI constants
 */
export const UI = {
  SEARCH_DEBOUNCE_MS: 300,
  SEARCH_RESULTS_LIMIT: 20,
  NOTIFICATION_DURATION_MS: 3000,
} as const;
