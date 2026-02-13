/**
 * Static US HTS tariff data for MVP.
 * MFN rates based on USITC Harmonized Tariff Schedule.
 * This module can be replaced with an API-backed service in the future.
 */

import type { TariffEntry } from "../types/index";

export const TARIFF_ENTRIES: TariffEntry[] = [
  // ── Chapter 08: Edible Fruit ──
  {
    hsCode: "0803.90",
    description: "Bananas, fresh or dried (other than plantains)",
    chapter: 8,
    unit: "kg",
    mfnRate: 0,
  },
  {
    hsCode: "0804.50",
    description: "Guavas, mangoes and mangosteens, fresh or dried",
    chapter: 8,
    unit: "kg",
    mfnRate: 0.066,
  },
  // ── Chapter 09: Coffee, Tea ──
  {
    hsCode: "0901.11",
    description: "Coffee, not roasted, not decaffeinated",
    chapter: 9,
    unit: "kg",
    mfnRate: 0,
  },
  {
    hsCode: "0901.21",
    description: "Coffee, roasted, not decaffeinated",
    chapter: 9,
    unit: "kg",
    mfnRate: 0,
  },
  {
    hsCode: "0902.30",
    description: "Black tea (fermented) in packages not exceeding 3 kg",
    chapter: 9,
    unit: "kg",
    mfnRate: 0,
  },
  // ── Chapter 16: Preparations of Meat ──
  {
    hsCode: "1604.14",
    description: "Prepared or preserved tuna, skipjack and bonito",
    chapter: 16,
    unit: "kg",
    mfnRate: 0.06,
  },
  // ── Chapter 17: Sugars ──
  {
    hsCode: "1701.14",
    description: "Raw cane sugar, not containing flavoring or coloring",
    chapter: 17,
    unit: "kg",
    mfnRate: 0.01536,
  },
  // ── Chapter 22: Beverages ──
  {
    hsCode: "2204.21",
    description: "Wine of fresh grapes, in containers not exceeding 2 liters",
    chapter: 22,
    unit: "l",
    mfnRate: 0.063,
  },
  {
    hsCode: "2203.00",
    description: "Beer made from malt",
    chapter: 22,
    unit: "l",
    mfnRate: 0,
  },
  // ── Chapter 27: Mineral Fuels ──
  {
    hsCode: "2709.00",
    description: "Petroleum oils, crude",
    chapter: 27,
    unit: "bbl",
    mfnRate: 0.0525,
  },
  // ── Chapter 39: Plastics ──
  {
    hsCode: "3923.30",
    description: "Carboys, bottles, flasks of plastics",
    chapter: 39,
    unit: "kg",
    mfnRate: 0.03,
  },
  {
    hsCode: "3926.20",
    description: "Articles of apparel and clothing accessories of plastics",
    chapter: 39,
    unit: "kg",
    mfnRate: 0.05,
  },
  {
    hsCode: "3926.90",
    description: "Other articles of plastics",
    chapter: 39,
    unit: "kg",
    mfnRate: 0.053,
  },
  // ── Chapter 42: Leather Articles ──
  {
    hsCode: "4202.11",
    description: "Trunks, suitcases with outer surface of leather",
    chapter: 42,
    unit: "pcs",
    mfnRate: 0.08,
  },
  {
    hsCode: "4202.22",
    description: "Handbags with outer surface of plastic or textile",
    chapter: 42,
    unit: "pcs",
    mfnRate: 0.169,
  },
  // ── Chapter 44: Wood ──
  {
    hsCode: "4418.20",
    description: "Doors and their frames and thresholds, of wood",
    chapter: 44,
    unit: "pcs",
    mfnRate: 0,
  },
  // ── Chapter 48: Paper ──
  {
    hsCode: "4819.10",
    description: "Cartons, boxes and cases of corrugated paper",
    chapter: 48,
    unit: "kg",
    mfnRate: 0,
  },
  // ── Chapter 61: Knitted Apparel ──
  {
    hsCode: "6104.62",
    description: "Women's trousers and shorts, of cotton, knitted",
    chapter: 61,
    unit: "doz",
    mfnRate: 0.147,
  },
  {
    hsCode: "6109.10",
    description: "T-shirts, singlets and vests, of cotton, knitted",
    chapter: 61,
    unit: "doz",
    mfnRate: 0.166,
  },
  {
    hsCode: "6110.20",
    description: "Sweaters, pullovers, vests, of cotton, knitted",
    chapter: 61,
    unit: "doz",
    mfnRate: 0.166,
  },
  {
    hsCode: "6115.95",
    description: "Hosiery and footwear, of cotton, knitted",
    chapter: 61,
    unit: "doz/pr",
    mfnRate: 0.132,
  },
  // ── Chapter 62: Woven Apparel ──
  {
    hsCode: "6203.42",
    description: "Men's trousers, breeches, shorts, of cotton, not knitted",
    chapter: 62,
    unit: "doz",
    mfnRate: 0.168,
  },
  {
    hsCode: "6204.62",
    description: "Women's trousers and shorts, of cotton, not knitted",
    chapter: 62,
    unit: "doz",
    mfnRate: 0.168,
  },
  {
    hsCode: "6205.20",
    description: "Men's shirts, of cotton, not knitted",
    chapter: 62,
    unit: "doz",
    mfnRate: 0.197,
  },
  // ── Chapter 63: Textile Articles ──
  {
    hsCode: "6302.60",
    description: "Toilet linen and kitchen linen, of cotton terry",
    chapter: 63,
    unit: "kg",
    mfnRate: 0.094,
  },
  // ── Chapter 64: Footwear ──
  {
    hsCode: "6402.99",
    description: "Footwear with outer soles and uppers of rubber or plastics",
    chapter: 64,
    unit: "pr",
    mfnRate: 0.20,
  },
  {
    hsCode: "6403.99",
    description: "Footwear with outer soles of rubber/plastics and uppers of leather",
    chapter: 64,
    unit: "pr",
    mfnRate: 0.10,
  },
  {
    hsCode: "6404.11",
    description: "Sports footwear with outer soles of rubber/plastics, textile uppers",
    chapter: 64,
    unit: "pr",
    mfnRate: 0.20,
  },
  // ── Chapter 71: Jewelry ──
  {
    hsCode: "7113.19",
    description: "Jewelry and parts thereof, of precious metal",
    chapter: 71,
    unit: "pcs",
    mfnRate: 0.065,
  },
  {
    hsCode: "7117.19",
    description: "Imitation jewelry, of base metal",
    chapter: 71,
    unit: "pcs",
    mfnRate: 0.11,
  },
  // ── Chapter 73: Iron and Steel Articles ──
  {
    hsCode: "7308.90",
    description: "Structures and parts of structures, of iron or steel",
    chapter: 73,
    unit: "kg",
    mfnRate: 0,
  },
  {
    hsCode: "7318.15",
    description: "Screws and bolts of iron or steel",
    chapter: 73,
    unit: "kg",
    mfnRate: 0.063,
  },
  {
    hsCode: "7326.90",
    description: "Other articles of iron or steel",
    chapter: 73,
    unit: "kg",
    mfnRate: 0.029,
  },
  // ── Chapter 76: Aluminum ──
  {
    hsCode: "7616.99",
    description: "Other articles of aluminum",
    chapter: 76,
    unit: "kg",
    mfnRate: 0.051,
  },
  // ── Chapter 84: Machinery ──
  {
    hsCode: "8414.51",
    description: "Table, floor, wall and ceiling fans, electric",
    chapter: 84,
    unit: "pcs",
    mfnRate: 0.046,
  },
  {
    hsCode: "8418.10",
    description: "Combined refrigerator-freezers",
    chapter: 84,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8443.32",
    description: "Printers, copying machines and facsimile machines",
    chapter: 84,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8471.30",
    description: "Portable automatic data processing machines (laptops)",
    chapter: 84,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8471.49",
    description: "Other automatic data processing machines (desktops)",
    chapter: 84,
    unit: "pcs",
    mfnRate: 0,
  },
  // ── Chapter 85: Electrical Equipment ──
  {
    hsCode: "8504.40",
    description: "Static converters (power supplies, adapters)",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0.015,
  },
  {
    hsCode: "8507.60",
    description: "Lithium-ion batteries",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0.033,
  },
  {
    hsCode: "8517.13",
    description: "Smartphones and other telephones for cellular networks",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8518.30",
    description: "Headphones and earphones",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0.047,
  },
  {
    hsCode: "8523.51",
    description: "Solid-state non-volatile storage devices (USB drives, SSDs)",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8528.72",
    description: "Television receivers, color, with flat panel screen",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0.038,
  },
  {
    hsCode: "8541.40",
    description: "Photosensitive semiconductor devices (solar cells)",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8542.31",
    description: "Electronic integrated circuits — processors and controllers",
    chapter: 85,
    unit: "pcs",
    mfnRate: 0,
  },
  // ── Chapter 87: Vehicles ──
  {
    hsCode: "8703.23",
    description: "Motor cars for transport of persons, spark-ignition, 1500–3000 cc",
    chapter: 87,
    unit: "pcs",
    mfnRate: 0.025,
  },
  {
    hsCode: "8703.80",
    description: "Motor vehicles, electric, for transport of persons",
    chapter: 87,
    unit: "pcs",
    mfnRate: 0.025,
  },
  {
    hsCode: "8711.60",
    description: "Motorcycles with electric motor for propulsion",
    chapter: 87,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "8712.00",
    description: "Bicycles and other cycles, not motorized",
    chapter: 87,
    unit: "pcs",
    mfnRate: 0.11,
  },
  // ── Chapter 94: Furniture ──
  {
    hsCode: "9401.61",
    description: "Upholstered seats with wooden frames",
    chapter: 94,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "9403.60",
    description: "Wooden furniture, other than seats",
    chapter: 94,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "9405.42",
    description: "LED lamps and lighting fittings",
    chapter: 94,
    unit: "pcs",
    mfnRate: 0.038,
  },
  // ── Chapter 95: Toys and Games ──
  {
    hsCode: "9503.00",
    description: "Toys, including ride-on toys and puzzles",
    chapter: 95,
    unit: "pcs",
    mfnRate: 0,
  },
  {
    hsCode: "9504.50",
    description: "Video game consoles and machines",
    chapter: 95,
    unit: "pcs",
    mfnRate: 0,
  },
  // ── Chapter 96: Misc Manufactured Articles ──
  {
    hsCode: "9603.21",
    description: "Toothbrushes, including dental-plate brushes",
    chapter: 96,
    unit: "doz",
    mfnRate: 0,
  },
  {
    hsCode: "9608.10",
    description: "Ball point pens",
    chapter: 96,
    unit: "gro",
    mfnRate: 0,
  },
];
