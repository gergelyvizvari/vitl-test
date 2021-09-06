import { useContext } from 'react';
import { ProductsContext } from '../context/products';

/**
 * Just a helper to use the same nutrient display everywhere
 */
export const useNutrient = () => {
    const { config } = useContext(ProductsContext);

    return (amount, id) => {
        const limits = config.tolerableUpperLimits.find(item => item.id == id);
        if (!limits) return amount;
        return `${amount}${limits.unit}`;
    }
}