import { describe, it, expect, beforeAll } from "vitest";
import { registerComponents } from "../../src/components";

describe("Web Components", () => {
  beforeAll(() => {
    registerComponents();
  });

  describe("registerComponents", () => {
    it("should register app-button", () => {
      expect(customElements.get("app-button")).toBeDefined();
    });

    it("should register app-card", () => {
      expect(customElements.get("app-card")).toBeDefined();
    });

    it("should register app-modal", () => {
      expect(customElements.get("app-modal")).toBeDefined();
    });

    it("should register app-notification", () => {
      expect(customElements.get("app-notification")).toBeDefined();
    });

    it("should register app-input", () => {
      expect(customElements.get("app-input")).toBeDefined();
    });

    it("should register app-empty-state", () => {
      expect(customElements.get("app-empty-state")).toBeDefined();
    });

    it("should register rate-badge", () => {
      expect(customElements.get("rate-badge")).toBeDefined();
    });

    it("should register country-select", () => {
      expect(customElements.get("country-select")).toBeDefined();
    });

    it("should register tariff-search-bar", () => {
      expect(customElements.get("tariff-search-bar")).toBeDefined();
    });

    it("should register duty-breakdown", () => {
      expect(customElements.get("duty-breakdown")).toBeDefined();
    });

    it("should register tariff-result-card", () => {
      expect(customElements.get("tariff-result-card")).toBeDefined();
    });

    it("should register disclaimer-banner", () => {
      expect(customElements.get("disclaimer-banner")).toBeDefined();
    });

    it("should register nav-bar", () => {
      expect(customElements.get("nav-bar")).toBeDefined();
    });
  });

  describe("RateBadge", () => {
    it("should create an element with shadow DOM", () => {
      const el = document.createElement("rate-badge");
      el.setAttribute("rate", "0.25");
      document.body.appendChild(el);
      expect(el.shadowRoot).toBeDefined();
      document.body.removeChild(el);
    });
  });

  describe("NavBar", () => {
    it("should create an element with shadow DOM", () => {
      const el = document.createElement("nav-bar");
      el.setAttribute("active", "search");
      document.body.appendChild(el);
      expect(el.shadowRoot).toBeDefined();
      document.body.removeChild(el);
    });
  });

  describe("AppButton", () => {
    it("should create an element", () => {
      const el = document.createElement("app-button");
      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });
  });

  describe("AppCard", () => {
    it("should create an element", () => {
      const el = document.createElement("app-card");
      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });
  });
});
