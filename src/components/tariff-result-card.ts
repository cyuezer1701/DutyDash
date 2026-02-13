/**
 * Tariff Result Card Component
 * Displays the full tariff lookup result: HS code, description,
 * effective rate (color-coded), and embeds duty-breakdown.
 */

import { BaseComponent } from "./base-component";
import { formatRate, getRateSeverity } from "../core/tariff-logic";
import type { TariffResult } from "../types/index";

export class TariffResultCard extends BaseComponent {
  private _result: TariffResult | null = null;

  setResult(result: TariffResult): void {
    this._result = result;
    this.render();
  }

  render(): void {
    if (!this._result) {
      this.html(`${this.baseStyles()}<div></div>`);
      return;
    }

    const r = this._result;
    const severity = getRateSeverity(r.effectiveRate);

    const severityColors: Record<string, { bg: string; text: string; border: string }> = {
      low: { bg: "#dcfce7", text: "#166534", border: "#86efac" },
      moderate: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
      high: { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
      extreme: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
    };
    const sc = severityColors[severity];

    this.html(`
      ${this.baseStyles()}
      <style>
        .result-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }
        .card-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .hs-code {
          font-family: "Space Grotesk", monospace;
          font-size: 14px;
          font-weight: 600;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .product-description {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #f1f5f9;
          line-height: 1.3;
          margin: 0 0 8px 0;
        }
        .country-label {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 14px;
          color: #94a3b8;
        }
        .rate-display {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 32px 24px;
          background: ${sc.bg}18;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .rate-label {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          margin-bottom: 8px;
        }
        .rate-value {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 52px;
          font-weight: 800;
          color: ${sc.text};
          line-height: 1;
        }
        .rate-severity {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: ${sc.text};
          margin-top: 8px;
          padding: 4px 12px;
          background: ${sc.bg};
          border-radius: 6px;
        }
        .card-body {
          padding: 0;
        }
        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .meta-label {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 13px;
          color: #64748b;
        }
        .meta-value {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .rate-value {
            font-size: 40px;
          }
          .product-description {
            font-size: 18px;
          }
        }
      </style>
      <div class="result-card">
        <div class="card-header">
          <div class="hs-code">HS ${r.entry.hsCode}</div>
          <h2 class="product-description">${r.entry.description}</h2>
          <div class="country-label">Origin: ${r.country.name} (${r.country.code})</div>
        </div>

        <div class="rate-display">
          <div class="rate-label">Effective Total Tariff Rate</div>
          <div class="rate-value" role="status" aria-label="Effective rate ${formatRate(r.effectiveRate)}">${formatRate(r.effectiveRate)}</div>
          <div class="rate-severity">${severity}</div>
        </div>

        <div class="card-body">
          <duty-breakdown id="embedded-breakdown"></duty-breakdown>
        </div>

        <div class="meta-row">
          <span class="meta-label">Data last updated</span>
          <span class="meta-value">${r.lastUpdated}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Unit of measurement</span>
          <span class="meta-value">${r.entry.unit}</span>
        </div>
      </div>
    `);

    // Set data on the embedded duty-breakdown component
    const breakdown = this.shadow.querySelector("duty-breakdown") as HTMLElement & {
      setData?: (mfn: number, duties: typeof r.additionalDuties) => void;
    };
    if (breakdown?.setData) {
      breakdown.setData(r.mfnRate, r.additionalDuties);
    }
  }
}
