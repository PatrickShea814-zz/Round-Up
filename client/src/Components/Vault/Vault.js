import React, { Component } from "react";
import Wrapper from "../Wrapper/index";
import ItemCard from "../Items/ItemCard";
import friends from "../../items.json";
import Title from "../Title/index"
import "./Vault.css";



class Vault extends Component {

  state = {
    friends
  }

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  render() {
    return (
      <Wrapper className="container">
        <Title>Wish List</Title>
        <div className="cardContainer">
          {this.state.friends.map(friend => (
            <ItemCard
              id={friend.id}
              item={friend.item}
              price={friend.price}
              image={friend.image}
              description={friend.description}
            />
          ))}
        </div>
      </Wrapper>
    );
  }
}

export default Vault;
