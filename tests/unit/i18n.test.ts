import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dynamic import for locale files
vi.mock("../../src/i18n/locales/en.json", () => ({
  default: {
    app: { name: "DutyDash", tagline: "US Import Tariff Lookup" },
    validation: {
      hsCodeRequired: "HS code is required",
      hsCodeInvalid:
        "Invalid HS code format. Use digits and dots (e.g., {example})",
    },
    actions: { backToSearch: "Back to Search" },
  },
}));

vi.mock("../../src/i18n/locales/de.json", () => ({
  default: {
    app: { name: "DutyDash", tagline: "US-Import Zolltarif-Suche" },
    validation: {
      hsCodeRequired: "HS-Code ist erforderlich",
      hsCodeInvalid:
        "Ungueltiges HS-Code-Format. Verwenden Sie Ziffern und Punkte (z.B. {example})",
    },
    actions: { backToSearch: "Zurueck zur Suche" },
  },
}));

describe("i18n", () => {
  let i18n: typeof import("../../src/i18n/i18n");

  beforeEach(async () => {
    vi.resetModules();
    i18n = await import("../../src/i18n/i18n");
  });

  describe("initI18n", () => {
    it("should initialize with English by default", async () => {
      await i18n.initI18n("en");
      expect(i18n.getLocale()).toBe("en");
    });

    it("should load German locale", async () => {
      await i18n.initI18n("de");
      expect(i18n.getLocale()).toBe("de");
    });
  });

  describe("t()", () => {
    it("should translate a nested key", async () => {
      await i18n.initI18n("en");
      expect(i18n.t("app.name")).toBe("DutyDash");
    });

    it("should return key for missing translations", async () => {
      await i18n.initI18n("en");
      expect(i18n.t("nonexistent.key")).toBe("nonexistent.key");
    });

    it("should interpolate parameters", async () => {
      await i18n.initI18n("en");
      const result = i18n.t("validation.hsCodeInvalid", {
        example: "8471.30",
      });
      expect(result).toContain("8471.30");
    });

    it("should use German translations when locale is de", async () => {
      await i18n.initI18n("de");
      expect(i18n.t("app.tagline")).toBe("US-Import Zolltarif-Suche");
      expect(i18n.t("actions.backToSearch")).toBe("Zurueck zur Suche");
    });
  });
});
