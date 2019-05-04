import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import pennywiselogo from './img/whitelogo.png';
import CurrentUser from '../../User/ProfileButton';

const Nav = styled.nav`
    height: 90px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    /* PennyWise logo */
    img {
        width: 240px;
        height : 70px;
        vertical-align: middle;
    }
    .logo {
        display: inline-block;
        line-height: 90px;
        margin: 0 0 0 3%;
    }
`;

const NavButton = styled.button`
font-size: 18px;
letter-spacing: 1.9px;
font-weight: 100;
margin: 18px 3% 0 0;
padding: 10px 2em 12px 1em;
color: white;
background-color: transparent;
    cursor: pointer;
    text-decoration: one;
    vertical-align: middle;
    font-family: Arial, sans-serif;
    border-radius: 5px;
    text-align: center;
    line-height: normal;
    border: transparent;

    ${props => props.right && css`
        float: right;
    `}
    &:hover {
        background-color: #7ae0bb;
        border: 2px solid white;
    }
`;

const SignInButton = styled.button`
font-size: 18px;
letter-spacing: 1.9px;
font-weight: 100;
margin: 18px 3% 0 0;
padding: 10px 2em;
color: #00a79d;
background-color: #ffffff;
    cursor: pointer;
    text-decoration: one;
    vertical-align: middle;
    font-family: Arial, sans-serif;
    border-radius: 5px;
    text-align: center;
    line-height: normal;
    border: transparent;

    ${props => props.right && css`
        float: right;
    `}
    &:hover {
        background-color: #00a79d;
        color: white;
        
    }
`;

class HomeNav extends Component {
    render() {
        return (
            <Nav>
                <a href={"/"} className="logo">
                    <img src={pennywiselogo} alt="PennyWise Logo" />
                </a>
                <SignInButton right>Sign In</SignInButton>
                <NavButton right>Contact Us</NavButton>
                <NavButton right>About Us</NavButton>
                <CurrentUser/>
            </Nav>
        )
    }
}

export default HomeNav;