import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
import Wrapper from "../Wrapper/index";
import ItemCard from "../Items/ItemCard";
import items from "../../items.json";
import Title from "../Title/index";
import "./Vault.css";


class Vault extends Component {
  state = {
    items
  };

  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  // };

  purchaseItem = token => {
    return (
      <StripeCheckout
        stripeKey="pk_test_qWg3WHGQczXmNw5EXh8mv17W"
        token={this.onToken}
      />
    );
  };

  render() {
    // const { AuthClass } = this.state;
    return (
      <Wrapper className="container">
        <Title>TITLE</Title>
        <div className="cardContainer">
          {this.state.items.map(item => (
            <ItemCard
              key={item.id}
              item={item.item}
              price={item.price}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </Wrapper>
    );
  }
}

export default Vault;
