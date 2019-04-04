import React from "react";
import "../../App.css";
import "../Vault/Vault.css";



function ItemCard(props) {
  return (
    <div className="container-fluid">
    <div className="card">
      <div className="img-container">
        <img class="cardImage" alt={props.name} src={props.image} />
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
        </ul>
      </div>
      <span onClick={() => props.removeItem(props.id)} className="remove">
        𝘅
      </span>
    </div>
    </div>
  );
}

export default ItemCard;