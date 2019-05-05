import React, { Component } from 'react';
import './User.css';
import styled from 'styled-components';


const DashboardBtn = styled.button`
    float: right;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    vertical-align: middle;
    font-family: Arial, sans-serif;
    text-align: center;
    letter-spacing: 1.9px;
    font-weight: 100;
    height: 100%;
    background-color: transparent;
    color: #00A79D;
    border: none;
    margin: 0px;
    padding: 0px 1.5em 0px 1.5em !important;
    &:hover {
        color: white;
        background-color: #7AE0BB;
        outline: 0;
        border: none;
    }
    &:active {
        color: white;
        background-color: #00A79D;
        outline: 0;
        border: none;
        transform: translateY(1px);
    }
`;

class MyDashboard extends Component {
    render() {
        return (
            <DashboardBtn className="primary btn">Dashboard</DashboardBtn>
        )
    }
}

export default MyDashboard;