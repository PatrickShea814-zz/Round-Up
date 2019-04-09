import React from "react";
import "../../App.css";
import "../Vault/Vault.css";
import "./ItemCard.css";
import Checkout from "../CheckoutForm/index";


function ItemCard(props) {
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="img-container">
          <img className="cardImage" alt={props.name} src={props.image} />
        </div>
        <div className="content">
          <ul>
            <li>
              <strong>Item:</strong> {props.item}
            </li>
            <li>
              <strong>Price:</strong> {props.price}
            </li>
            <li>
              <strong>Description:</strong> {props.description}
            </li>
            <li>
              <Checkout></Checkout>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
