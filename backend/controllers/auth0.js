var request = require("request");
var path = require("path")
// require('dotenv').config();
require('dotenv').config({ path: '../.env' })

var AUTH0_API_CLIENT_ID = process.env.AUTH0_API_CLIENT_ID
var AUTH0_API_CLIENT_SECRET = process.env.AUTH0_API_CLIENT_SECRET

function getAuth0Token(AuthAPICall) {
    var authToken = "";
    var options = { method: 'POST',
    url: 'https://getpennywise.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: 
    { grant_type: 'client_credentials',
        client_id: AUTH0_API_CLIENT_ID,
        client_secret: AUTH0_API_CLIENT_SECRET,
        audience: 'https://getpennywise.auth0.com/api/v2/' },
    json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    authToken = body.access_token
    // console.log(body)
    AuthAPICall(authToken)
    });
}

function AuthAPICall(authToken) {
    var request = require("request");
    
    var options = { method: 'GET',
    url: 'https://getpennywise.auth0.com/api/v2/users/google-oauth2%7C106745656809552648524',
    headers: 
    { authorization: `Bearer ${authToken}`,
    'content-type': 'application/json' } };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        console.log(body);
    });
}

getAuth0Token(AuthAPICall)