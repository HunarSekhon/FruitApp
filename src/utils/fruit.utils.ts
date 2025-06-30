import type { FruitData, AggregatedJarItem, PieChartData, GroupKey  } from '../types/fruit.types';

export const aggregateByName = (items: FruitData[]): Record<string, { calories: number; qty: number }> => {
    const map: Record<string, { calories: number; qty: number }> = {};
    items.forEach((item) => {
      if (!map[item.name]) {
        map[item.name] = { calories: 0, qty: 0 };
      }
      map[item.name].calories += item.nutritions.calories;
      map[item.name].qty += 1;
    });
    return map;
  };
  
  export const groupItems = (data: FruitData[], key: GroupKey): Record<string, FruitData[]> => {
    if (key === 'none') {
      return { 'All Fruits': data };
    }
    
    return data.reduce<Record<string, FruitData[]>>((acc, item) => {
      const group = item[key] || 'Unknown';
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  };
  
  export const filterFruits = (fruits: FruitData[], searchQuery: string): FruitData[] => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return fruits;
    
    return fruits.filter((fruit) =>
      fruit.name.toLowerCase().includes(query)
    );
  };
  
  export const convertToAggregatedItems = (jarMap: Record<string, { calories: number; qty: number }>): AggregatedJarItem[] => {
    return Object.entries(jarMap).map(([name, { qty, calories }]) => ({
      name,
      qty,
      calories,
    }));
  };
  
  export const convertToPieData = (jarMap: Record<string, { calories: number; qty: number }>): PieChartData[] => {
    return Object.entries(jarMap).map(([name, { calories, qty }]) => ({
      name,
      value: calories,
      qty,
    }));
  };
  
  export const calculateTotalCalories = (jar: FruitData[]): number => {
    return jar.reduce((sum, item) => sum + item.nutritions.calories, 0);
  };