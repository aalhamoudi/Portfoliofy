import * as React from "react";
import * as ReactDOM from "react-dom"
import * as Oidc from "oidc-client"
import $ from "jquery"

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

import { Card, Row, Column } from "../Components/Primitives"
import { ScrollingArea, View, Section, Header, Footer, Journal, Article } from "../Components/Content"
import { NavBar, NavLink } from "../Components/Navigation"
import { ResponsiveImage } from "../Components/Media"

import { IntroView } from "../Views/IntroView"
import { AboutView } from "../Views/AboutView"
import { ProjectsView } from "../Views/ProjectsView"

import * as Content from "../Components/Content";

import Owner from "../Models/Owner"

import { getOwner } from "../Services/JSONService"
import { AccountService } from "../Services/AccountService"

export class PortfolioArea extends React.Component<{}, { owner: Owner }> {
    constructor() {
        super();
        this.state = {
            owner: getOwner()
        };
    }

    render() {
        return (
            <ScrollingArea path="">
                <NavBar title={this.state.owner.name} contact={this.state.owner.email} >
                    <NavLink link="/" title="Intro" />
                    <NavLink link="/about" title="About" />
                    <NavLink link="/projects" title="Projects" />
                </NavBar>
                {this.props.children}
            </ScrollingArea>
        );
    }
}

export class Callback extends React.Component<{}, {}> {
    constructor() {
        super();
        AccountService.manager.signinRedirectCallback().then((user) => {
            browserHistory.replace("/");
        });

    }

    render() {
        return (
            <div></div>
        );
    }
}

export default
    <Route path="/" component={PortfolioArea}>
        <IndexRoute component={IntroView} />
        <Route path="about" component={AboutView} />
        <Route path="projects" component={ProjectsView} />
        <Route path="callback" component={Callback} />
    </Route>



// Allow Hot Module Reloading
declare var module: any;
if (module.hot) {
    module.hot.accept();
}
