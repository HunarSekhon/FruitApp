import { useState, useEffect } from 'react';
import type { FruitData } from '../types/fruit.types';
import { fruitService } from '../api/services';

export const useFruits = () => {
  const [fruits, setFruits] = useState<FruitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fruitService.getAllFruits();
        setFruits(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fruits');
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  const refetch = () => {
    setError(null);
    const fetchFruits = async () => {
      try {
        setLoading(true);
        const data = await fruitService.getAllFruits();
        setFruits(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fruits');
      } finally {
        setLoading(false);
      }
    };
    fetchFruits();
  };

  return { fruits, loading, error, refetch };
};