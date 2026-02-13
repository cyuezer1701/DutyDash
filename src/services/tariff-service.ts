/**
 * Tariff data service.
 * Wraps static data access with a clean interface that can be
 * swapped for an API-backed implementation later.
 */

import { TARIFF_ENTRIES } from "../data/tariff-data";
import { COUNTRIES, COUNTRY_DUTIES, DATA_LAST_UPDATED } from "../data/countries";
import {
  searchTariffEntries,
  findTariffEntry,
  buildTariffResult,
} from "../core/tariff-logic";
import type {
  TariffEntry,
  TariffResult,
  CountryInfo,
  CountryCode,
  HsCode,
} from "../types/index";

/**
 * Searches tariff entries matching the query.
 */
export function searchTariffs(query: string): TariffEntry[] {
  return searchTariffEntries(query, TARIFF_ENTRIES);
}

/**
 * Looks up the full tariff result for an HS code + country combination.
 * Returns null if the HS code is not found.
 */
export function lookupTariff(
  hsCode: HsCode,
  countryCode: CountryCode,
): TariffResult | null {
  const entry = findTariffEntry(hsCode, TARIFF_ENTRIES);
  if (!entry) return null;

  const country = getCountry(countryCode);
  if (!country) return null;

  return buildTariffResult(entry, country, COUNTRY_DUTIES, DATA_LAST_UPDATED);
}

/**
 * Returns the list of available countries.
 */
export function getCountries(): CountryInfo[] {
  return COUNTRIES;
}

/**
 * Returns a single country by its code.
 */
export function getCountry(code: CountryCode): CountryInfo | undefined {
  return COUNTRIES.find((c) => c.code === code);
}
