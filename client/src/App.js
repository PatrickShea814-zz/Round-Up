import React, { Component } from "react";
import Auth  from './Auth/Auth';
import History from './history';
import './Components/DarkMode/styles.scss';
import './App.scss';
import Header from './Components/Landing/Header/Header';
import Footer from './Components/Landing/Footer/Footer';

class App extends Component {
  
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
