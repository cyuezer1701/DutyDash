/**
 * Renderer
 * DOM rendering functions for tariff search results and lookup results.
 */

import { formatRate } from "../core/tariff-logic";
import type { TariffEntry, TariffResult } from "../types/index";

/**
 * Renders search results as clickable entries in the #search-results container.
 * Each entry shows HS code, description, and base MFN rate.
 */
export function renderSearchResults(
  entries: TariffEntry[],
  onSelect: (hsCode: string) => void,
): void {
  const container = document.getElementById("search-results");
  if (!container) return;

  container.innerHTML = "";

  if (!entries || entries.length === 0) {
    return;
  }

  for (const entry of entries) {
    const div = document.createElement("div");
    div.className = "result-entry";
    div.tabIndex = 0;
    div.setAttribute("role", "button");
    div.setAttribute(
      "aria-label",
      `HS ${entry.hsCode}: ${entry.description}, MFN rate ${formatRate(entry.mfnRate)}`,
    );
    div.dataset.hsCode = entry.hsCode;

    div.innerHTML = `
      <span class="result-hs">${entry.hsCode}</span>
      <span class="result-desc">${entry.description}</span>
      <span class="result-rate">MFN ${formatRate(entry.mfnRate)}</span>
    `;

    div.addEventListener("click", () => onSelect(entry.hsCode));
    div.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(entry.hsCode);
      }
    });

    container.appendChild(div);
  }
}

/**
 * Renders the full tariff result on the result screen.
 * Sets data on the tariff-result-card web component.
 */
export function renderTariffResult(result: TariffResult): void {
  const card = document.getElementById("tariff-result") as HTMLElement & {
    setResult?: (r: TariffResult) => void;
  };
  if (card?.setResult) {
    card.setResult(result);
  }
}

/**
 * Clears the search results container.
 */
export function clearSearchResults(): void {
  const container = document.getElementById("search-results");
  if (container) container.innerHTML = "";
}
