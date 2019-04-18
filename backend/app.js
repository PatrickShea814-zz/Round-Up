// REQUIRE OUR DEPENDENCIES
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
// Helmet helps you secure your Express apps by setting various HTTP headers.
const helmet = require('helmet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());


// MONGOOSE
const mongoose = require('mongoose');

const db = require("./models");

const userId = 'IggKjOZ4znfGIB2hKgxZ';

// This is our roundup function
const minus = (minuend, subtrahend) => {
  let difference = minuend - subtrahend;
  return difference.toFixed(2)
};
//connect to mongoose database
//old mongoose connect code
// mongoose.connect("mongodb://localhost/roundup_db", { useNewUrlParser: true });

//use this code to work on heroku

var MONGODB_URI = "mongodb://localhost/roundUpDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (request, response, next) {
  response.sendFile(path.join(__dirname, 'index.html'))
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/get_access_token', function (request, response, next) {
  // This is the initial user signup route for plaid.
  // Once the user signs up, the integration between plaid and stripe occurs.
  
  PUBLIC_TOKEN = request.body.public_token;
  ACCOUNT_ID = request.body.account_id;

  // console.log(ACCOUNT_ID);
  
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    } else {
      // console.log(tokenResponse);
      var accessToken = tokenResponse.access_token;
      
      client.getIdentity(accessToken, function (error, identityResponse) {
        if(error){
          console.log(error)
        }
        else {
          // console.log(identityResponse);
          db.User.create({
            name: identityResponse.identity.names[0],
            password: TonyDang.password,
            email: TonyDang.email,
            phoneNum: identityResponse.identity.phone_numbers[0].data
        })
          .catch(err => console.log(err))
          .then(response => {
          console.log(response)
          db.PlaidItems.create({
            userID: response._id,
            institutionID: identityResponse.item.institution_id,
            accessToken: accessToken,
            itemID: identityResponse.item.institution_id
          })
          .catch(err => console.log(err))
          .then(PlaidItem =>{
            console.log("This is the user's PlaidItem:", PlaidItem);
              db.User.findOneAndUpdate({_id: PlaidItem.userID}, {$set: { plaidItems: PlaidItem}})
              .catch(err => console.log(err))
              .then(updatePlaidItems=> {
                return updatePlaidItems;
              })
          })
          .catch (err => console.log(err))
          .then(updatePlaidItems => console.log('Items integrated:', updatePlaidItems))
          
          for (let i = 0; i < identityResponse.accounts.length; i++){

            if (identityResponse.accounts[i].subtype === 'checking'){
            db.PlaidUserAccounts.create({
              userID: response._id,
              accessToken: accessToken,
              account_id: identityResponse.accounts[i].account_id,
              accountName: identityResponse.accounts[i].name,
              official_name: identityResponse.accounts[i].official_name,
              availableBalance: identityResponse.accounts[i].balances.available,
              mask: identityResponse.accounts[i].mask,
              type: identityResponse.accounts[i].type,
              subtype: identityResponse.accounts[i].subtype,

            })
            .catch(err => console.log(err))
            .then (accounts => console.log('These are the connected accounts:', accounts))
            .catch(err => console.log(err))

          }

        }
        
      })

    }

  })
      
      // Generate a bank account token
      client.createStripeToken(accessToken, ACCOUNT_ID, function (err, res) {
        let bankAccountToken = res.stripe_bank_account_token;
        // This is the request_id for each transaction
        let request_id = res.request_id;

        stripe.customers.create({
          "source": bankAccountToken,
        })
          .catch(err => console.log)
          .then(stripe => {
            // console.log(stripe)
            db.User.findOne({ email: TonyDang.email })
              .then(response => {
                // console.log(response);
                db.StripeCustomer.create({
                  userId: response._id,
                  stripeID: stripe.id,
                  created: stripe.created,
                  default_source: stripe.default_source,
                  sourceURL: stripe.sources.url,
                  subscriptionsURL: stripe.subscriptions.url
                })
                .catch(err => console.log (err))
                .then(stripeCreated => {
                  console.log("This is what you're looking for", stripeCreated)
                  db.User.findOneAndUpdate(
                    {_id: stripeCreated.userId},
                    {$set: {stripeCustomer: stripeCreated}}
                    )
                    .catch(err => console.log(err))
                    .then(updateStripeUser => console.log('Here is our user with Stripe integration:', updateStripeUser))
                })
                
              })
              .catch(err => console.log(err))
          })

      });

    };

  })
  response.redirect('/userIntegration');
})

