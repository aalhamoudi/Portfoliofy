import './Styles/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.min.css'

import 'tether';
import 'jquery'
import 'bootstrap';
import 'animate.css'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

import PortfolioArea from './Areas/PortfolioArea';
import { loadData } from "./Services/JSONService"


loadData().then(() => {
    ReactDOM.render(
        <Router history={browserHistory} children={ PortfolioArea } />,
        document.getElementById('app')
    );
});