import React, { Component } from "react";
import Auth  from './Auth/Auth';
import History from './history';
import './Components/DarkMode/styles.scss';
import './App.scss';
import Header from './Components/Landing/Header/Header';
import Footer from './Components/Landing/Footer/Footer';
import MainNav from './Components/MainNav/MainNav';

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
  
  render(){

    const { isAuthenticated } = this.props.auth;
    
      return (
        <div className="App">
          {isAuthenticated() && (
            <MainNav auth={this.props.auth} {...this.props} />
          )}
          {!isAuthenticated() && (
            <Header {...this.props} />
          )}
          <Footer />
        </div>
      )
    }
  }

export default App;
