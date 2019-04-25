const acctMgmt = require("../controllers/auth0-acct-mgmt")

module.exports = function (app) {
//get user id from react auth0 after login successful
    app.post("/authAPI", (req, res) => {

        user_id = req.body
        // console.log(user_id)       
        // console.log('6', acctMgmt)
        // let APIcall = acctMgmt.AuthAPICall(token)
        // acctMgmt.AuthAPICall(authToken)
        res.send(`user id obtained, ${user_id}`)
    });

}
