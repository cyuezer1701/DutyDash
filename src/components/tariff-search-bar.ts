/**
 * Tariff Search Bar Component
 * Text input + country dropdown + search button.
 * Emits search-submit and search-input events.
 */

import { BaseComponent } from "./base-component";

export class TariffSearchBar extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["placeholder", "loading"];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  render(): void {
    const placeholder =
      this.getAttribute("placeholder") ||
      "Enter HS code or product description...";
    const isLoading = this.getAttribute("loading") === "true";

    this.html(`
      ${this.baseStyles()}
      <style>
        .search-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }
        .input-row {
          display: flex;
          gap: 8px;
          width: 100%;
        }
        .search-input {
          flex: 1;
          min-width: 0;
          padding: 14px 18px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 16px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          color: #f8fafc;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .search-input::placeholder {
          color: #94a3b8;
        }
        .search-input:focus {
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.12);
        }
        .search-btn {
          padding: 14px 28px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: #fff;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.1s;
        }
        .search-btn:hover:not(:disabled) {
          opacity: 0.9;
        }
        .search-btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        .search-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        country-select {
          min-width: 200px;
        }
        @media (max-width: 640px) {
          .input-row {
            flex-direction: column;
          }
          .search-btn {
            width: 100%;
          }
          country-select {
            min-width: unset;
          }
        }
      </style>
      <div class="search-container">
        <div class="input-row">
          <input
            class="search-input"
            type="text"
            placeholder="${placeholder}"
            aria-label="HS code or product description"
          />
          <button class="search-btn" ${isLoading ? "disabled" : ""}>
            ${isLoading ? "Searching..." : "Look Up"}
          </button>
        </div>
        <country-select placeholder="Select origin country..."></country-select>
      </div>
    `);

    const input = this.shadow.querySelector(".search-input") as HTMLInputElement;
    const btn = this.shadow.querySelector(".search-btn") as HTMLButtonElement;
    const countrySelect = this.shadow.querySelector("country-select");

    let selectedCountry = "";

    countrySelect?.addEventListener("country-change", ((e: Event) => {
      const detail = (e as CustomEvent).detail;
      selectedCountry = detail.code;
    }) as EventListener);

    const doSearch = () => {
      const query = input?.value?.trim() || "";
      if (query) {
        this.emit("search-submit", { query, country: selectedCountry });
      }
    };

    btn?.addEventListener("click", doSearch);

    input?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") doSearch();
    });

    input?.addEventListener("input", () => {
      this.emit("search-input", { value: input.value });
    });
  }
}
