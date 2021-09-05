import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './App.scss';
import { ProductList } from './components/products/productList';
import { ProductsProvider } from './context/products';
import logo from './vitl_logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BasketProvider } from './context/basket';
import { BasketList } from './components/basket/basketList';

function App() {
    return <>
        <Nav className={'App--Header justify-content-between p-2'}>
            &nbsp;
            <img src={logo} className={'App--Header--Logo'} />
            &nbsp;
        </Nav>
        <Container>
            <ProductsProvider>
                <BasketProvider>
                    <BasketList />
                    <ProductList />
                </BasketProvider>
            </ProductsProvider>
        </Container>
    </>;
}

export default App;
