/**
 * UI Event Handlers
 * Wires up search, navigation, and tariff lookup interactions.
 */

import state from "../state/app-state";
import { showScreen } from "./ui-manager";
import { notify } from "../core/utils";
import { debounce } from "../core/utils";
import { searchTariffs, lookupTariff } from "../services/tariff-service";
import { validateHsCode } from "../core/tariff-logic";
import { UI } from "../constants/app-constants";
import {
  renderSearchResults,
  renderTariffResult,
  clearSearchResults,
} from "./renderer";
import type { RenderCallback } from "../types/index";

let _selectedCountry = "";

export function initAppHandlers(_renderAppFn: RenderCallback): void {

  // Search submit — full lookup
  document.addEventListener("search-submit", ((e: Event) => {
    const { query, country } = (
      e as CustomEvent<{ query: string; country: string }>
    ).detail;
    _selectedCountry = country;
    handleSearchSubmit(query, country);
  }) as EventListener);

  // Search input — live filtering (debounced)
  const debouncedSearch = debounce((value: string) => {
    if (!value.trim()) {
      clearSearchResults();
      state.searchResults = [];
      return;
    }
    const results = searchTariffs(value);
    state.searchResults = results;
    renderSearchResults(results, handleResultSelect);
  }, UI.SEARCH_DEBOUNCE_MS);

  document.addEventListener("search-input", ((e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    debouncedSearch(value);
  }) as EventListener);

  // Nav change
  document.addEventListener("nav-change", ((e: Event) => {
    const { screen } = (e as CustomEvent<{ screen: string }>).detail;
    showScreen(screen);
  }) as EventListener);

  // Back to search button
  const backBtn = document.getElementById("btn-back-to-search");
  if (backBtn) {
    backBtn.onclick = () => {
      showScreen("search-screen");
    };
  }
}

/**
 * Handles a search submission — looks up the tariff for HS code + country.
 */
function handleSearchSubmit(query: string, country: string): void {
  // First, check if it looks like an HS code
  const validation = validateHsCode(query);

  if (validation.valid && country) {
    // Direct lookup
    const result = lookupTariff(query, country);
    if (result) {
      state.currentTariffResult = result;
      renderTariffResult(result);
      showScreen("result-screen");
      return;
    }
    notify("No tariff data found for this HS code.", "warning");
    return;
  }

  if (!country) {
    // Search without country — show results list
    const results = searchTariffs(query);
    if (results.length === 0) {
      notify("No results found. Try a different search term.", "warning");
      return;
    }

    if (results.length === 1) {
      // Auto-select single result, but still need a country
      notify("Please select an origin country to see the full tariff rate.", "info");
    }

    state.searchResults = results;
    renderSearchResults(results, handleResultSelect);
    return;
  }

  // Have country, query is a description — search and show results
  const results = searchTariffs(query);
  if (results.length === 0) {
    notify("No results found. Try a different search term.", "warning");
    return;
  }

  if (results.length === 1) {
    // Single match — do full lookup
    const result = lookupTariff(results[0].hsCode, country);
    if (result) {
      state.currentTariffResult = result;
      renderTariffResult(result);
      showScreen("result-screen");
      return;
    }
  }

  state.searchResults = results;
  renderSearchResults(results, handleResultSelect);
}

/**
 * Handles clicking on a search result entry.
 */
function handleResultSelect(hsCode: string): void {
  if (!_selectedCountry) {
    notify("Please select an origin country first.", "info");
    return;
  }

  const result = lookupTariff(hsCode, _selectedCountry);
  if (result) {
    state.currentTariffResult = result;
    renderTariffResult(result);
    showScreen("result-screen");
  } else {
    notify("Could not look up tariff data for this combination.", "warning");
  }
}
