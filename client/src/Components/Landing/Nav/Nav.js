import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import pennywiselogo from './img/whitelogo.png';
import CurrentUser from '../../User/ProfileButton';
import MyDashboard from '../../User/MyDashboard';

const Nav = styled.nav`
    height: 10%;
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
    letter-spacing: 2px;
    margin: 18px 3% 0 0;
    padding: 10px 2em 12px 1em;
    color: white;
    background-color: transparent;
    cursor: pointer;
    text-decoration: one;
    vertical-align: middle;
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
    letter-spacing: 2px;
    margin: 18px 3% 0 0;
    padding: 10px 2em;
    color: #00a79d;
    background-color: #ffffff;
    cursor: pointer;
    text-decoration: one;
    vertical-align: middle;
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
        const login = this.props.auth.login
        return (
            <Nav>
                <a href={"/"} className="logo">
                    <img src={pennywiselogo} alt="PennyWise Logo" />
                </a>
                <SignInButton right onClick={()=>login()}>Sign In</SignInButton>
                <NavButton right>Contact Us</NavButton>
                <NavButton right>About Us</NavButton>
            </Nav>
        )
    }
}

export default HomeNav;