import { useContext } from 'react';
import { ProductsContext } from '../context/products';

/**
 * Just a helper to use the same currency everywhere
 */
export const useCurrency = () => {
    const { config } = useContext(ProductsContext);

    let currency = {
        'GBP': '£'
    }[config.currency];

    if (!currency) {
        currency = config.currency;
    }

    return (price, amount = 1) => {
        return `${currency}${Math.round(price * amount * 100) / 100}`;
    }
}