import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Ping from "./Ping/Ping";
import Admin from "./Admin/Admin";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import Vault from "./Components/Vault/Vault";
import CheckoutForm from "./Components/CheckoutForm";
import Signup from "./Components/SignUp/index";
import Plaid from "./Components/Plaid/index";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  const loggedIn = sessionStorage.getItem('isLoggedIn')
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/profile"
          render={props =>
            !loggedIn ? (
              <Redirect to="/home" />
            ) : (
                <Profile auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/ping"
          render={props =>
            !loggedIn ? (
              <Redirect to="/home" />
            ) : (
                <Ping auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/vault"
          render={props =>
            !loggedIn ? (
              <Redirect to="/home" />
            ) : (
                <Vault auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/payment"
          render={props =>
            loggedIn ? (
              <Redirect to="/vault" />
            ) : (
                <CheckoutForm auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/plaid"
          render={props =>
            !loggedIn ? (
              <Redirect to="/home" />
            ) : (
                <Plaid auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/signup"
          render={props =>
            !loggedIn ? (
              <Redirect to="/Vault" />
            ) : (
                <Signup auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/admin"
          render={props =>
            !loggedIn ||
              !auth.userHasScopes(["write:messages"]) ? (
                <Redirect to="/home" />
              ) : (
                <Admin auth={auth} {...props} />
              )
          }
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
