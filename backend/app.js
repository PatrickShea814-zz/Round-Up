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
var dotenv = require('dotenv').config();
var indexRouter = require('./routes/index');
// Helmet helps you secure your Express apps by setting various HTTP headers.
const helmet = require('helmet');
const routes = require("./routes");


// REQUIRING OUR MODELS
const db = require("./models");


// SETS UP AND INITIALIZES THE EXPRESS APP 
// =============================================================
var app = express();


// CONFIGURE OUR MIDDLEWARE
// Use morgan logger for logging requests
app.use(logger('dev'));
// Sets ups the Express App to handle Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make Public our Static Directory
app.use(express.static("public"));
app.use(cookieParser());
// Make Public our Static Directory
app.use(express.static(path.join(__dirname, 'public')));
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());


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
var MONGODB_URI = "mongodb://localhost/roundUpDB";
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

var APP_PORT = envvar.number('APP_PORT', 8034);
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
var PUBLIC_TOKEN = null;
var ITEM_ID = null;
var ACCOUNT_ID;

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
app.use(express.static('public'));
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

async function accountCreator(res, accessToken, identity) {
  let arr = [];
  for (let i = 0; i < identity.accounts.length; i++) {

    if (identity.accounts[i].subtype === 'checking') {
      // console.log('Hello World!')
      let accounts = await db.PlaidUserAccounts.create({
        userID: res._id,
        accessToken: accessToken,
        account_id: identity.accounts[i].account_id,
        accountName: identity.accounts[i].name,
        official_name: identity.accounts[i].official_name,
        availableBalance: identity.accounts[i].balances.available,
        mask: identity.accounts[i].mask,
        type: identity.accounts[i].type,
        subtype: identity.accounts[i].subtype,
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
  

app.get('/', function (request, response, next) {
  // TEST HOME FRONT END PLAID LINK BUTTON FILE
  response.sendFile(path.join(__dirname, 'index.html'), {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
    PLAID_PRODUCTS: PLAID_PRODUCTS,
  });
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/get_access_token', function (request, response, next) {
  
  PUBLIC_TOKEN = request.body.public_token;
  ACCOUNTS = request.body.ACCOUNTS;
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
  });
});


// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get('/transactions', function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 10,
    offset: 0,
  }, function (error, transactionsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    } else {
      for (let i = 0; i < transactionsResponse.transactions.length; i++) {
        let toBeRounded = Math.ceil(transactionsResponse.transactions[i].amount);
        
        db.RoundedTrans.create({
          userID: 'IggKjOZ4znfGIB2hKgxZ',
          account_id: transactionsResponse.transactions[i].account_id,
          transactionName: transactionsResponse.transactions[i].name,
          originalAmount: transactionsResponse.transactions[i].amount,
          currencyCode: transactionsResponse.transactions[i].iso_currency_code,
          category: transactionsResponse.transactions[i].category,
          roundedAmount: transactionsResponse.transactions[i].roundedAmount,
          transaction_id: transactionsResponse.transactions[i].transaction_id,
          transactionDate: transactionsResponse.transactions[i].date
        })
          .then(response => console.log(response))
          .catch(err => console.log(err));
      }
      prettyPrintResponse(transactionsResponse);
      response.json({ error: null, transactions: transactionsResponse.transactions });
    }
  });
});

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

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
app.get('/balance', function (request, response, next) {
  client.getBalance(ACCESS_TOKEN, function (error, balanceResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(balanceResponse);
    response.json({ error: null, balance: balanceResponse });
  });
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get('/accounts', function (request, response, next) {
  client.getAccounts(ACCESS_TOKEN, function (error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(accountsResponse);
    response.json({ error: null, accounts: accountsResponse });
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

// Create and then retrieve an Asset Report for one or more Items. Note that an
// Asset Report can contain up to 100 items, but for simplicity we're only
// including one Item here.
// https://plaid.com/docs/#assets
app.get('/assets', function (request, response, next) {
  // You can specify up to two years of transaction history for an Asset
  // Report.
  var daysRequested = 10;

  // The `options` object allows you to specify a webhook for Asset Report
  // generation, as well as information that you want included in the Asset
  // Report. All fields are optional.
  var options = {
    client_report_id: 'Custom Report ID #123',
    // webhook: 'https://your-domain.tld/plaid-webhook',
    user: {
      client_user_id: 'Custom User ID #456',
      first_name: 'Alice',
      middle_name: 'Bobcat',
      last_name: 'Cranberry',
      ssn: '123-45-6789',
      phone_number: '555-123-4567',
      email: 'alice@example.com',
    },
  };
  client.createAssetReport(
    [ACCESS_TOKEN],
    daysRequested,
    options,
    function (error, assetReportCreateResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(assetReportCreateResponse);

      var assetReportToken = assetReportCreateResponse.asset_report_token;
      respondWithAssetReport(20, assetReportToken, client, response);
    }
  );
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get('/item', function (request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function (err, instRes) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        prettyPrintResponse(itemResponse);
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        });
      }
    });
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

app.get('/updateUser', function (request, response, next) {

  client.getIdentity(ACCESS_TOKEN, function (error, identityResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
  
    // Creates the user in our database.
    let NewUserCreator = () => {
      return Promise.resolve(db.User.create({
        name: identityResponse.identity.names[0],
        password: TonyDang.password,
        email: TonyDang.email,
        phoneNum: identityResponse.identity.phone_numbers[0].data
      })
      )
    }

    let NewUserPlaidItemCreator = (res => {
      return Promise.resolve(db.PlaidItems.create({
        userID: res._id,
        institutionID: identityResponse.item.institution_id,
        accessToken: ACCESS_TOKEN,
        itemID: identityResponse.item.institution_id
      }))
    })

    let PlaidItemIntoUserModel = (res => {
     
      return Promise.resolve(
        db.User.findOneAndUpdate({ _id: res.userID }, { $push: { plaidItems: res } })
      )
    })

    let PlaidAccountsCreator = ((res) => {
      
      return Promise.resolve(
        accountCreator(res, ACCESS_TOKEN, identityResponse)
      )
    })

    let PlaidAccountsIntoUserModel = (res => {
      return Promise.resolve(
        db.User.findOneAndUpdate({ _id: res[0].userID }, { $push: { plaidAccounts: res[0] } })
      )
    });

    async function TokenCreator(res) {

        let Tkn = await StripeTokenCreator(ACCESS_TOKEN, ACCOUNT_ID)
        
          return [res, Tkn]

        };
    
    async function StripeAccountCreator (res) {

      let USER = res[0];
      let strTok = res[1];

      let StripeCustomer = await stripe.customers.create({
          
          "source": strTok.stripe_bank_account_token

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
        created: StrCust.created,
        default_source: StrCust.default_source,
        sourceURL: StrCust.sources.url,
        subscriptionsURL: StrCust.subscriptions.url
      })

      USER = await USER.update({$push: {stripeCustomer: Customer}})

      return [USER, Customer]
    }

    
    let consoleLogger = (res => console.log('This is the result', res));

    let arr = [NewUserCreator, NewUserPlaidItemCreator, PlaidItemIntoUserModel, PlaidAccountsCreator, PlaidAccountsIntoUserModel, TokenCreator, StripeAccountCreator, StripeDataCreator, consoleLogger]
    pseries(arr).catch(err => console.log(err));
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

// REMEMBER TO ADD AN .OPEN WITHIN A ROUTE HIT BY THE USER SO THAT THEY CAN ACCESS THEIR ACCOUNT SELECTION PROCESS AGAIN, BOTH
// DELETING THEIR CURRENT CONNECTED ACCOUNTS AND ADDING NEW ONES IN ONE FELL SWOOP!


app.listen(APP_PORT, function () {
  console.log(`PennyWise Server is now listening Port: ${APP_PORT}`);
});