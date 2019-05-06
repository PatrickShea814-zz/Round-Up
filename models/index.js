module.exports = {
    // Model for User's individual Accounts(checking, savings, etc.) within an Item(Institution)
    PlaidUserAccounts: require("./plaidAccounts"),
    // THIS MODEL IS NOT FOR PRODUCTION AND IS ONLY FOR TESTING PURPOSES. WE DO NOT WANT TO STORE THIS INFORMATION
    // Model for Bank Information for ACH Authorization 
    PlaidACHAuth: require("./plaidACHAuth"),
    // Model for User's Items(Institutions)
    PlaidItems: require("./plaidItems"),
    // Model for storing the values of rounded up transactions for Stripe to access.
    RoundedTrans: require("./roundedTrans"),
    // Model for storing the Stripe Customer Object.
    StripeCustomer: require("./stripeCustomer"),
    // Model for completed Stripe ACH Charges
    StripeDepos: require("./stripeDeposits"),
    // Model for the User Profile.
    User: require("./userProfile"),
    // Model for User's making withdrawals from their User Balance.
    StripeWithdrawal: require("./stripeWithdrawal"),
    // Model for a User's saved Wish List Items.
    WishItem: require("./wishItem")
}; 