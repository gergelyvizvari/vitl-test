import React from 'react';
import { NutrientItem } from './nutrientItem';

export const NutrientList = ({ nutrients }) => {
    return nutrients.map(nutrient => <NutrientItem key={`${nutrient.id}`} nutrient={nutrient} />);
};