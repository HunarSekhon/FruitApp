import type { FruitData } from '../types/fruit.types';
import { apiClient } from './../lib/axios';


export const fruitService = {
    getAllFruits: async (): Promise<FruitData[]> => {
        try{

      const response = await apiClient.get('/api/fruits');
      return response.data;
        } catch (error: any ){
            throw new Error('Failed to fetch Fruits');
        }
    }
}   
    