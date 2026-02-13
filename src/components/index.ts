/**
 * Component Registry
 * Registers all custom elements used in the application.
 */

import { AppButton } from "./app-button";
import { AppCard } from "./app-card";
import { AppModal } from "./app-modal";
import { AppNotification } from "./app-notification";
import { AppInput } from "./app-input";
import { AppEmptyState } from "./app-empty-state";
import { RateBadge } from "./rate-badge";
import { CountrySelect } from "./country-select";
import { TariffSearchBar } from "./tariff-search-bar";
import { DutyBreakdown } from "./duty-breakdown";
import { TariffResultCard } from "./tariff-result-card";
import { DisclaimerBanner } from "./disclaimer-banner";
import { NavBar } from "./nav-bar";

export {
  AppButton,
  AppCard,
  AppModal,
  AppNotification,
  AppInput,
  AppEmptyState,
  RateBadge,
  CountrySelect,
  TariffSearchBar,
  DutyBreakdown,
  TariffResultCard,
  DisclaimerBanner,
  NavBar,
};

/**
 * Registers all Web Components as custom elements.
 * Call this once during app initialization, before other init functions.
 */
export function registerComponents(): void {
  const components: [string, CustomElementConstructor][] = [
    ["app-button", AppButton],
    ["app-card", AppCard],
    ["app-modal", AppModal],
    ["app-notification", AppNotification],
    ["app-input", AppInput],
    ["app-empty-state", AppEmptyState],
    ["rate-badge", RateBadge],
    ["country-select", CountrySelect],
    ["tariff-search-bar", TariffSearchBar],
    ["duty-breakdown", DutyBreakdown],
    ["tariff-result-card", TariffResultCard],
    ["disclaimer-banner", DisclaimerBanner],
    ["nav-bar", NavBar],
  ];

  for (const [name, constructor] of components) {
    if (!customElements.get(name)) {
      customElements.define(name, constructor);
    }
  }
}
