/**
 * Test data factory for tariff-related tests.
 */
import type {
  TariffEntry,
  TariffResult,
  DutyRate,
  CountryInfo,
  CountryDuty,
  AppState,
} from "../../src/types/index";
import state from "../../src/state/app-state";

let idCounter = 1;

export function createTariffEntry(
  overrides: Partial<TariffEntry> = {},
): TariffEntry {
  const id = idCounter++;
  return {
    hsCode: `8471.${String(id).padStart(2, "0")}`,
    description: `Test Product ${id}`,
    chapter: 84,
    unit: "pcs",
    mfnRate: 0.05,
    ...overrides,
  };
}

export function createDutyRate(overrides: Partial<DutyRate> = {}): DutyRate {
  return {
    type: "section301",
    rate: 0.25,
    description: "Section 301 Test Duty",
    authority: "USTR",
    effectiveDate: "2024-01-01",
    ...overrides,
  };
}

export function createCountryInfo(
  overrides: Partial<CountryInfo> = {},
): CountryInfo {
  return {
    code: "CN",
    name: "China",
    region: "Asia",
    ...overrides,
  };
}

export function createCountryDuty(
  overrides: Partial<CountryDuty> = {},
): CountryDuty {
  return {
    countryCode: "CN",
    hsCodePatterns: ["84", "85"],
    duties: [createDutyRate()],
    ...overrides,
  };
}

export function createTariffResult(
  overrides: Partial<TariffResult> = {},
): TariffResult {
  const entry = createTariffEntry();
  const country = createCountryInfo();
  return {
    entry,
    country,
    mfnRate: entry.mfnRate,
    additionalDuties: [createDutyRate()],
    effectiveRate: 0.30,
    lastUpdated: "2025-04-15",
    ...overrides,
  };
}

export function setupState(overrides: Partial<AppState> = {}): void {
  state.searchQuery = "";
  state.selectedCountry = "";
  state.searchResults = [];
  state.currentTariffResult = null;
  state.currentScreen = "search-screen";
  state.isLoading = false;
  Object.assign(state, overrides);
}

export function resetState(): void {
  state.searchQuery = "";
  state.selectedCountry = "";
  state.searchResults = [];
  state.currentTariffResult = null;
  state.currentScreen = "search-screen";
  state.isLoading = false;
}

export function resetIds(): void {
  idCounter = 1;
}
