import React, { useState, createContext, useContext } from 'react';
import { ProductsContext } from './products';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);
    const [errors, setErrors] = useState([]);
    const { config } = useContext(ProductsContext);

    // check if attempted new basketlist isokay nutrients amount
    const checkTolerableUpperLimits = (attemptedItems) => {
        const limits = [...config.tolerableUpperLimits];
        const errors = [];

        // create nutrient amoun - current pairs
        limits.forEach(item => item.current = 0);

        // collect all item ...
        attemptedItems.forEach(attemptedItem => {
            // ..all nutrient
            attemptedItem.nutrients.forEach(nutrientItem => {
                // ..put next to the limits
                limits.forEach(limitItem => {
                    if (nutrientItem.id === limitItem.id) {
                        limitItem.current += nutrientItem.amount * attemptedItem.amount
                    }
                })
            })
        });

        // check collected nutrient amounts
        limits.forEach(item => {
            if (item.amount < item.current) {
                errors.push(`You have exceeded ${item.id} limit`);
            }
        })

        // hide errors (exceeded nutrient amounts) after 2 second
        if (errors.length > 0) {
            setTimeout(() => setErrors([]), 2000);
        }

        return errors;
    }

    const addItem = (product) => {
        const items = JSON.parse(JSON.stringify(basketItems));
        const itemInBasket = items.find(item => item.name == product.name);

        if (itemInBasket) {
            itemInBasket.amount += 1;
        } else {
            items.push({ ...product, amount: 1 });
        }

        const tmpErrors = checkTolerableUpperLimits(items);

        if (tmpErrors.length === 0) {
            setBasketItems(items);
        }

        console.log(tmpErrors);

        setErrors(tmpErrors);
    }

    const decreaseItem = (basketItem) => {
        const items = JSON.parse(JSON.stringify(basketItems));
        const itemInBasket = items.find(item => item.name == basketItem.name);
        itemInBasket.amount -= 1;
        if (itemInBasket.amount < 1) {
            deleteItem(basketItem)
        } else {
            setBasketItems(items);
        }
    }

    const deleteItem = (basketItem) => {
        const items = JSON.parse(JSON.stringify(basketItems));
        let itemIndex = items.findIndex(item => item.name == basketItem.name);
        items.splice(itemIndex, 1);
        setBasketItems(items);
    }

    // just a helper to show basket total price
    const getTotalPriceAndItems = () => {
        let total = 0;
        let amount = 0;

        basketItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
        });

        return {
            total,
            amount
        }
    }

    return <BasketContext.Provider value={{
        basketItems,
        addItem,
        decreaseItem,
        deleteItem,
        getTotalPriceAndItems,
        errors
    }}>
        {children}
    </BasketContext.Provider>
}