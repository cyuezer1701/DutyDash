import { describe, it, expect } from "vitest";
import {
  validateHsCode,
  normalizeHsCode,
  searchTariffEntries,
  findTariffEntry,
  getApplicableDuties,
  calculateEffectiveRate,
  buildTariffResult,
  getRateSeverity,
  formatRate,
} from "../../src/core/tariff-logic";
import {
  createTariffEntry,
  createDutyRate,
  createCountryInfo,
  createCountryDuty,
} from "../helpers/tariff-factory";

describe("validateHsCode", () => {
  it("accepts valid 4-digit code", () => {
    const result = validateHsCode("8471");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("accepts valid 6-digit code with dot", () => {
    const result = validateHsCode("8471.30");
    expect(result.valid).toBe(true);
  });

  it("accepts valid 8-digit code with dots", () => {
    const result = validateHsCode("8471.30.01");
    expect(result.valid).toBe(true);
  });

  it("accepts valid 10-digit code with dots", () => {
    const result = validateHsCode("6110.20.2080");
    expect(result.valid).toBe(true);
  });

  it("rejects empty string", () => {
    const result = validateHsCode("");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("required");
  });

  it("rejects whitespace-only string", () => {
    const result = validateHsCode("   ");
    expect(result.valid).toBe(false);
  });

  it("rejects alphabetic characters", () => {
    const result = validateHsCode("ABCD");
    expect(result.valid).toBe(false);
    expect(result.message).toContain("Invalid");
  });

  it("rejects code with wrong dot placement", () => {
    const result = validateHsCode("84.7130");
    expect(result.valid).toBe(false);
  });

  it("rejects code that is too short", () => {
    const result = validateHsCode("847");
    expect(result.valid).toBe(false);
  });
});

describe("normalizeHsCode", () => {
  it("removes spaces", () => {
    expect(normalizeHsCode("8471 .30")).toBe("8471.30");
  });

  it("trims leading/trailing whitespace", () => {
    expect(normalizeHsCode("  8471.30  ")).toBe("8471.30");
  });

  it("handles already-formatted codes", () => {
    expect(normalizeHsCode("8471.30")).toBe("8471.30");
  });
});

describe("searchTariffEntries", () => {
  const entries = [
    createTariffEntry({ hsCode: "8471.30", description: "Laptops", chapter: 84 }),
    createTariffEntry({ hsCode: "8517.13", description: "Smartphones", chapter: 85 }),
    createTariffEntry({ hsCode: "6110.20", description: "Cotton sweaters", chapter: 61 }),
    createTariffEntry({ hsCode: "8471.49", description: "Desktop computers", chapter: 84 }),
  ];

  it("finds entries by exact HS code", () => {
    const results = searchTariffEntries("8471.30", entries);
    expect(results).toHaveLength(1);
    expect(results[0].description).toBe("Laptops");
  });

  it("finds entries by HS code prefix", () => {
    const results = searchTariffEntries("8471", entries);
    expect(results).toHaveLength(2);
  });

  it("finds entries by chapter prefix", () => {
    const results = searchTariffEntries("84", entries);
    expect(results).toHaveLength(2);
  });

  it("finds entries by description keyword", () => {
    const results = searchTariffEntries("sweaters", entries);
    expect(results).toHaveLength(1);
    expect(results[0].hsCode).toBe("6110.20");
  });

  it("is case-insensitive for description search", () => {
    const results = searchTariffEntries("LAPTOPS", entries);
    expect(results).toHaveLength(1);
  });

  it("returns empty array for no matches", () => {
    const results = searchTariffEntries("nonexistent", entries);
    expect(results).toHaveLength(0);
  });

  it("returns empty array for empty query", () => {
    const results = searchTariffEntries("", entries);
    expect(results).toHaveLength(0);
  });

  it("respects limit parameter", () => {
    const results = searchTariffEntries("8", entries, 2);
    expect(results).toHaveLength(2);
  });
});

describe("findTariffEntry", () => {
  const entries = [
    createTariffEntry({ hsCode: "8471.30" }),
    createTariffEntry({ hsCode: "8517.13" }),
  ];

  it("finds entry by exact HS code", () => {
    const result = findTariffEntry("8471.30", entries);
    expect(result).not.toBeNull();
    expect(result!.hsCode).toBe("8471.30");
  });

  it("finds entry by prefix match", () => {
    const result = findTariffEntry("8471", entries);
    expect(result).not.toBeNull();
    expect(result!.hsCode).toBe("8471.30");
  });

  it("returns null when not found", () => {
    const result = findTariffEntry("9999.99", entries);
    expect(result).toBeNull();
  });
});

describe("getApplicableDuties", () => {
  const countryDuties = [
    createCountryDuty({
      countryCode: "CN",
      hsCodePatterns: ["84", "85"],
      duties: [createDutyRate({ type: "section301", rate: 0.25 })],
    }),
    createCountryDuty({
      countryCode: "CN",
      hsCodePatterns: [],
      duties: [createDutyRate({ type: "ieepa", rate: 0.20 })],
    }),
    createCountryDuty({
      countryCode: "DE",
      hsCodePatterns: ["87"],
      duties: [createDutyRate({ type: "reciprocal", rate: 0.20 })],
    }),
  ];

  it("returns duties matching country and chapter", () => {
    const duties = getApplicableDuties("8471.30", "CN", countryDuties);
    expect(duties.length).toBeGreaterThanOrEqual(2);
    expect(duties.some((d) => d.type === "section301")).toBe(true);
    expect(duties.some((d) => d.type === "ieepa")).toBe(true);
  });

  it("returns empty-pattern duties for any HS code", () => {
    const duties = getApplicableDuties("6110.20", "CN", countryDuties);
    expect(duties.some((d) => d.type === "ieepa")).toBe(true);
  });

  it("returns empty array for country with no surcharges", () => {
    const duties = getApplicableDuties("8471.30", "JP", countryDuties);
    expect(duties).toHaveLength(0);
  });

  it("filters by chapter correctly", () => {
    const duties = getApplicableDuties("8703.23", "DE", countryDuties);
    expect(duties.some((d) => d.type === "reciprocal")).toBe(true);
  });

  it("does not apply unrelated chapter duties", () => {
    const duties = getApplicableDuties("6110.20", "DE", countryDuties);
    const reciprocal = duties.filter((d) => d.type === "reciprocal");
    expect(reciprocal).toHaveLength(0);
  });
});

describe("calculateEffectiveRate", () => {
  it("returns MFN rate when no additional duties", () => {
    expect(calculateEffectiveRate(0.05, [])).toBe(0.05);
  });

  it("sums MFN and single additional duty", () => {
    const duties = [createDutyRate({ rate: 0.25 })];
    expect(calculateEffectiveRate(0.05, duties)).toBeCloseTo(0.30);
  });

  it("sums MFN and multiple additional duties", () => {
    const duties = [
      createDutyRate({ rate: 0.25 }),
      createDutyRate({ rate: 0.20 }),
    ];
    expect(calculateEffectiveRate(0.05, duties)).toBeCloseTo(0.50);
  });

  it("handles zero MFN rate", () => {
    const duties = [createDutyRate({ rate: 0.25 })];
    expect(calculateEffectiveRate(0, duties)).toBeCloseTo(0.25);
  });
});

describe("buildTariffResult", () => {
  it("assembles a complete tariff result", () => {
    const entry = createTariffEntry({ hsCode: "8471.30", mfnRate: 0 });
    const country = createCountryInfo({ code: "CN" });
    const countryDuties = [
      createCountryDuty({
        countryCode: "CN",
        hsCodePatterns: ["84"],
        duties: [createDutyRate({ rate: 0.25 })],
      }),
    ];

    const result = buildTariffResult(entry, country, countryDuties, "2025-04-15");
    expect(result.entry).toBe(entry);
    expect(result.country).toBe(country);
    expect(result.mfnRate).toBe(0);
    expect(result.additionalDuties).toHaveLength(1);
    expect(result.effectiveRate).toBeCloseTo(0.25);
    expect(result.lastUpdated).toBe("2025-04-15");
  });
});

describe("getRateSeverity", () => {
  it("returns 'low' for rates under 5%", () => {
    expect(getRateSeverity(0)).toBe("low");
    expect(getRateSeverity(0.03)).toBe("low");
    expect(getRateSeverity(0.05)).toBe("low");
  });

  it("returns 'moderate' for rates 5-15%", () => {
    expect(getRateSeverity(0.06)).toBe("moderate");
    expect(getRateSeverity(0.10)).toBe("moderate");
    expect(getRateSeverity(0.15)).toBe("moderate");
  });

  it("returns 'high' for rates 15-30%", () => {
    expect(getRateSeverity(0.16)).toBe("high");
    expect(getRateSeverity(0.25)).toBe("high");
    expect(getRateSeverity(0.30)).toBe("high");
  });

  it("returns 'extreme' for rates over 30%", () => {
    expect(getRateSeverity(0.31)).toBe("extreme");
    expect(getRateSeverity(0.50)).toBe("extreme");
    expect(getRateSeverity(1.0)).toBe("extreme");
  });
});

describe("formatRate", () => {
  it("formats 0.25 as '25.0%'", () => {
    expect(formatRate(0.25)).toBe("25.0%");
  });

  it("formats 0 as '0.0%'", () => {
    expect(formatRate(0)).toBe("0.0%");
  });

  it("formats 0.075 as '7.5%'", () => {
    expect(formatRate(0.075)).toBe("7.5%");
  });

  it("formats 1.0 as '100.0%'", () => {
    expect(formatRate(1.0)).toBe("100.0%");
  });
});
