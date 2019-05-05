import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './User.css';
import LogOut from './LogOut';
import DarkModeToggle from '../DarkMode/DarkModeToggle';

const MenuList = styled.a`
    font-size: 16px;
    letter-spacing: 1.9px;
    font-weight: 100;
    width: 100%;
    color: white;
    cursor: pointer;
    text-decoration: one;
    vertical-align: middle;
    font-family: Arial, sans-serif;
    text-align: center;
    line-height: normal;
    border: transparent;
&:hover {
    background-color: #7ae0bb;
}
`;


class UserDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    render() {
        return (
            <Menu
                right
            >
                <DarkModeToggle />
                <MenuList id="Accounts" className="menu-item" href="/"><FontAwesomeIcon icon="university" /> View Accounts</MenuList>
                <MenuList id="History" className="menu-item" href="/about"><FontAwesomeIcon icon="history" />Savings History</MenuList>
                <MenuList id="Extension" className="menu-item" href="/about"><FontAwesomeIcon icon="chrome" />Download Extension</MenuList>
                <MenuList id="Help" className="menu-item" href="/contact"><FontAwesomeIcon icon="question-circle" />Help Center</MenuList>
                <MenuList id="Contact" className="menu-item" href="/contact"><FontAwesomeIcon icon="paper-plane" />Contact Us</MenuList>
                <LogOut />
            </Menu>
        )
    }
}

export default UserDropdown;