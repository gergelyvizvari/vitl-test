import React, { useContext } from 'react';
import { ProductsContext } from '../../context/products';

export const NutrientItem = ({ nutrient }) => {
    const { findUnit } = useContext(ProductsContext);
    return <div className={'d-flex justify-content-between'}>
        <div>{nutrient.id}</div>
        <div>{nutrient.amount}<small>{findUnit(nutrient.id)}</small></div>
    </div>;
}