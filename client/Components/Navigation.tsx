import * as React from "react"
import { Link } from "react-router"

import { Account } from "./Identity"

export class NavBar extends React.Component<{ title: string, contact?: string}, {}> {
    render() {
        var style = {
            color: "white",
            position: "fixed",
            width: "100%",
            minWidth: 360,
            zIndex: 10000,
            padding: "5px 10px"
        };

        var linkStyle = {
            color: "white"
        };

        return (
            <nav className="navbar navbar-toggleable-sm navbar-fixed-top navbar-dark bg-inverse navbar-expanded" style={style}>
                <div className="container" style={{ width: "100%" }}>
                    <div className="navbar-header" style={{ display: "inline-block" }}><a className="navbar-brand" href="/portfolio" style={linkStyle}>{this.props.title}</a></div>
                    <div className="container-fluid">
                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav mr-auto hidden-xs-down">{this.props.children}</ul>
                        </div>
                    </div>
                    <div className="navbar-text" style={{ padding: 0 }}>
                        <a href={"mailto:" + this.props.contact} style={linkStyle}>{this.props.contact}</a>
                    </div>
                    <OverlayMenu>{this.props.children}</OverlayMenu>
                </div>
            </nav>
         );
    }
}

export class NavLink extends React.Component<{ link: string, title: string, event?: string }, {}> {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.event !== undefined) {
            $(window).trigger(this.props.event);
        }
    }
    render() {
        var elementStyle = {
            padding: "0 15px"
        };
        var linkStyle = {
            color: "white"
        };
        return (
            <li id={this.props.title + "-link"} className="nav-item" style={elementStyle}><Link className="nav-link" to={this.props.link} style={linkStyle} onClick={this.handleClick}>{this.props.title}</Link></li>
         );
    }
}


export class OverlayMenu extends React.Component<{}, {}> {
    closeMenu(e) {
        document.getElementById("overlayMenu").style.display = "none";
        document.getElementsByTagName("body")[0].style.position = "static"; 
    }

    render() {
        var menuStyle = {
            height: "100vh",
            width: "100vw",
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            overflowX: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            transition: "0.5s",
            display: "none"
        };

        var contentStyle = {
            position: "relative",
            top: "25%",
            width: "100%",
            textAlign: "center"
        };

        var listStyle = {
            listStyle: "none",
            fontSize: "3em",
            padding: 0
        };

        var linkStyle = {
            display: "block",
            textDecoration: "none",
            fontSize: 36,
            color: "#818181",
            padding: 10,
            transition: "0.3s"
        };

        var closeButtonStyle = {
            position: "absolute",
            top: 20,
            right: 45,
            fontSize: 60,
            cursor: "pointer"
        };

        return (
            <div style={{ display: "inline-block", float: "right", marginTop: -25 }}>
                <MenuToggleButton />
                <div id="overlayMenu" style={menuStyle}>
                    <a style={closeButtonStyle} onClick={this.closeMenu}>&times;</a>
                    <nav style={contentStyle}>
                        <ul style={listStyle} onClick={this.closeMenu} > { this.props.children }</ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export class MenuToggleButton extends React.Component<{}, {}> {
    handleToggleMenu() {
        document.getElementById("overlayMenu").style.display = "block"
        document.getElementsByTagName("body")[0].style.position = "fixed"; 
    }

    render() {
        return (
            <button type="button" className="navbar-toggler hidden-md-up float-right" onClick={this.handleToggleMenu} style={{ cursor: "pointer" }}>
                <span className="fa fa-bars fa-2x" style={{ color: "white" }}></span>
                <span className="sr-only">Toggle navigation</span>
            </button>
        )
    }
}