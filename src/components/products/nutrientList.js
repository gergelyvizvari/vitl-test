import React from 'react';
import PropTypes from 'prop-types';
import { NutrientItem } from './nutrientItem';

export const NutrientList = ({ nutrients }) => {
    return nutrients.map(nutrient => <NutrientItem key={`${nutrient.id}`} nutrient={nutrient} />);
};

NutrientList.propTypes = {
    nutrients: PropTypes.array
}