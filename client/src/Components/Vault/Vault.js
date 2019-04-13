import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
import Wrapper from "../Wrapper/index";
import ItemCard from "../Items/ItemCard";
import items from "../../items.json";
import Title from "../Title/index";
import "./Vault.css";
import { stringify } from "querystring";



class Vault extends Component {

  state = {
    // items
  };

  componentDidMount() {
    this.getUser()
  }

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

  getUser = () => {
    // let { nickname } = this.state;
    this.setState({test: 'test'}, console.log(this.state.test))
    let currentComponent = this; 
    this.props.auth.getProfile(function(err, getProfile){
      if(err){
        console.log(err);
      }
      else {
        // console.log("getProfile() ran...", getProfile);
        // console.log("Function colog = ", getProfile.nickname);
        var username = getProfile.nickname;
        username = username.charAt(0).toUpperCase() + username.slice(1);

        currentComponent.setState({currentUser: username}, () => {
          console.log(currentComponent.state.currentUser)
        })
        // return username;
      }
    });
  }


  render() {
    return (
      <Wrapper className="container">
        <Title currentUser={this.state.currentUser} />
        <div className="cardContainer">
          {items.map(item => (
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
