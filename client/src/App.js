import React, { Component } from "react";
import Auth  from './Auth/Auth';
import History from './history';
import './Components/DarkMode/styles.scss';
import './App.scss';
import Header from './Components/Landing/Header/Header';
import Footer from './Components/Landing/Footer/Footer';

class App extends Component {
  
  state = {
    existingUser: 'false',
    publicKey: ''
  }

  goTo(route) {
    History.replace(`/${route}`);
  }

  login() {
    Auth.login();
  }

  logout() {
    Auth.logout();
  }

  getProfile(){
    Auth.getProfile()
  }
  
render(){
  
  return (
    <div className="App">
      <Header {...this.props} />
      <Footer />
    </div>
  )
  }
}

export default App;
