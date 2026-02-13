/**
 * Shared application state singleton.
 * All modules import this object and read/write its properties directly.
 */
import type { AppState } from "../types/index";

const state: AppState = {
  searchQuery: "",
  selectedCountry: "",
  searchResults: [],
  currentTariffResult: null,
  currentScreen: "search-screen",
  isLoading: false,
};

export default state;
