// *****************************************************************************
// App.js - This file is the initial starting point for the Backend Node/Express server.
//
// ******************************************************************************
// *** DEPENDENCIES
// =============================================================
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var dotenv = require('dotenv').config();
if (process.env.NODE_ENV !== 'production') { var dotenv = require('dotenv').config() }
var indexRouter = require('./routes/index');
// Helmet helps you secure your Express apps by setting various HTTP headers.
const helmet = require('helmet');
const routes = require("./routes");
const cors = require('cors');


// REQUIRING OUR MODELS
const db = require("./models");


// SETS UP AND INITIALIZES THE EXPRESS APP 
// =============================================================
var app = express();
// ADD CORS acceptance
app.use(cors())

// CONFIGURE OUR MIDDLEWARE
// Use morgan logger for logging requests
app.use(logger('dev'));
// Sets ups the Express App to handle Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make Public our Static Directory
// app.use(express.static("public"));
app.use(cookieParser());
// Make Public our Static Directory
// app.use(express.static(path.join(__dirname, 'public')));
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());
// app.use(express.static(path.join(__dirname, "client", "build")))
// needed for heroku build deployment

if (process.env.NODE_ENV === "production") {
  console.log("production is running")
  app.use(express.static("./client/build"));
}

// ADD ROUTES
// app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ "error": "error" });
});


// CONFIGURE & CONNECT TO MONGODB/MONGOOSE DATABASE
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/roundUpDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
// Test UserId for Transactions Route
const userId = 'IggKjOZ4znfGIB2hKgxZ';

// PLAID USE STRICT
'use strict';

var util = require('util');

var envvar = require('envvar');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');

var APP_PORT = process.env.PORT || envvar.number('APP_PORT', 8034);
var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID', process.env.PLAID_CLIENT_ID);
var PLAID_SECRET = envvar.string('PLAID_SECRET', process.env.PLAID_SECRET);
var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY', process.env.PLAID_PUBLIC_KEY);
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');
var STRIPE_ENV = process.env.STRIPE_KEY;
const stripe = require('stripe')(STRIPE_ENV);

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
var PLAID_PRODUCTS = envvar.string('PLAID_PRODUCTS', 'transactions');

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = 'access-sandbox-5fde0079-29a3-40ac-b254-1814eb75a629';
var PUBLIC_TOKEN;
var ITEM_ID;
var ACCOUNT_ID;
var AUTH0_ID;
var ACCOUNTS;

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: '2018-05-22' }
);

let TonyDang = {
  email: 'TonyDang@gmail.com',
  password: 'Password',
  _id: 'AeR5A1#@ed'
}

var app = express();
// app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
function pseries(list) {
  var p = Promise.resolve();
  return list.reduce(function (pacc, fn) {
    return pacc = pacc.then(fn);
  }, p);
}

async function accountCreator(res, accessToken, accts) {

  let arr = [];
  console.log("ACCOUNTS = ", accts);
  for (let i = 0; i < accts.length; i++) {

    if (accts[i].subtype === 'checking') { 
      
      let accounts = await db.PlaidUserAccounts.create({
        userID: res._id,
        accessToken: accessToken,
        account_id: accts[i].id,
        stripeToken: await client.createStripeToken(ACCESS_TOKEN, accts[i].id).then(res => {return res.stripe_bank_account_token}),
        accountName: accts[i].name,
        mask: accts[i].mask,
        type: accts[i].type,
        subtype: accts[i].subtype,
      })
      arr.push(accounts);
    }
  }
  return arr;
}

async function StripeTokenCreator (accToken, accId){

    let asyncStripe = await client.createStripeToken(accToken, accId)

    return asyncStripe
  }

async function TransactionFinder (user, trns){

  const transactionsArray = [];

  for (let i = 0; i < trns.transactions.length; i++) {

    let toBeRounded = Math.ceil(trns.transactions[i].amount) - trns.transactions[i].amount;

    if (toBeRounded === 0){
      toBeRounded = 1;
    }
    
    let getTransactions = await db.RoundedTrans.create({
      userID: user._id,
      account_id: trns.transactions[i].account_id,
      date: trns.transactions[i].date,
      transactionName: trns.transactions[i].name,
      originalAmount: trns.transactions[i].amount,
      currencyCode: trns.transactions[i].iso_currency_code,
      category: trns.transactions[i].category,
      roundedAmount: toBeRounded,
      transaction_id: trns.transactions[i].transaction_id,
      transactionDate: trns.transactions[i].date
    })
    
    transactionsArray.push(getTransactions)
  }

  return transactionsArray
}

async function StripeCharger (customer, charges, accounts){

  for (let i = 0; i < charges.length; i++){
    
  }
}

app.get('/', function (request, response, next) {
  // TEST HOME FRONT END PLAID LINK BUTTON FILE
  response.sendFile(path.join(__dirname, 'index.html'), {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
    PLAID_PRODUCTS: PLAID_PRODUCTS,
  });
});

