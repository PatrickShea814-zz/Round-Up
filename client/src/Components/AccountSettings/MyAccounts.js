import React, { Component } from "react";
import './AccountSettings.css';

// Refer To Plaid.js for associated function

class MyAccounts extends Component {
    render() {
        return <div class="item-data-row">
            <div class="item-data-row__center">
                <div class="item-data-row__nicename">My Connected Accounts</div>
                <div class="item-data-row__description">View all of your accounts currently connected to PennyWise.
                </div>
            </div>
            <div class="item-data-row__right">
                <button id="get-accounts-btn"
                    class="button button--is-small button--is-default button--is-full-width">View Accounts</button>
            </div>
            <div class="item-data-row__response">
                <table>
                    <tbody id="get-accounts-data"></tbody>
                </table>
            </div>
        </div>
    }
}

export default MyAccounts;