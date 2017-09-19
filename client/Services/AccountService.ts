import * as Oidc from "oidc-client"

import { User } from "../Models/User"


export class AccountService {
    static url = "http://localhost:5000/";

    static config = {
        authority: "http://localhost:5000/",
        client_id: "portfolio",
        redirect_uri: "http://localhost:5000/portfolio/callback",
        popup_redirect_uri: "http://localhost:5000/portfolio/callback",
        silent_redirect_uri: "http://localhost:5000/portfolio/callback",
        response_type: "id_token token",
        scope: "openid profile email api",
        post_logout_redirect_uri: "http://localhost:5000/portfolio/"
    };

    static manager: Oidc.UserManager = new Oidc.UserManager(AccountService.config);
    static user: Oidc.User;

    static login() {
        AccountService.manager.signinRedirect();

    }

    static callback() {
        AccountService.manager.signinRedirectCallback();
    }

    static silentLogin() {
        AccountService.manager.signinSilent().then((user) => AccountService.user = user);
        AccountService.manager.signinSilentCallback();

    }


    static logout() {
        AccountService.manager.signoutRedirect();
    }

}