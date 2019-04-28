import React, { Component } from "react";
import WishList from "./WishList";
import ItemInfo from './ItemInfo';
import './WishList.css';

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

const Tile = ({ src }) => {
    return (
        <div className="tile">
            <img src={src} alt="Masonry Images" />
        </div>
    );
};

export default Masonry;
