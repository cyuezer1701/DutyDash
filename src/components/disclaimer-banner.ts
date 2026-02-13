/**
 * Disclaimer Banner Component
 * Displays a legal disclaimer about tariff data accuracy.
 * Dismissible with localStorage persistence.
 */

import { BaseComponent } from "./base-component";

const STORAGE_KEY = "dutydash-disclaimer-dismissed";

export class DisclaimerBanner extends BaseComponent {
  render(): void {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "true";
    if (dismissed) {
      this.html(`${this.baseStyles()}<div></div>`);
      return;
    }

    this.html(`
      ${this.baseStyles()}
      <style>
        .disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 18px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 10px;
          margin: 12px auto;
          max-width: 720px;
        }
        .icon {
          flex-shrink: 0;
          font-size: 18px;
          line-height: 1.4;
        }
        .text {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 12px;
          color: #fbbf24;
          line-height: 1.5;
          flex: 1;
        }
        .dismiss-btn {
          flex-shrink: 0;
          padding: 4px 10px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 6px;
          background: transparent;
          color: #fbbf24;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .dismiss-btn:hover {
          background: rgba(245, 158, 11, 0.15);
        }
      </style>
      <div class="disclaimer" role="alert">
        <span class="icon" aria-hidden="true">&#9888;</span>
        <span class="text">
          DutyDash provides tariff rate information for informational purposes only.
          This is not legal, trade, or customs advice. Actual duty rates may vary.
          Always consult with a licensed customs broker for official determinations.
        </span>
        <button class="dismiss-btn" aria-label="Dismiss disclaimer">Got it</button>
      </div>
    `);

    this.shadow.querySelector(".dismiss-btn")?.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "true");
      this.render();
    });
  }
}
