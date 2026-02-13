/**
 * Rate Badge Component
 * Displays a color-coded tariff rate badge.
 * Colors: green (low), amber (moderate), orange (high), red (extreme).
 */

import { BaseComponent } from "./base-component";
import { getRateSeverity, formatRate } from "../core/tariff-logic";

export class RateBadge extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["rate", "size"];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  render(): void {
    const rateStr = this.getAttribute("rate") || "0";
    const size = this.getAttribute("size") || "md";
    const rate = parseFloat(rateStr);
    const severity = getRateSeverity(rate);
    const display = formatRate(rate);

    const sizeMap: Record<string, { fontSize: string; padding: string }> = {
      sm: { fontSize: "12px", padding: "2px 8px" },
      md: { fontSize: "16px", padding: "4px 12px" },
      lg: { fontSize: "28px", padding: "8px 20px" },
    };
    const s = sizeMap[size] || sizeMap.md;

    const colorMap: Record<string, { bg: string; text: string }> = {
      low: { bg: "#dcfce7", text: "#166534" },
      moderate: { bg: "#fef3c7", text: "#92400e" },
      high: { bg: "#ffedd5", text: "#9a3412" },
      extreme: { bg: "#fee2e2", text: "#991b1b" },
    };
    const c = colorMap[severity];

    this.html(`
      ${this.baseStyles()}
      <style>
        :host {
          display: inline-block;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-weight: 700;
          font-size: ${s.fontSize};
          padding: ${s.padding};
          border-radius: 8px;
          background: ${c.bg};
          color: ${c.text};
          white-space: nowrap;
        }
        .label {
          font-size: 0.7em;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      </style>
      <span class="badge" role="status" aria-label="Tariff rate ${display}, ${severity}">
        ${display}
        <span class="label">${severity}</span>
      </span>
    `);
  }
}
