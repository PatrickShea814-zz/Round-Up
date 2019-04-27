import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import axios from "axios";
import history from "../../history";

class App extends Component {

  handleOnSuccess(token, metadata) {
    // send token to client server
    console.log("Client token = ", token);
    axios.request({
      method: "POST",
      url: "/api/get_access_token",
      data: {
        public_token: token,
        account_id: metadata.account_id,
        accounts: metadata.accounts
      }
    }).then((res) => {
      console.log("Plaid post success", res.data)
      if (res.data.existingUser === true) {
        console.log('Plaid user = true');
      }
      else {
        console.log('Plaid user = false');
        history.replace('/home');
      }
    }).catch((err) => { console.log("userID post failed", err) });

    axios.request({
      method:"GET",
      url:"/api/updateUser"
    }).then(res => {
      console.log("updateUser Route Success = ", res.data)
    }).catch(err => { console.log("updateUser Route error", err) })
  }

  // handleOnExit() {
  //   // handle the case when your user exits Link
  // }

  render() {
    return (
      <PlaidLink
        clientName="PennyWise"
        env="sandbox"
        institution={null}
        // PublicKey SHOULD NOT BE HARDCODED 
        publicKey='8db95b7611b5cab8773417a96c9021'
        product={['auth', 'transactions']}
        apiVersion={'v2'}
        token={null}
        selectAccount={true} // deprecated – use https://dashboard.plaid.com/link
        webhook="https://webhooks.test.com"
        onEvent={this.handleOnEvent}
        onExit={this.handleOnExit}
        onLoad={this.handleOnLoad}
        onSuccess={this.handleOnSuccess}>
        Open Link and connect a bank account to Plaid
      </PlaidLink>
    )
  }
}
export default App