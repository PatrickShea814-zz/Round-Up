/* global chrome */

import React, { Component } from 'react';
import MicrolinkCard from '@microlink/react'


class ItemPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemURL: ''
        };
    }

    componentDidMount() {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const itemURL = new URL(tabs[0].url);
            this.setState({
                itemURL: itemURL,
            });
        });
    }

    render() {
        return (
            <MicrolinkCard
                url={this.state.itemURL}
                size='large'
                contrast='true'
            />
        )
    }
}

export default ItemPreview;