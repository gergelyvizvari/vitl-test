import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import './../products/productCard.scss';
import { BasketContext } from '../../context/basket';
import { useCurrency } from '../../hook/currency';

export const BasketCard = ({ basketItem }) => {
    const currency = useCurrency();
    const { addItem: increaseItem, decreaseItem, deleteItem } = useContext(BasketContext);

    return (
        <Card>
            <Card.Img className={'front'} src="https://via.placeholder.com/130x110" />
            <Card.Body>
                <Card.Title className={'mb-0'}>{basketItem.name}</Card.Title>
                <hr />
                <div className={'d-flex justify-content-between align-items-center'}>
                    <div className={'d-flex align-items-center'}>
                        <Button onClick={() => deleteItem(basketItem)} className={'btn btn-sm btn-danger me-1'}><FaTrash size={12} /></Button>
                        <Button onClick={() => decreaseItem(basketItem)} className={'btn btn-sm'}><FaMinus size={12} /></Button>
                        <div className={'px-2'}>{basketItem.amount}</div>
                        <Button onClick={() => increaseItem(basketItem)} className={'btn btn-sm'}><FaPlus size={12} /></Button>
                    </div>
                    <div>{currency(basketItem.price, basketItem.amount)}</div>
                </div>
            </Card.Body>
        </Card>
    )
};
