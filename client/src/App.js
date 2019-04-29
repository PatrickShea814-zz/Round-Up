import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import NavLogo from './Images/navlogo.png'
import Masonry from './Components/WishListDash/Masonry'
import "./App.css";
import "./Components/WishListDash/WishList.css";

let brakePoints = [350, 500, 750];
let images = [];
const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643];
for (let i = 0; i < imgId.length; i++) {
  const ih = 200 + Math.floor(Math.random() * 10) * 15;
  images.push("https://unsplash.it/250/" + ih + "?image=" + imgId[i]);
}

class App extends Component {
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
              {<img className="logo" src={NavLogo} alt="PennyWise Logo" />}
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="navBtn btn"
              onClick={this.goTo.bind(this, "home")}
            >
              Home
            </Button>
            <Button
              bsStyle="primary"
              className="navBtn btn"
              onClick={this.goTo.bind(this, "home")}
            >
              About Us
            </Button>
            <Button
              bsStyle="primary"
              className="navBtn btn"
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
                Log In / Sign Up! 
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="navBtn btn"
                onClick={this.goTo.bind(this, "vault")}
              >
                My Wish List
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="navBtn btn"
                onClick={this.goTo.bind(this, "profile")}
              >
                Profile & Settings
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="navBtn btn"
                onClick={this.goTo.bind(this, "ping")}
              >
                Ping
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="navBtn btn"
                onClick={this.goTo.bind(this, "signup")}
              >
                Sign Up
              </Button>
            )}
            {isAuthenticated() && userHasScopes(["write:messages"]) && (
              <Button
                bsStyle="primary"
                className="navBtn btn"
                onClick={this.goTo.bind(this, "admin")}
              >
                Admin
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                id="qsLogoutBtn"
                bsStyle="primary"
                className="btn logOut"
                onClick={this.logout.bind(this)}
              ><span>Log Out</span>
              </Button>
            )}
          </Navbar.Header>
        </Navbar>
        {isAuthenticated() && (
          <Masonry images={images} brakePoints={brakePoints} />
        )}
      </div>
    );
  }
}

export default App;
