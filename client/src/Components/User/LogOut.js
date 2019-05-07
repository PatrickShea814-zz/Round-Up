import React, { Component } from 'react';
import styled, { css } from 'styled-components';


const LogOutButton = styled.button`
    font-size: 18px;
    letter-spacing: 2px;
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

    ${props => props.right && css`
        float: right;
    `}
    &:hover {
        background-color: #7ae0bb;
        color: white;
        
    }
`;


class LogOut extends Component {
    render() {
        return (
            <LogOutButton right>Log Out</LogOutButton>
        )
    }
}

export default LogOut;