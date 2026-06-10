import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { OuterStack } from './components/OuterStack';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <OuterStack />
        <Footer />
    </React.StrictMode>,
    document.getElementById('root'),
);
