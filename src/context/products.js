import React, { useState, createContext, useEffect } from 'react';
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [config, setConfig] = useState({});
    const [loaded, setLoaded] = useState(false);

    // Fetch data from the test server
    useEffect(() => {
        fetch('https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json', { method: 'get' })
            .then(response => response.json())
            .then(result => {
                setConfig(result.config);
                setProducts(result.products);
                setLoaded(true);
            })
    }, [])

    return <ProductsContext.Provider value={{
        products,
        config,
        loaded
    }}>
        {children}
    </ProductsContext.Provider>
}