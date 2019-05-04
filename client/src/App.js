import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import NavLogo from './Images/navlogo.png'
import Masonry from './Components/WishListDash/Masonry'
import "./App.css";
import "./Components/WishListDash/WishList.css";
import MainNav from "./Components/MainNav/MainNav";



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

    return (
      <div>
        <Navbar container-fluid>
          <Navbar.Header id="navHeader">
            <Navbar.Brand>
            </Navbar.Brand>
            <MainNav auth={this.props.auth} history={this.props.history} />
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
