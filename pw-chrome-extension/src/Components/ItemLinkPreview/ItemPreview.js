/* global chrome */

import React, { Component } from 'react';
import axios from 'axios';
import MicrolinkCard from '@microlink/react'


class ItemPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemURL: null
        };
    }

    componentDidMount() {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const itemURL = new URL(tabs[0].url);
            this.setState({
                itemURL: itemURL
            });
            this.getLinkPreview(itemURL);
        });
    }

    getLinkPreview(url) {
        axios.post(
            'https://api.linkpreview.net',
            {
                q: url,
                key: '5cc24c57e086acd8ac8f67b25299ae08b9bde7cdb7b69' // STORE ELSEWHERE AND IMPORT IN.
            }).then(resp => {
                console.log(resp.data);
                this.setState({
                    headlines: resp.data.articles.slice(0, 5) // Edit and create card
                });
            }).catch(error => {
                console.log('Error getting Link Preview Response.', error);
            });
    }

    render() {
        return (
            <MicrolinkCard
                url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk'
                size='large'
                contrast='true'
            />
        );
    }
}
export default ItemPreview;