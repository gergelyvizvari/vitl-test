import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const addItem = (product) => {
        const items = [...basketItems];
        const itemInBasket = items.find(item => item.name == product.name);
        if (itemInBasket) {
            itemInBasket.amount += 1;
        } else {
            items.push({ ...product, amount: 1 });
        }
        setBasketItems(items);
    }

    const decreaseItem = (basketItem) => {
        const items = [...basketItems];
        const itemInBasket = items.find(item => item.name == basketItem.name);
        itemInBasket.amount -= 1;
        if (itemInBasket.amount < 1) {
            deleteItem(basketItem)
        } else {
            setBasketItems(items);
        }
    }

    const increaseItem = (basketItem) => {
        const items = [...basketItems];
        const itemInBasket = items.find(item => item.name == basketItem.name);
        itemInBasket.amount += 1;
        setBasketItems(items);
    }

    const deleteItem = (basketItem) => {
        const items = [...basketItems];
        let itemIndex = items.findIndex(item => item.name == basketItem.name);
        items.splice(itemIndex, 1);
        setBasketItems(items);
    }

    const getTotalPriceAndItems = () => {
        let total = 0;
        let amount = 0;

        basketItems.forEach((item) => {
            amount += item.amount;
            total += Math.round(item.amount * item.price * 100) / 100;
        });

        return {
            total,
            amount
        }
    }

    return <BasketContext.Provider value={{
        basketItems,
        addItem,
        increaseItem,
        decreaseItem,
        deleteItem,
        getTotalPriceAndItems
    }}>
        {children}
    </BasketContext.Provider>
}

BasketProvider.propTypes = {
    children: PropTypes.element.isRequired
};