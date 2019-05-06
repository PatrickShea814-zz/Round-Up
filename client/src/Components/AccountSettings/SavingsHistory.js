import React, { Component } from "react";
import './AccountSettings.css';

// Refer To Plaid.js for associated function

class SavingsHistory extends Component {
    render() {
        return <div className="item-data-row">
            <div className="item-data-row__center">
                <div className="item-data-row__nicename">My PennyWise Savings</div>
                <div className="item-data-row__description">View your PennyWise savings history from the last 30 days.</div>
            </div>
            <div className="item-data-row__right">
                <button id="get-transactions-btn"
                    className="button button--is-small button--is-default button--is-full-width">Vew Savings</button>
            </div>
            <div className="item-data-row__response">
                <table>
                    <tbody id="get-transactions-data"></tbody>
                </table>
            </div>
        </div>
    }
}

export default SavingsHistory;
