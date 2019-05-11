const db = require('../models')

module.exports = async function transactionFinder (user, trns){
   
    const transactionsArray = [];
    const accountsArray = [];
  
    for (let i = 0; i < trns.transactions.length; i++) {
      
      let toBeRounded = Math.ceil(trns.transactions[i].amount) - trns.transactions[i].amount;
      
      if (toBeRounded === 0){
        toBeRounded = 1;
      }
  
      function AccountConstructor(name, id){
  
        return { 
          "account_name": name,
          "account_id": id
        }
      }
  
      for(let j =0; j < trns.accounts.length; j++){
        await accountsArray.push(AccountConstructor(trns.accounts[j].name, trns.accounts[j].account_id))
      }

      for (let k = 0; k < accountsArray.length; k++){
        
        if (accountsArray[k].account_id === trns.transactions[i].account_id){
          
          let getTransactions = await db.RoundedTrans.create({
            userID: user._id,
            account_id: trns.transactions[i].account_id,
            date: trns.transactions[i].date,
            name: accountsArray[k].account_name,
            transactionName: trns.transactions[i].name,
            originalAmount: trns.transactions[i].amount,
            currencyCode: trns.transactions[i].iso_currency_code,
            category: trns.transactions[i].category,
            roundedAmount: toBeRounded,
            transaction_id: trns.transactions[i].transaction_id,
            transactionDate: trns.transactions[i].date
          }).then(res => {
              return res
            })
            .catch(err =>{
              return err
            })
          
      transactionsArray.push(getTransactions)
      
    }
  }
    
  }
    return transactionsArray;
  }