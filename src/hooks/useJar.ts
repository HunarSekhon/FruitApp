import { useState, useMemo, useCallback } from 'react';
import type { FruitData, PieChartData, AggregatedJarItem } from '../types/fruit.types';
import { aggregateByName, convertToPieData, convertToAggregatedItems, calculateTotalCalories } from '../utils/fruit.utils';

export const useJar = () => {
  const [jar, setJar] = useState<FruitData[]>([]);

  const addItem = useCallback((item: FruitData) => {
    setJar((prev) => [...prev, item]);
  }, []);

  const addGroup = useCallback((items: FruitData[]) => {
    setJar((prev) => [...prev, ...items]);
  }, []);

  const removeByName = useCallback((name: string) => {
    setJar((prev) => prev.filter((item) => item.name !== name));
  }, []);

  const clearJar = useCallback(() => {
    setJar([]);
  }, []);

  const aggregatedMap = useMemo(() => aggregateByName(jar), [jar]);
  
  const aggregatedItems = useMemo((): AggregatedJarItem[] => 
    convertToAggregatedItems(aggregatedMap), [aggregatedMap]);

  const pieData = useMemo((): PieChartData[] => 
    convertToPieData(aggregatedMap), [aggregatedMap]);

  const totalCalories = useMemo(() => calculateTotalCalories(jar), [jar]);

  const isEmpty = jar.length === 0;

  return {
    jar,
    aggregatedItems,
    pieData,
    totalCalories,
    isEmpty,
    addItem,
    addGroup,
    removeByName,
    clearJar,
  };
};