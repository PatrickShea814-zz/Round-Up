import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import "./style.css";


export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  };

  render() {
    return (
      <StripeCheckout
        stripeKey='pk_test_qWg3WHGQczXmNw5EXh8mv17W'
        token={this.onToken}

        amount={this.price}
        billingAddress={this.addresses}
        description={this.description}
        image="https://ps.w.org/simple-owl-carousel/assets/icon-256x256.png?rev=1839276"
        locale="auto"
        name="RoundUp"
        zipCode
      />
    )
  }
}