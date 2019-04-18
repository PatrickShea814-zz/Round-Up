var request = require("request");

function getAuth0Token(AuthAPICall) {
    var authToken = "";
    var options = { method: 'POST',
    url: 'https://getpennywise.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: 
    { grant_type: 'client_credentials',
        client_id: 'jPpC5RW9l1lmGY2xcxoR5y7T6m7MQZLX',
        client_secret: 'gMa_5i79fcuF10n-eWGIEneBQrP-IYrO2vIIyv30wxajlZ8GM8ewpVOYf4V53flr',
        audience: 'https://getpennywise.auth0.com/api/v2/' },
    json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    authToken = body.access_token
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