app.get('/api/getPublicKey', function(request, response, next){
  response.json({"PLAID_PUBLIC_KEY": PLAID_PUBLIC_KEY})
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/api/get_access_token', function (request, response, next) {
  console.log("Req.body = ", request.body);
  PUBLIC_TOKEN = request.body.public_token;
  ACCOUNTS = request.body.accounts;
  console.log('ACCOUNTS = ', ACCOUNTS);
  ACCOUNT_ID = request.body.account_id;

  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    prettyPrintResponse(tokenResponse);
    console.log("Token response = ", tokenResponse);
    return response.json(tokenResponse);
  });
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get('/api/transactions/:id', function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  AUTH0_ID = request.params.id;
  var startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions('access-sandbox-50a1b97f-71aa-4e07-86ca-b303e76bb0de', startDate, endDate, {
    count: 10,
    offset: 0,
  }, function (error, transactionsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    } else {
      
      let USER = () => {
        return Promise.resolve(db.User.findOne({auth0_ID: AUTH0_ID})
          .then(res => {
            if (res){return res}
            else return "NO USER FOUND";
          }))
      }

      async function TransactionFunction(user) {

        let transactions = await TransactionFinder(user, transactionsResponse);

        return [user, transactions]
      }

      async function StripeCharger(res){
        
        let id = await res[0]._id;
        
        let transactions = await res[1];

        let stripeCus = await db.StripeCustomer.findOne({userId: id}).then(strCust => {return strCust});
      
        let chargesArray = [];
        let chargeNamesArray = [];
        let sum = 0;

        for (let i = 0; i < transactions.length; i++){
          sum += parseInt(transactions[i].roundedAmount)
          chargesArray.push(transactions[i].transaction_id)
          chargeNamesArray.push(transactions[i].transactionName)
        }

        console.log('STRIPE CUSTOMER', stripeCus)

          let charges = await stripe.charges.create({
            amount: sum * 100,
            currency: 'usd',
            customer: stripeCus.stripeID,
          }).then(charge => {
            console.log('THIS IS OUR CHARGE:', charge);
            return charge
          })
        
        return [res[0], id, chargesArray, chargeNamesArray, charges, transactions]
      }

      async function DepoLogger(res){
        let user = res[0];
        let Depos =  await db.StripeDepos.create({
          userID: res[1],
          transactionNames: res[2],
          amountDeposited: res[4].amount/100,
          depositDate: res[4].created,
          TransactionId: res[4].id,
          originalTransIds: res[2],
        }).then(res => {return res})

        user.update({$push:{deposits: Depos}}).then(res => console.log(res));
        
        return [ res[4], res[5]];
    }


      pseries([USER, TransactionFunction, StripeCharger, DepoLogger,])
        .then(res => response.json(res))
        .catch(err => response.json(err))
      
    }
      
    })

  })
  

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
app.get('/identity', function (request, response, next) {
  client.getIdentity(ACCESS_TOKEN, function (error, identityResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(identityResponse);
    response.json({ error: null, identity: identityResponse });
  });
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
app.get('/auth', function (request, response, next) {
  client.getAuth(ACCESS_TOKEN, function (error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(authResponse);
    response.json({ error: null, auth: authResponse });
  });
});

var prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

// This is a helper function to poll for the completion of an Asset Report and
// then send it in the response to the client. Alternatively, you can provide a
// webhook in the `options` object in your `/asset_report/create` request to be
// notified when the Asset Report is finished being generated.
var respondWithAssetReport = (
  numRetriesRemaining,
  assetReportToken,
  client,
  response,
) => {
  if (numRetriesRemaining == 0) {
    return response.json({
      error: 'Timed out when polling for Asset Report',
    });
  }

  client.getAssetReport(
    assetReportToken,
    function (error, assetReportGetResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        if (error.error_code == 'PRODUCT_NOT_READY') {
          setTimeout(
            () => respondWithAssetReport(
              --numRetriesRemaining, assetReportToken, client, response),
            1000,
          );
          return
        }

        return response.json({
          error: error,
        });
      }

      client.getAssetReportPdf(
        assetReportToken,
        function (error, assetReportGetPdfResponse) {
          if (error != null) {
            return response.json({
              error: error,
            });
          }

          response.json({
            error: null,
            json: assetReportGetResponse.report,
            pdf: assetReportGetPdfResponse.buffer.toString('base64'),
          })
        },
      );
    },
  );
};

//Route Sign in user for new or returning user
// require("./routes/Auth0")(app)
app.post("/api/authAPI", async function( req, res) {
  AUTH0_ID = req.body.user_id;
  
  await db.User.findOne({
    auth0_ID: AUTH0_ID
  }).then(function(dbData){
    if (dbData) {
      console.log("i'm an existing user")
      res.json({
        'existingUser': true
      })
    } else {
      db.User.create({
        auth0_ID: AUTH0_ID
      }).then(user => console.log('This is our new user:', user))
      console.log("im a new user")
      res.json({
        'existingUser': false
      })
      // res.send("im a new user")
    }
  }).catch(function(err){
    console.log(`authAPI route err, ${err}`)
  });

});

app.get('/api/updateUser', function (request, response, next) {
  let arr = [];
  console.log("ACCOUNTS = ", ACCOUNTS);
  for (let i = 0; i < ACCOUNTS.length; i++){
    if (ACCOUNTS[i].subtype !== 'checking'){
      arr.push(ACCOUNTS[i])
    }
  }
  if (arr.length > 0){
    return response.json(arr)
  }
  client.getIdentity(ACCESS_TOKEN, function (error, identityResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    // Creates the user in our database.
    let NewUserCreator = () => {
      return Promise.resolve(db.User.findOne({
        auth0_ID: AUTH0_ID
      })
      )
    }
    async function NewUserPlaidItemCreator(res){

      console.log('Access Token', ACCESS_TOKEN);
      return Promise.resolve(db.PlaidItems.create({
        userID: res._id,
        institutionID: identityResponse.item.institution_id,
        accessToken: ACCESS_TOKEN,
        itemID: identityResponse.item.institution_id
      }))

    }

    let PlaidItemIntoUserModel = (res => {
     
      return Promise.resolve(
        db.User.findOneAndUpdate({ _id: res.userID }, { $push: { plaidItems: res } })
      )
    })

    let PlaidAccountsCreator = ((res) => {
      
      return Promise.resolve(
        accountCreator(res, ACCESS_TOKEN, ACCOUNTS)
      )
    })

    let PlaidAccountsIntoUserModel = (res => {
      return Promise.resolve(
        db.User.findOneAndUpdate({ _id: res[0].userID }, { $push: { plaidAccounts: res[0] } })
      )
    });

    async function TokenCreator(res) {

        let Tkn = await db.PlaidUserAccounts.find({ userID: res._id })
        
          return [res, Tkn]

        };
    
    async function StripeAccountCreator (res) {

      console.log(res);
      let USER = res[0];
      let strTok = res[1].stripeToken;


      let StripeCustomer = await stripe.customers.create({
          
          "source": 'btok_us_verified',

        })
      
      return [USER, StripeCustomer]
      /*
      return StripeCustomer //should be Promise
      */
    }
    /*
    let StripeAccount = StripeAccountCreator(res)
    StripeAcount.then((StripeCustomer) => {
      console.log(StripeCustomer)
    })
    */

    async function StripeDataCreator(res){
      let USER = res[0];
      
      let StrCust = res[1];

      let Customer = await db.StripeCustomer.create({
        userId: USER._id,
        stripeID: StrCust.id,
        stripeToken: 'btok_us_verified',
        created: StrCust.created,
        sourceURL: StrCust.sources.url,
        subscriptionsURL: StrCust.subscriptions.url
      })

      await USER.update({$push: {stripeCustomer: Customer}})

      let newUser = await db.User.findOne({_id: USER._id}).then(res => {return res});

      return [newUser, Customer]
    }


    let arr = [NewUserCreator, NewUserPlaidItemCreator, PlaidItemIntoUserModel, PlaidAccountsCreator, PlaidAccountsIntoUserModel, TokenCreator, StripeAccountCreator, StripeDataCreator];
    pseries(arr)
    .then(res => {
      response.json(res)
    })
    .catch(err => response.json(err));
  })

})



app.post('/set_access_token', function (request, response, next) {
  ACCESS_TOKEN = request.body.access_token;
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    response.json({
      item_id: itemResponse.item.item_id,
      error: false,
    });
  });
});

const PriceFinder = require('price-finder');
const priceFinder = new PriceFinder();
 
// Price Scraper, works on Amazon, Walmart, Newegg, etc...
const wishURL = 'https://www.amazon.com/gp/product/B079QHML21?pf_rd_p=f3acc539-5d5f-49a3-89ea-768a917d5900&pf_rd_r=5TSCQ4EWVQQFWZQZ1H8A';
priceFinder.findItemPrice(wishURL, function(err, price) {
    console.log(price); // 8.91
});

// app.get("/callback", (req, res) => {
//   res.redirect("/");
// });

// app.get("*", (req, res) => {
//   res.redirect("/");
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});


// REMEMBER TO ADD AN .OPEN WITHIN A ROUTE HIT BY THE USER SO THAT THEY CAN ACCESS THEIR ACCOUNT SELECTION PROCESS AGAIN, BOTH
// DELETING THEIR CURRENT CONNECTED ACCOUNTS AND ADDING NEW ONES IN ONE FELL SWOOP!

//route to auth0 to
//1. obtain user id


app.listen(APP_PORT, function () {
  console.log(`PennyWise Server is now listening Port: ${APP_PORT}`);
});