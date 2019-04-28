import React from "react";
import "../../App.css";
import "../Vault/Vault.css";
import "./WishList.css";

function ItemInfo(props) {
    return (
        <div className="container-fluid">
            <div className="card">
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
            </div>
        </div>
    );
}

export default ItemInfo;