/**
 * DutyDash — Main Entry Point
 *
 * Initializes components, i18n, and wires up the application.
 */

// Styles
import "./styles/main.css";
import "./styles/components.css";
import "./styles/ui.css";
import "./styles/animations.css";
import "./styles/tariff.css";

// Services
import { initConnectionMonitor } from "./services/connection-monitor";

// UI
import { showScreen } from "./ui/ui-manager";

// i18n
import { initI18n } from "./i18n/i18n";
import { getSavedLocale } from "./i18n/locale-switcher";

// Web Components
import { registerComponents } from "./components";

// App modules
import { initAppHandlers } from "./ui/event-handlers";

/* ==================== I18N & COMPONENTS ==================== */

registerComponents();
await initI18n(getSavedLocale());

/* ==================== SERVICES ==================== */

initConnectionMonitor();

/* ==================== RENDER BRIDGE ==================== */

function renderApp(): void {
  // Currently a no-op — rendering is handled by event handlers
  // and web components reactively. This callback exists for the
  // initAppHandlers contract and future use.
}

/* ==================== INITIALIZE ALL MODULES ==================== */

initAppHandlers(renderApp);

// Remove skeleton loader
const skeleton = document.getElementById("skeleton-loader");
if (skeleton) {
  skeleton.style.transition = "opacity 0.3s";
  skeleton.style.opacity = "0";
  setTimeout(() => skeleton.remove(), 300);
}

showScreen("search-screen");

console.log("DutyDash initialized");
