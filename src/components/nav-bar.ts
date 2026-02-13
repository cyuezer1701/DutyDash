/**
 * Nav Bar Component
 * DutyDash navigation with logo and screen tabs.
 */

import { BaseComponent } from "./base-component";

export class NavBar extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["active"];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  render(): void {
    const active = this.getAttribute("active") || "search";

    this.html(`
      ${this.baseStyles()}
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          max-width: 100%;
        }
        .logo {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: pointer;
        }
        .tabs {
          display: flex;
          gap: 4px;
        }
        .tab {
          padding: 8px 16px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .tab:hover {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.06);
        }
        .tab.active {
          color: #f1f5f9;
          background: rgba(59, 130, 246, 0.15);
          font-weight: 600;
        }
        .tab:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .nav {
            padding: 10px 14px;
          }
          .logo {
            font-size: 18px;
          }
          .tab {
            padding: 6px 10px;
            font-size: 13px;
          }
        }
      </style>
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <div class="logo" tabindex="0" role="button" aria-label="Go to search">DutyDash</div>
        <div class="tabs">
          <button class="tab ${active === "search" ? "active" : ""}" data-screen="search-screen">
            Search
          </button>
          <button class="tab" disabled title="Coming soon">
            Dashboard
          </button>
        </div>
      </nav>
    `);

    // Logo click → search
    this.shadow.querySelector(".logo")?.addEventListener("click", () => {
      this.emit("nav-change", { screen: "search-screen" });
    });

    // Tab clicks
    for (const tab of this.shadow.querySelectorAll(".tab[data-screen]")) {
      tab.addEventListener("click", () => {
        const screen = (tab as HTMLElement).dataset.screen;
        if (screen) this.emit("nav-change", { screen });
      });
    }
  }
}