app.get('/userIntegration', function(request, response, next){

  db.User.findOne({ email: TonyDang.email})
    .catch(err => console.log(err))
    .then(user => {
      console.log('Looking to integrate PlaidItems:', user)
      db.PlaidItems.findOne({ userID: user._id})
      .catch(err => console.log(err))
      .then(response => console.log('Here is the PlaidItem we found:', response))
      db.User.findByIdAndUpdate({ _id: user._id}, {$set: { plaidItems: response}})
      .catch(err => console.log(err))
      .then(updatedUser => console.log('Here is our updated user:', updatedUser))
    })
    
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
        console.log(toBeRounded);
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
    } else {
      for (let i = 0; i < accountsResponse.accounts.length; i++) {
        if (accountsResponse.accounts[i].subtype === 'checking') {
          // ADJUST QUERY TO UPDATE EXISTING USER
          db.PlaidUserAccounts.create({
            userID: 'IggKjOZ4znfGIB2hKgxZ',
            accessToken: ACCESS_TOKEN,
            account_id: accountsResponse.accounts[i].account_id,
            accountName: accountsResponse.accounts[i].name,
            official_name: accountsResponse.accounts[i].official_name,
            availableBalance: accountsResponse.accounts[i].balances.available,
            mask: accountsResponse.accounts[i].mask,
            type: accountsResponse.accounts[i].type,
            subtype: accountsResponse.accounts[i].subtype
          })
            .then(response => console.log(response))
            .catch(err => console.log(err));
        }
      }
    }
    prettyPrintResponse(accountsResponse);
    response.json({ error: null, accounts: accountsResponse.accounts });
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
    // Handle err
    var accountData = authResponse.numbers;
    if (accountData.ach.length > 0) {
      // Handle ACH numbers (US accounts)
      var achNumbers = accountData.ach;
      prettyPrintResponse(accountData);
      response.json({ error: null, auth: accountData });
      return achNumbers;
      // QUERY FOR MATCHING TO PLAIDUSERACC IF/ELSE STATEMENT
    } else if (accountData.eft.length > 0) {
      // Handle EFT numbers (Canadian accounts)
      var eftNumbers = accountData.eft;
      prettyPrintResponse(accountData);
      response.json({ error: null, auth: accountData });
      return eftNumbers;
      // QUERY FOR MATCHING TO PLAIDUSERACC IF/ELSE STATEMENT
    }
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
    ["access-sandbox-f590f4d0-1c00-4907-95b8-96faf2e81018"],
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
    },
  );
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get('/item', function (request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem("access-sandbox-f590f4d0-1c00-4907-95b8-96faf2e81018", function (error, itemResponse) {
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

var server = app.listen(APP_PORT, function () {
  console.log('plaid-quickstart server listening on port ' + APP_PORT);
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

app.post('/set_access_token', function (request, response, next) {
  ACCESS_TOKEN = request.body.access_token;
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    response.json({
      item_id: itemResponse.item.item_id,
      error: false,
    });
  });
  console.log(access_token)
});

// REMEMBER TO ADD AN .OPEN WITHIN A ROUTE HIT BY THE USER SO THAT THEY CAN ACCESS THEIR ACCOUNT SELECTION PROCESS AGAIN, BOTH
// DELETING THEIR CURRENT CONNECTED ACCOUNTS AND ADDING NEW ONES IN ONE FELL SWOOP!

// ROUTES
app.use('/', indexRouter);

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

module.exports = app;
