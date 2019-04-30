import React, { Component } from "react";
import './AccountSettings.css';
import '../Plaid/Plaid';

// Refer To Plaid.js for associated function

class MyAccounts extends Component {
    handler.open();
    render() {
        return <div>
            <Button
                bsStyle="primary"
                id="link-btn"
                className="button button--is-primary"
                onClick={this.logout.bind(this)}>
                Add Accounts
            </Button>
        </div>
    }
}

export default MyAccounts;