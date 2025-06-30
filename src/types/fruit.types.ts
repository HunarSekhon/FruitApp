export interface Nutritions {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  }
  
  export interface FruitData {
    id: number;
    name: string;
    family: string;
    genus: string;
    order: string;
    nutritions: Nutritions;
  }

export type GroupKey = "none" | "family" | "order" | "genus";
export type ViewType = "table" | "list";
export type JarViewTabType = "jar" | "chart";

export interface JarItem extends FruitData {
    quantity?: number;
  }

  export interface AggregatedJarItem {
    name: string;
    qty: number;
    calories: number;
  }

export interface PieChartData {
  name: string;
  value: number;
  qty: number;
}