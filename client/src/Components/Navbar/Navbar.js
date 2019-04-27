import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavbarHome extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`);
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    componentDidMount() {
        const { renewSession } = this.props.auth;

        if (localStorage.getItem("isLoggedIn") === "true") {
            renewSession();
        }
    }

    render() {
        const { isAuthenticated, userHasScopes } = this.props.auth;

        return (
            <div>
                <Navbar container-fluid>
                    <Navbar.Header id="navHeader">
                        <Navbar.Brand>
                            {<img className="logo" src="../public/navlogo.png" alt="PennyWiseLogo" />}
                        </Navbar.Brand>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, "home")}
                        >
                            Home
              </Button>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, "home")}
                        >
                            About Us
              </Button>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, "home")}
                        >
                            Contact
              </Button>
                        {!isAuthenticated() && (
                            <Button
                                id="qsLoginBtn"
                                bsStyle="primary"
                                className="btn btn-outline"
                                onClick={this.login.bind(this)}
                            >
                                Log In / Sign Up! <FontAwesomeIcon icon="chevron-right" />
                            </Button>
                        )}
                        {isAuthenticated() && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.goTo.bind(this, "vault")}
                            >
                                My Wish List
                </Button>
                        )}
                        {isAuthenticated() && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.goTo.bind(this, "profile")}
                            >
                                Profile & Settings
                </Button>
                        )}
                        {isAuthenticated() && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.goTo.bind(this, "ping")}
                            >
                                Ping
                </Button>
                        )}
                        {isAuthenticated() && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.goTo.bind(this, "signup")}
                            >
                                Sign Up
                </Button>
                        )}
                        {isAuthenticated() && userHasScopes(["write:messages"]) && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.goTo.bind(this, "admin")}
                            >
                                Admin
                </Button>
                        )}
                        {isAuthenticated() && (
                            <Button
                                id="qsLogoutBtn"
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.logout.bind(this)}
                            >
                                Log Out
                </Button>
                        )}
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}


export default NavbarHome;