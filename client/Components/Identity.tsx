import * as React from "react"
import * as Oidc from "oidc-client"

import { AccountService } from "../Services/AccountService"

export class Account extends React.Component<{}, {user: Oidc.User}> {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            user: null
        };

    }

    handleLogin() {
        AccountService.login();
    }

    handleLogout() {
        AccountService.logout();
    }

    handleRegister() {
        window.location.replace("/account/register");
    }

    componentDidMount() {
        AccountService.manager.getUser().then((user) => this.setState({ user: user }));
        AccountService.manager.events.addUserLoaded((user) => this.setState({ user: user }));
    }


    render() {
        var toggleStyle = {
            color: "white",
            textDecoration: "none"
        };
        var accountMenuStyle = {
            marginTop: 8,
            left: -15,
            opacity: 0.75,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#292b2c",
            color: "white",
            borderTop: "none"
        };
        var userMenuStyle = {
            marginTop: 8,
            left: -35,
            opacity: 0.75,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#292b2c",
            color: "white",
            borderTop: "none",
            minWidth: 100
        };
        var linkStyle = {
            display: "inline-block",
            width: "100%",
            height: "100%",
            padding: 5

        };
        if (this.state.user !== null)
            return (
                <div className="dropdown">
                    <a className="navbar-text dropdown-toggle" data-toggle="dropdown" href="#" style={toggleStyle}>{this.state.user.profile.name}</a>
                    <div className="dropdown-menu" style={accountMenuStyle}>
                        <a onClick={this.handleLogout} style={linkStyle}>Logout</a>
                    </div>
                </div>    
            );
        else
            return (
                <div className="dropdown">
                    <a className="navbar-text dropdown-toggle" data-toggle="dropdown" href="#" style={toggleStyle}><span className="fa fa-user fa-2x"></span></a>
                    <div className="dropdown-menu" style={userMenuStyle}>
                        <a onClick={this.handleLogin} style={linkStyle}>Login</a>
                        <a onClick={this.handleRegister} style={linkStyle}>Register</a>
                    </div>
                </div>
            );
    }
}
