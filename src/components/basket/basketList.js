import React, { useContext } from 'react';
import { BasketCard } from './basketCard';
import PropType from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { BasketContext } from '../../context/basket';
import { ProductsContext } from '../../context/products';
import { Button } from 'react-bootstrap';


const BasketItems = ({ basketItems }) => {
    return basketItems.map(basketItem => {
        return <Col xs={12} sm={6} md={4} lg={3} key={basketItem.name} className={'p-3'}>
            <BasketCard basketItem={basketItem} />
        </Col>
    });
};

export const BasketList = () => {
    const { basketItems, getTotalPriceAndItems } = useContext(BasketContext);
    const { config } = useContext(ProductsContext);

    const { total, amount } = getTotalPriceAndItems();

    return <section className={'mt-2'}>
        <h2>Basket
            {amount > 0 && <>
                <small className={'mx-2'}>({amount} items {config.currency}{total})</small>
                <Button>Checkout</Button>
            </>}

        </h2>

        <Row>
            {basketItems.length === 0 && <Col>The Basket is empty</Col>}
            {basketItems.length > 0 && <BasketItems basketItems={basketItems} />}
        </Row>
    </section>
};

BasketItems.propType = {
    basketItems: PropType.Array
}