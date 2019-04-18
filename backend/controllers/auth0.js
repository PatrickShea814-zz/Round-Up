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
    AuthAPICall()
    });
}

// function AuthAPICall() {
    var request = require("request");
    
    var options = { method: 'GET',
    url: 'https://getpennywise.auth0.com/api/v2/users/google-oauth2%7C106745656809552648524',
    headers: 
    { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1Ua3dSamxHTnpGR1JEWTBORGs1TkVKRk1EWTVNVFpFTWpBNVFUa3lNREE0T1RNeVFqUkVRZyJ9.eyJpc3MiOiJodHRwczovL2dldHBlbm55d2lzZS5hdXRoMC5jb20vIiwic3ViIjoialBwQzVSVzlsMWxtR1kyeGN4b1I1eTdUNm03TVFaTFhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZ2V0cGVubnl3aXNlLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTU1NTUzNTU3LCJleHAiOjE1NTU2Mzk5NTcsImF6cCI6ImpQcEM1Ulc5bDFsbUdZMnhjeG9SNXk3VDZtN01RWkxYIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RXmjD3GQXXNNsTxtpCD1WXQIC2idy8HBPgtJl2zI4sWufxG3Nndbg0lIB5nneJYN7b77QTO0Q9suGAUVyMiGsQxTW1N1hcYfGYo6pNz9g6gH9PAZUscRJySnAUeY3kn3ppEd1yBjUgsihTzwiDIL-hoTe4WtDMvmbU94eZN_TDWTA4tYeK60_WtNT9wqD2FZW_7aOMcLJ45CrETsH-a_TrFJypGLgTyZ-pDcxPW6ItvV-1akRKfWoNkab1vqTZ3X-CvGAWepuj-nObWxFUrPOaFCQTsvbbkH0003w2U-I9400CuoXCMYJDbi0rbrhTC514yDhotjOaHvv5Xf09stSQ',
    'content-type': 'application/json' } };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        console.log(body);
    });
// }

// getAuth0Token(AuthAPICall)