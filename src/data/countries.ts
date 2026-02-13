/**
 * Country data and country-specific duty surcharges for US imports.
 * Includes Section 301, IEEPA, reciprocal, and anti-dumping duties.
 */

import type { CountryInfo, CountryDuty } from "../types/index";

export const COUNTRIES: CountryInfo[] = [
  // ── Asia ──
  { code: "CN", name: "China", region: "Asia" },
  { code: "JP", name: "Japan", region: "Asia" },
  { code: "KR", name: "South Korea", region: "Asia" },
  { code: "TW", name: "Taiwan", region: "Asia" },
  { code: "VN", name: "Vietnam", region: "Asia" },
  { code: "TH", name: "Thailand", region: "Asia" },
  { code: "IN", name: "India", region: "Asia" },
  { code: "BD", name: "Bangladesh", region: "Asia" },
  { code: "ID", name: "Indonesia", region: "Asia" },
  { code: "MY", name: "Malaysia", region: "Asia" },
  // ── Americas ──
  { code: "CA", name: "Canada", region: "Americas" },
  { code: "MX", name: "Mexico", region: "Americas" },
  { code: "BR", name: "Brazil", region: "Americas" },
  { code: "CO", name: "Colombia", region: "Americas" },
  { code: "CL", name: "Chile", region: "Americas" },
  // ── Europe ──
  { code: "DE", name: "Germany", region: "Europe" },
  { code: "IT", name: "Italy", region: "Europe" },
  { code: "FR", name: "France", region: "Europe" },
  { code: "GB", name: "United Kingdom", region: "Europe" },
  { code: "IE", name: "Ireland", region: "Europe" },
  // ── Other ──
  { code: "AU", name: "Australia", region: "Oceania" },
  { code: "IL", name: "Israel", region: "Middle East" },
];

/**
 * Country-specific additional duties.
 * Each entry specifies which HS code prefixes it applies to.
 * Empty hsCodePatterns = applies to ALL HS codes from that country.
 */
export const COUNTRY_DUTIES: CountryDuty[] = [
  // ── China: Section 301 ──
  // List 1 (July 2018): 25% on $34B — machinery, electronics (ch. 84, 85, 90)
  {
    countryCode: "CN",
    hsCodePatterns: ["84", "85", "90"],
    duties: [
      {
        type: "section301",
        rate: 0.25,
        description: "Section 301 List 1 — Industrial machinery & electronics",
        authority: "USTR",
        effectiveDate: "2018-07-06",
      },
    ],
  },
  // List 3 (Sept 2018/May 2019): 25% on $200B — broad range (ch. 39, 42, 44, 73, 76, 94, 95, 96)
  {
    countryCode: "CN",
    hsCodePatterns: ["39", "42", "44", "73", "76", "94", "95", "96"],
    duties: [
      {
        type: "section301",
        rate: 0.25,
        description: "Section 301 List 3 — Broad manufactured goods",
        authority: "USTR",
        effectiveDate: "2019-05-10",
      },
    ],
  },
  // List 4A (Sept 2019): 7.5% on remaining goods (ch. 61, 62, 63, 64, 71)
  {
    countryCode: "CN",
    hsCodePatterns: ["61", "62", "63", "64", "71"],
    duties: [
      {
        type: "section301",
        rate: 0.075,
        description: "Section 301 List 4A — Consumer goods",
        authority: "USTR",
        effectiveDate: "2020-02-14",
      },
    ],
  },
  // ── China: IEEPA Emergency Tariff (2025) ──
  {
    countryCode: "CN",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.20,
        description: "IEEPA Emergency Tariff — Fentanyl-related executive action",
        authority: "Executive Order",
        effectiveDate: "2025-04-02",
      },
    ],
  },
  // ── EU: Reciprocal tariffs on selected products ──
  {
    countryCode: "DE",
    hsCodePatterns: ["87", "22"],
    duties: [
      {
        type: "reciprocal",
        rate: 0.20,
        description: "Reciprocal tariff — EU automobiles & beverages",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  {
    countryCode: "FR",
    hsCodePatterns: ["22"],
    duties: [
      {
        type: "reciprocal",
        rate: 0.20,
        description: "Reciprocal tariff — EU beverages (wine)",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  {
    countryCode: "IT",
    hsCodePatterns: ["87", "22"],
    duties: [
      {
        type: "reciprocal",
        rate: 0.20,
        description: "Reciprocal tariff — EU automobiles & beverages",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Vietnam: IEEPA tariff ──
  {
    countryCode: "VN",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.46,
        description: "IEEPA Reciprocal tariff — Vietnam",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── India: IEEPA tariff ──
  {
    countryCode: "IN",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.26,
        description: "IEEPA Reciprocal tariff — India",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Thailand: IEEPA tariff ──
  {
    countryCode: "TH",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.36,
        description: "IEEPA Reciprocal tariff — Thailand",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Bangladesh: IEEPA tariff ──
  {
    countryCode: "BD",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.37,
        description: "IEEPA Reciprocal tariff — Bangladesh",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Indonesia: IEEPA tariff ──
  {
    countryCode: "ID",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.32,
        description: "IEEPA Reciprocal tariff — Indonesia",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Taiwan: IEEPA tariff ──
  {
    countryCode: "TW",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.32,
        description: "IEEPA Reciprocal tariff — Taiwan",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── South Korea: IEEPA tariff ──
  {
    countryCode: "KR",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.25,
        description: "IEEPA Reciprocal tariff — South Korea",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Japan: IEEPA tariff ──
  {
    countryCode: "JP",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.24,
        description: "IEEPA Reciprocal tariff — Japan",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
  // ── Malaysia: IEEPA tariff ──
  {
    countryCode: "MY",
    hsCodePatterns: [],
    duties: [
      {
        type: "ieepa",
        rate: 0.24,
        description: "IEEPA Reciprocal tariff — Malaysia",
        authority: "Executive Order",
        effectiveDate: "2025-04-09",
      },
    ],
  },
];

/**
 * Metadata about the tariff dataset.
 */
export const DATA_LAST_UPDATED = "2025-04-15";
