import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [config, setConfig] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json', { method: 'get' })
            .then(response => response.json())
            .then(result => {
                setConfig(result.config);
                setProducts(result.products);
                setLoaded(true);
            })
    }, [])

    const findUnit = (id) => {
        const limits = config.tolerableUpperLimits.find(item => item.id == id);
        if (!limits) return '';

        return limits.unit;
    }

    return <ProductsContext.Provider value={{
        products,
        config,
        loaded,
        findUnit
    }}>
        {children}
    </ProductsContext.Provider>
}

ProductsProvider.propTypes = {
    children: PropTypes.element.isRequired
};