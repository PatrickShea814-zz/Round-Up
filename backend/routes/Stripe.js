app.post('/createCustomer', function (request, response, next) {
    client.createStripeToken(accessToken, ACCOUNT_ID, function (err, res) {
        let bankAccountToken = res.stripe_bank_account_token;
        stripe.customers.create({
            "source": bankAccountToken,
        })
    });
});

app.get('/getCustomer', function (request, response, next) {
    stripe.customers.retrieve(
        'cus_EvDDMQQOxw5aOo',
        function (err, customer) {
            // asynchronously called
        }
    );

});

app.post('/updateCustomer', function (request, response, next) {
    stripe.customers.update(
        'cus_EvDDMQQOxw5aOo',
        { metadata: { order_id: '6735' } },
        function (err, customer) {
            // asynchronously called
        }
    );

});

app.delete('/deleteCustomer', function (request, response, next) {
    stripe.customers.del(
        'cus_EvDDMQQOxw5aOo',
        function (err, confirmation) {
            // asynchronously called
        }
    );
});

app.get('/getAllCustomers', function (request, response, next) {
    stripe.customers.list(
        { limit: 3 },
        function (err, customers) {
            // asynchronously called
        }
    );
});