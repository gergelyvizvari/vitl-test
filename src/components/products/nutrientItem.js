import React from 'react';
import { useNutrient } from '../../hook/nutrient';

export const NutrientItem = ({ nutrient }) => {
    const nutrientText = useNutrient();

    return <div className={'d-flex justify-content-between'}>
        <div>{nutrient.id}</div>
        <div>{nutrientText(nutrient.amount, nutrient.id)}</div>
    </div>;
}