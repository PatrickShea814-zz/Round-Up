// REQUIRING OUR MODELS
var db = require("../models");

module.exports = function (app) {
    app.delete('/accounts/:id', function (request, response, next) {
        let deleteAccount = req.params.id;
        client.getAccounts(ACCESS_TOKEN, function (error, accountsResponse) {
            if (error != null) {
                prettyPrintResponse(error);
                return response.json({
                    error: error,
                });
            }
            db.PlaidUserAccounts.findOneAndDelete(
                { account_id: deleteAccount }
            );
            db.User.plaidAccounts.account_id.findOneAndDelete(
                { account_id: deleteAccount }
            );
            prettyPrintResponse(accountsResponse);
            response.json({ error: null, accounts: accountsResponse });
        });
    });

    app.delete('/items/:id', function (request, response, next) {
        let deleteItem = req.params.id;
        client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
            if (error != null) {
                prettyPrintResponse(error);
                return response.json({
                    error: error
                });
            }
            db.PlaidItems.findOneAndDelete(
                { itemID: deleteItem }
            );
            db.User.findOneAndDelete(
                { "plaidItems.itemID": deleteItem }
            );
            prettyPrintResponse(itemResponse);
            response.json({ error: null, accounts: itemResponse });
        });
    });

    app.get('/transactions/:id', function (request, response, next) {
        let accountTransactions = req.params.id
        // Pull transactions for the Item for the last 30 days
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        db.StripeDepos.find({ $and: [{ account_id: accountTransactions }, { dateCompleted: { $gte: startDate } }] });
    });
}
