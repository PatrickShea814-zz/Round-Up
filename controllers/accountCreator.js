module.exports = async function accountCreator(res, accessToken, accts) {

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