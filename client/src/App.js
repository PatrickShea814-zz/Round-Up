import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import NavLogo from './Images/navlogo.png';
import Masonry from './Components/WishListDash/Masonry';
import Plaid from './Components/Plaid/index'
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

  state = {
    existingUser: 'false',
    publicKey: ''
  }

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

    axios.request({
      method: "POST",
      url: "/api/get_access_token",
      data: {
        public_token: token,
        account_id: metadata.account_id,
        accounts: metadata.accounts
      }
    }).then((res) => {
      console.log("Plaid post success", res.data)
      if (res.data.existingUser === true) {
        console.log('Plaid user = true');
        this.setState({existingUser: true});
        history.replace('/home')
      }
      else {
        console.log('Plaid user = false');
        history.replace('/plaid');
      }
    }).catch((err) => { console.log("userID post failed", err) });

    axios.request({
      method:"GET",
      url:"/api/updateUser"
    }).then(res => {
      console.log("updateUser Route Success = ", res.data)
    }).catch(err => { console.log("updateUser Route error", err) })
  }

  render() {
    const { isAuthenticated, userHasScopes } = this.props.auth;
    console.log("Hello World");
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
                onClick={this.goTo.bind(this, "plaid")}
              >
                Plaid
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
