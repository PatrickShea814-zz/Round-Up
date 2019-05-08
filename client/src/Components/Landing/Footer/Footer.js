import React, { Component } from 'react';
import styled from 'styled-components';
import FooterLogo from './img/navlogo.png';

const Footer = styled.footer`
    margin: 0 auto;
    width: 60%;
    @media (max-width: 900px) {
        width: 90%;
    }
`;

const MainList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    letter-spacing: 2px;
    padding: 30px 0 0 0;
    li {
        display: block;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        /* is 25 */
        flex: none;
        width: 25%;
        /* Styles */
        list-style: none;
        margin: 0 0 16px;
        padding-right: 12px;
        min-width: 100px;
        font-size: 18px;

        a {
            text-decoration: none;
            span {
                color: #00a79d;
                &:hover {
                    text-decoration: underline;
                    color: #00a79d;
                }
            }
        }
    }
`;



class footer extends Component {
    render() {
        return (
            <Footer>
                <MainList>
                    <li>
                        <a href="https://help.netflix.com/en/node/412"><span>About Us</span></a>
                    </li>
                    <li>
                        <a href="https://help.netflix.com/en/node/412"><span>Contact Us</span></a>
                    </li>
                    <li>
                        <a href="https://help.netflix.com/en/node/412"><span>Terms of Use</span></a>
                    </li>
                    <li>
                        <a href="https://help.netflix.com/en/node/412"><span>Privacy</span></a>
                    </li>
                </MainList>
            </Footer>
        )
    }
}

export default footer;