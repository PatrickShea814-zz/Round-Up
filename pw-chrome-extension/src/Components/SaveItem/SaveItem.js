import React, { Component } from 'react';
import styled from 'styled-components';


const SaveItemButton = styled.button`
font-size: 18px;
letter-spacing: 1.9px;
font-weight: 100;
margin: 0px auto;
width: 100%;
padding: 12px 2em;
color: white;
background-color: #00a79d;
    cursor: pointer;
    text-decoration: one;
    vertical-align: middle;
    font-family: Arial, sans-serif;
    text-align: center;
    line-height: normal;
    border: transparent;
    &:hover {
        background-color: #7ae0bb;
        color: white;
    }
`;


class SaveItem extends Component {
    render() {
        return (
            <SaveItemButton>Add To Wish List</SaveItemButton>
        )
    }
}

export default SaveItem;