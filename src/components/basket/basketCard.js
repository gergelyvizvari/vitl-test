import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ProductsContext } from '../../context/products';
import { Button, Card } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";

import './../products/productCard.scss';
import { BasketContext } from '../../context/basket';

export const BasketCard = ({ basketItem }) => {
    const { config } = useContext(ProductsContext);
    const { addItem: increaseItem, decreaseItem, deleteItem } = useContext(BasketContext);

    return (
        <Card>
            <Card.Body>
                <Card.Img className={'front'} src="https://via.placeholder.com/130x110" />
                <div className={'d-flex justify-content-between align-items-center mt-2'}>
                    <Card.Title className={'mb-0'}>{basketItem.name}</Card.Title>
                    <Button onClick={() => deleteItem(basketItem)} className={'btn btn-sm btn-danger pb-2'}><FaTrash /></Button>
                </div>
                <hr />
                <div className={'d-flex justify-content-between align-items-center'}>
                    <div className={'d-flex align-items-center'}>
                        <Button onClick={() => decreaseItem(basketItem)} className={'btn btn-sm'}>-</Button>
                        <div className={'px-2'}>{basketItem.amount}</div>
                        <Button onClick={() => increaseItem(basketItem)} className={'btn btn-sm'}>+</Button>
                    </div>
                    <div>{config.currency}{Math.round(basketItem.price * basketItem.amount * 100) / 100}</div>
                </div>
            </Card.Body>
        </Card>
    )
};

const basketItemPropType = PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
});

BasketCard.propTypes = {
    basketItem: basketItemPropType
};