import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ProductsContext } from '../../context/products';
import { Button, Card } from 'react-bootstrap';
import { NutrientList } from './nutrientList';
import { TiShoppingCart } from "react-icons/ti";

import './productCard.scss';
import { BasketContext } from '../../context/basket';

export const ProductCard = ({ product }) => {
    const { config } = useContext(ProductsContext);
    const { addItem } = useContext(BasketContext);
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={'ProductCard'}>
            <Card>
                <div className={`Holder`} onClick={() => setShowDetails(!showDetails)}>
                    <Card.Img className={`Image ${showDetails ? 'cover' : ''}`} src="https://via.placeholder.com/130x110" />
                    <Card.Body className={`Details ${showDetails ? 'show' : ''}`} >
                        <NutrientList nutrients={product.nutrients} productName={product.name} />
                    </Card.Body>
                </div>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <hr />
                    <div className={'d-flex justify-content-between align-items-center'}>
                        {config.currency}{product.price}
                        <Button onClick={() => addItem(product)}><TiShoppingCart /></Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

const productPropType = PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    nutrients: PropTypes.array
});

ProductCard.propTypes = {
    product: productPropType
};