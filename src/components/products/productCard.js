import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { NutrientList } from './nutrientList';
import { TiShoppingCart } from "react-icons/ti";
import { BasketContext } from '../../context/basket';
import { useCurrency } from '../../hook/currency';

import './productCard.scss';

export const ProductCard = ({ product }) => {
    const { addItem } = useContext(BasketContext);
    const [showDetails, setShowDetails] = useState(false);
    const currency = useCurrency();

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
                        {currency(product.price)}
                        <Button onClick={() => addItem(product)}><TiShoppingCart size={18} /></Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};