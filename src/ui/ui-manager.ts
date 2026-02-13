/**
 * UI Manager
 * Handles screen navigation.
 */

import state from "../state/app-state";

const SCREENS = ["search-screen", "result-screen"];

/**
 * Shows a specific screen and hides all others.
 * Updates state.currentScreen.
 */
export function showScreen(screenId: string): void {
  SCREENS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  const target = document.getElementById(screenId);
  if (target) target.classList.remove("hidden");

  state.currentScreen = screenId;

  // Update nav-bar active state
  const navBar = document.querySelector("nav-bar");
  if (navBar) {
    const tab = screenId === "search-screen" ? "search" : "result";
    navBar.setAttribute("active", tab);
  }

  // Scroll to top on screen change
  window.scrollTo(0, 0);
}
