import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';
import axios from "axios";

export default class Auth {

  accessToken;
  idToken;
  expiresAt;
  userProfile;
  scopes;
  requestedScopes = 'openid profile read:messages write:messages';


  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: this.requestedScopes,
    avatar: null
  });


  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.userHasScopes = this.userHasScopes.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.getProfile(function(err, res){
          err ? console.log(err) : console.log('This is what I have', res)
        });
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    sessionStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    sessionStorage.setItem('accessToken', this.accessToken)
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Set the users scopes
    this.scopes = authResult.scope || this.requestedScopes || '';

    // navigate to the home route
    history.replace('/masonry');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
         this.getProfile();
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  getProfile(cb) {
    const accessToken = sessionStorage.getItem('accessToken');
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        var user_id = profile.sub;
        sessionStorage.setItem('user_id', user_id)

        //axios request sends user id to backend needed to call
        // auth0 management API to get user information such as email
        axios.request({
          method: "POST",
          url: "/api/authAPI",
          data: {user_id}

        }).then( (res) => {console.log("userID post success", res.data)
          if(!res.data.existingUser){
            console.log('This user must first register with Plaid.')
            sessionStorage.setItem('existingUser', false)
            history.replace('/plaid')
          }
          else {
            console.log('This should already be registered with Plaid.')
            sessionStorage.setItem('existingUser',true)
            history.replace('/masonry')
          }
        }).catch( (err) => {console.log("userID post failed", err)})
      }
      cb(err, profile);
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user scopes
    this.scopes = null;

    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    sessionStorage.removeItem('IsLoggedIn');

    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  userHasScopes(scopes) {
    const grantedScopes = this.scopes.split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}