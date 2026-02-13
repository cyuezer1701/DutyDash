import { describe, it, expect, vi } from "vitest";
import {
  generateId,
  formatTime,
  formatDate,
  formatPercent,
  debounce,
} from "../../src/core/utils";

describe("generateId", () => {
  it("should generate an ID of default length 8", () => {
    const id = generateId();
    expect(id).toHaveLength(8);
  });

  it("should generate an ID of specified length", () => {
    const id = generateId(12);
    expect(id).toHaveLength(12);
  });

  it("should only contain valid characters", () => {
    const id = generateId(100);
    const validChars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    for (const char of id) {
      expect(validChars).toContain(char);
    }
  });

  it("should generate unique IDs", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });

  it("should handle length of 0", () => {
    const id = generateId(0);
    expect(id).toBe("");
  });
});

describe("formatTime", () => {
  it("should format a timestamp as time string", () => {
    const timestamp = new Date("2024-01-01T12:30:00Z").getTime();
    const result = formatTime(timestamp);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });

  it("should return a non-empty string", () => {
    const result = formatTime(Date.now());
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("formatDate", () => {
  it("should format a timestamp as date string", () => {
    const timestamp = new Date("2024-06-15T00:00:00Z").getTime();
    const result = formatDate(timestamp);
    expect(result).toContain("2024");
  });

  it("should return a non-empty string", () => {
    const result = formatDate(Date.now());
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("formatPercent", () => {
  it("formats 0.25 as '25.0%'", () => {
    expect(formatPercent(0.25)).toBe("25.0%");
  });

  it("formats 0 as '0.0%'", () => {
    expect(formatPercent(0)).toBe("0.0%");
  });

  it("formats with custom decimal places", () => {
    expect(formatPercent(0.12345, 2)).toBe("12.35%");
  });

  it("formats 1.0 as '100.0%'", () => {
    expect(formatPercent(1.0)).toBe("100.0%");
  });
});

describe("debounce", () => {
  it("delays function invocation", async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("cancels previous invocation on rapid calls", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("passes arguments to the debounced function", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced("hello", "world");
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith("hello", "world");

    vi.useRealTimers();
  });
});
