import React, { useContext } from 'react';
import { BasketCard } from './basketCard';
import PropType from 'prop-types';
import { Row, Col, Alert } from 'react-bootstrap';
import { BasketContext } from '../../context/basket';
import { Button } from 'react-bootstrap';
import { useCurrency } from '../../hook/currency';
import { ProductsContext } from '../../context/products';

const BasketItems = ({ basketItems }) => {
    return basketItems.map(basketItem => {
        return <Col xs={12} sm={6} md={4} lg={3} key={basketItem.name} className={'p-3'}>
            <BasketCard basketItem={basketItem} />
        </Col>
    });
};

export const BasketList = () => {
    const { basketItems, getTotalPriceAndItems, errors } = useContext(BasketContext);
    const { loaded } = useContext(ProductsContext);
    const { total, amount } = getTotalPriceAndItems();
    const currency = useCurrency();

    const hasItems = basketItems.length > 0;

    if (!loaded) {
        return null;
    }

    // Show errors (exceeded nutrient amount)
    const Errors = () => {
        if (errors.length == 0) return null;

        return <div className={'fixed-top d-flex flex-column align-items-center mt-2'}>
            {errors.map((error, ind) => <Alert key={ind} variant={'info'} className={'flex-1 w-75'}>{error}</Alert>)}
        </div>
    }

    return <section className={'mt-2'}>
        <Errors />
        <h2>Basket
            {hasItems && <>
                <small className={'mx-2'}>({amount} items {currency(total)})</small>
                <Button>Checkout</Button>
            </>}
        </h2>

        <Row>
            {!hasItems && <Col>The Basket is empty</Col>}
            {hasItems && <BasketItems basketItems={basketItems} />}
        </Row>
    </section>
};

BasketItems.propType = {
    basketItems: PropType.Array
}