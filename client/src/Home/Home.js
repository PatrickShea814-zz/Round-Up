import React, { Component } from 'react';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container text-center">
        {
          isAuthenticated() && (
              <h4>
                You are logged in! Spanky
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a href="http://localhost:3000/callback"
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
