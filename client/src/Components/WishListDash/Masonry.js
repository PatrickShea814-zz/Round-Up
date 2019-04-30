import React, { Component } from "react";
import { Button } from "react-bootstrap";
import WishList from "./WishList";
import "./WishList.css";

class Masonry extends Component {
    render() {
        return (
            <div className="container">
                <div className="masonry-container">
                    <WishList brakePoints={this.props.brakePoints}>
                        {this.props.images.map((image, id) => {
                            return (
                                <Tile src={image} />
                            )
                        })}
                    </WishList>
                </div>
            </div>
        )
    }
}

const Tile = ({ src }, props) => {
    return (
        <div className="card" id="itemCard">
            <div className="tile">
                <img src={src} alt="Masonry Images" />
            </div>
            <div class="card-body" id="itemContent">
                <h5 class="card-title">Item Name:</h5> {props.item}
                <p class="card-text" id="itemText">Price:</p> {props.price}
                <Button
                    bsStyle="primary"
                    id="viewItem"
                    className="btn">
                    <span>View Item</span>
                </Button>
                <Button
                    bsStyle="danger"
                    id="removeItem"
                    className="btn">
                    <span>Remove</span>
                </Button>
            </div>
        </div>
    );
};


export default Masonry;
