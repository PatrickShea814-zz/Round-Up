import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLogo from '../../Images/navlogo.png';
import "./MainNav.css";

class MainNav extends Component {

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
            <Navbar container-fluid>
                <Navbar.Header id="navHeader">
                    <Navbar.Brand>
                        {<img id="logo" className="logo" src={NavLogo} alt="PennyWise Logo" />}
                    </Navbar.Brand>
                    <Button
                        bsStyle="primary"
                        className="navBtn btn-margin"
                        onClick={this.goTo.bind(this, "home")}
                    >
                        Home
                        </Button>
                    <Button
                        bsStyle="primary"
                        className="navBtn btn-margin"
                        onClick={this.goTo.bind(this, "home")}
                    >
                        About Us
                        </Button>
                    <Button
                        bsStyle="primary"
                        className="navBtn btn-margin"
                        onClick={this.goTo.bind(this, "home")}
                    >
                        Contact
                        </Button>
                    {!isAuthenticated() && (
                        <Button
                            id="qsLoginBtn"
                            bsStyle="primary"
                            className="btn logSign"
                            onClick={this.login.bind(this)}
                        >
                            Log In / Sign Up! <FontAwesomeIcon icon="chevron-right" />
                        </Button>
                    )}
                    {isAuthenticated() && (
                        <Button
                            bsStyle="primary"
                            className="navBtn btn-margin"
                            onClick={this.goTo.bind(this, "masonry")}
                        >
                            My Wish List
                        </Button>
                    )}
                    {isAuthenticated() && (
                        <Button
                            bsStyle="primary"
                            className="navBtn btn-margin"
                            onClick={this.goTo.bind(this, "profile")}
                        >
                            Profile & Settings
                        </Button>
                    )}
                    {isAuthenticated() && userHasScopes(["write:messages"]) && (
                        <Button
                            bsStyle="primary"
                            className="navBtn btn-margin"
                            onClick={this.goTo.bind(this, "admin")}
                        >
                            Admin
                        </Button>
                    )}
                    {isAuthenticated() && (
                        <Button
                            id="qsLogoutBtn"
                            bsStyle="primary"
                            className="btn logSign"
                            onClick={this.logout.bind(this)}
                        >
                            Log Out
                        </Button>
                    )}
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default MainNav;
