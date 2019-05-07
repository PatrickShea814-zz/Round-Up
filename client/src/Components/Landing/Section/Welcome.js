import React, { Component } from 'react';
import styled from 'styled-components';

const Section = styled.section`
    color: white;
    margin: 0 5%;
    position: absolute;
    top: 30%;
    font-size: 1.8vw;
    @media (max-width: 1000px) {
        top: 55%;
        font-size: 1.9vw;
    }
    @media (max-width: 800px) {
        top: 60%;
        font-size: 3.2vw;
        margin: 0 auto;
        text-align: center;
    }
`;

const Title = styled.h1`
    font-size: 2em;
    margin: 0 0 20px 0;
    letter-spacing: 3px;
`;

const Subtitle = styled.p`
    width: 55%;
    margin: 0 0 20px 0;
    @media (max-width: 800px) {
        margin: 0 auto;
        text-align: center;
    }
`;

const MainJoinButton = styled.button`
    font-size: 16px;
    letter-spacing: 2px;
    margin: 0 1em 0 1em;
    padding: 12px 2em;
    color: #00a79d;
    background-color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 5px;
    user-select: none;
    text-align: center;
    border: 0;

    &:hover {
        background-color: #00a79d;
        color: white;
    }
`;

const ChromeExt = styled.button`
    font-size: 16px;
    letter-spacing: 2px;
    margin: 0 1em 0 1em;
    padding: 12px 2em;
    color: #00a79d;
    background-color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 5px;
    user-select: none;
    text-align: center;
    border: 0;

    &:hover {
        background-color: #00a79d;
        color: white;
    }
`;

class Welcome extends Component {
    render() {
        const login = this.props.auth.login
        return (
            <Section>
                <Title>Wish. Save. Reward.</Title>
                <Subtitle>Purchase your wish list items with the change saved from rounding up everyday purchases.</Subtitle>
                <Subtitle>Get Pennywise.<MainJoinButton onClick={() => login()}>Sign Up Today</MainJoinButton></Subtitle>
                <Subtitle>Chrome Extension.<ChromeExt>Download</ChromeExt></Subtitle>
            </Section>
        )
    }
}

export default Welcome;