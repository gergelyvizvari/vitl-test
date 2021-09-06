import React, { useContext } from 'react';
import { ProductsContext } from '../../context/products';
import { ProductCard } from './productCard';
import PropType from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const ProductItems = ({ products }) => {
    return products.map(
        product => <Col xs={12} sm={6} md={4} lg={3} key={product.name} className={'p-3'}>
            <ProductCard product={product} />
        </Col>);
};

export const ProductList = () => {
    const { products, loaded } = useContext(ProductsContext);

    if (!loaded) {
        return 'Please wait...';
    }

    return <section>
        <h2>Products</h2>
        <Row>
            <ProductItems products={products} />
        </Row>
    </section>
};

ProductItems.propType = {
    products: PropType.array
}