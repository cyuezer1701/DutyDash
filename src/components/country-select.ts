/**
 * Country Select Component
 * Dropdown for selecting an origin country, grouped by region.
 */

import { BaseComponent } from "./base-component";
import { COUNTRIES } from "../data/countries";

export class CountrySelect extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["value", "placeholder"];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  render(): void {
    const value = this.getAttribute("value") || "";
    const placeholder =
      this.getAttribute("placeholder") || "Select origin country...";

    // Group countries by region
    const regions = new Map<string, typeof COUNTRIES>();
    for (const c of COUNTRIES) {
      const list = regions.get(c.region) || [];
      list.push(c);
      regions.set(c.region, list);
    }

    let optionsHtml = `<option value="" ${!value ? "selected" : ""}>${placeholder}</option>`;
    for (const [region, countries] of regions) {
      optionsHtml += `<optgroup label="${region}">`;
      for (const c of countries) {
        const selected = c.code === value ? "selected" : "";
        optionsHtml += `<option value="${c.code}" ${selected}>${c.name} (${c.code})</option>`;
      }
      optionsHtml += "</optgroup>";
    }

    this.html(`
      ${this.baseStyles()}
      <style>
        :host {
          display: block;
        }
        select {
          width: 100%;
          padding: 12px 16px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 15px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          color: #f8fafc;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
        }
        select:hover {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.12);
        }
        select:focus {
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.12);
        }
        option, optgroup {
          background: #1e293b;
          color: #f8fafc;
        }
      </style>
      <select aria-label="Origin country">${optionsHtml}</select>
    `);

    const selectEl = this.shadow.querySelector("select");
    selectEl?.addEventListener("change", () => {
      const code = selectEl.value;
      const country = COUNTRIES.find((c) => c.code === code);
      this.emit("country-change", {
        code,
        name: country?.name || "",
      });
    });
  }

  get value(): string {
    const select = this.shadow.querySelector(
      "select",
    ) as HTMLSelectElement | null;
    return select?.value || "";
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }
}
