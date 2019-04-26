var request = require("request");
var axios = require('axios')
var path = require('path')
require('dotenv').config({ path: '../.env' })

var AUTH0_API_CLIENT_ID = process.env.AUTH0_API_CLIENT_ID
var AUTH0_API_CLIENT_SECRET = process.env.AUTH0_API_CLIENT_SECRET

    function getAuth0Token(AuthAPICall) {
        var options = {
            method: 'POST',
            url: 'https://getpennywise.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body:
            {
                grant_type: 'client_credentials',
                client_id: AUTH0_API_CLIENT_ID,
                client_secret: AUTH0_API_CLIENT_SECRET,
                audience: 'https://getpennywise.auth0.com/api/v2/'
            },
            json: true
        };
        
        //attempting to change the auth0 given code to get the authToken to axios
        // so I can have these functions 
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body.access_token);
            AuthAPICall(body.access_token)
        });

        // axios(
        //     options
        // ).then(function(resp){
        //     console.log(resp)
        //     var authToken = resp.access_token
        //     console.log(authToken)
        // }).catch(function(err){
        //     console.log(`auth0 token retrieve failed, ${err}`)
        // });
    }
    function AuthAPICall (authToken) {
        console.log(authToken)
        var request = require("request");

        var options = {
            method: 'GET',
            url: 'https://getpennywise.auth0.com/api/v2/users/google-oauth2|106745656809552648524',
            headers:
            {
                authorization: `Bearer ${authToken}`,
                'content-type': 'application/json'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log("email: ", body.email);
        });
    }
    // getAuth0Token(AuthAPICall)
    module.exports = {}