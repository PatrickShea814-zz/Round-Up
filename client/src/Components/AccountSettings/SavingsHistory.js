import React, { Component } from "react";
import './AccountSettings.css';

// Refer To Plaid.js for associated function

class SavingsHistory extends Component {
    render() {
        return <div class="item-data-row">
            <div class="item-data-row__center">
                <div class="item-data-row__nicename">My PennyWise Savings</div>
                <div class="item-data-row__description">View your PennyWise savings history from the last 30 days.</div>
            </div>
            <div class="item-data-row__right">
                <button id="get-transactions-btn"
                    class="button button--is-small button--is-default button--is-full-width">Vew Savings</button>
            </div>
            <div class="item-data-row__response">
                <table>
                    <tbody id="get-transactions-data"></tbody>
                </table>
            </div>
        </div>
    }
}

export default SavingsHistory;
