/**
 * Duty Breakdown Component
 * Shows a table of MFN rate + additional duties with a total row.
 */

import { BaseComponent } from "./base-component";
import { formatRate, getRateSeverity } from "../core/tariff-logic";
import type { DutyRate } from "../types/index";

const DUTY_LABELS: Record<string, string> = {
  mfn: "MFN Base Rate",
  section301: "Section 301",
  ieepa: "IEEPA Emergency",
  reciprocal: "Reciprocal",
  antidumping: "Anti-Dumping",
  countervailing: "Countervailing",
};

export class DutyBreakdown extends BaseComponent {
  private _mfnRate = 0;
  private _duties: DutyRate[] = [];

  setData(mfnRate: number, duties: DutyRate[]): void {
    this._mfnRate = mfnRate;
    this._duties = duties;
    this.render();
  }

  render(): void {
    const totalRate =
      this._mfnRate + this._duties.reduce((sum, d) => sum + d.rate, 0);
    const severity = getRateSeverity(totalRate);

    const severityColors: Record<string, { bg: string; text: string }> = {
      low: { bg: "#dcfce7", text: "#166534" },
      moderate: { bg: "#fef3c7", text: "#92400e" },
      high: { bg: "#ffedd5", text: "#9a3412" },
      extreme: { bg: "#fee2e2", text: "#991b1b" },
    };
    const sc = severityColors[severity];

    let dutyRows = "";
    if (this._duties.length > 0) {
      for (const duty of this._duties) {
        dutyRows += `
          <tr>
            <td class="label-cell">
              <span class="duty-type">${DUTY_LABELS[duty.type] || duty.type}</span>
              <span class="duty-desc">${duty.description}</span>
            </td>
            <td class="rate-cell">${formatRate(duty.rate)}</td>
          </tr>
        `;
      }
    } else {
      dutyRows = `
        <tr>
          <td class="label-cell no-duties" colspan="2">
            No additional duties for this country
          </td>
        </tr>
      `;
    }

    this.html(`
      ${this.baseStyles()}
      <style>
        .breakdown {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .breakdown-title {
          padding: 14px 18px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #94a3b8;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        tr:last-child {
          border-bottom: none;
        }
        td {
          padding: 12px 18px;
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 14px;
          color: #e2e8f0;
          vertical-align: top;
        }
        .label-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .duty-type {
          font-weight: 600;
          color: #f1f5f9;
        }
        .duty-desc {
          font-size: 12px;
          color: #94a3b8;
        }
        .rate-cell {
          text-align: right;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .no-duties {
          color: #64748b;
          font-style: italic;
        }
        .total-row {
          background: ${sc.bg}15;
        }
        .total-row td {
          padding: 14px 18px;
          font-weight: 700;
          font-size: 15px;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
        }
        .total-rate {
          color: ${sc.text};
          font-size: 18px;
        }
        .mfn-row td {
          color: #cbd5e1;
        }
      </style>
      <div class="breakdown">
        <div class="breakdown-title">Duty Breakdown</div>
        <table>
          <tr class="mfn-row">
            <td class="label-cell">
              <span class="duty-type">MFN Base Rate</span>
              <span class="duty-desc">Most Favored Nation general tariff</span>
            </td>
            <td class="rate-cell">${formatRate(this._mfnRate)}</td>
          </tr>
          ${dutyRows}
          <tr class="total-row">
            <td>Effective Total Rate</td>
            <td class="rate-cell total-rate">${formatRate(totalRate)}</td>
          </tr>
        </table>
      </div>
    `);
  }
}
