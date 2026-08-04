export type WineType =
  | "red"
  | "white"
  | "rosé"
  | "sparkling"
  | "fortified"
  | "dessert";

export interface Wine {
  id: string;
  name: string;
  producer: string;
  type: WineType;
  grapeVariety: string[];
  year: number;
  quantity: number;
  description: string;
  score: number; // 0–100
  appellation: string;
  price: number; // GBP (£) per bottle
  alcoholicStrength: number; // ABV %
  bottleVolume: number; // ml
  containsSulphites: boolean;
  country: string;
  region: string;
  address?: string;
  tastingNotes: string;
  readyToDrink: boolean;
}

export interface WineStats {
  totalBottles: number;
  totalCountries: number;
  totalRegions: number;
  cellarValue: number; // GBP = Σ price × quantity
  readyToDrink: number;
}

export type SortKey =
  | "name"
  | "producer"
  | "type"
  | "country"
  | "year"
  | "score"
  | "readyToDrink"
  | "price"
  | "quantity";
export type SortDir = "asc" | "desc";
