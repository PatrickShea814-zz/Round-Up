/**
 * react-native-navigation-bar main
 */

import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';

let width = Dimensions.get('window').width;

export default class ExtensionNav extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        //not include the height of statusBar on ios platform
        height: PropTypes.number,
        titleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        rightButtonTitle: PropTypes.string,
        rightButtonTitleColor: PropTypes.string,
        onRightButtonPress: PropTypes.func
    };

    static defaultProps = {
        title: 'PennyWise',
        height: 44,
        titleColor: '#000',
        backgroundColor: '#f5f3f4',
        rightButtonTitle: 'My Dashboard',
        rightButtonTitleColor: '#000'
    };

    componentWillMount() {
        this.state = this._getStateFromProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        let newState = this._getStateFromProps(newProps);
        this.setState(newState);
    }

    shouldComponentUpdate(nextProps, nextState, context) {
        return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
    }

    _getStateFromProps(props) {
        return {
            ...props
        };
    }

    _renderRightIcon() {
        if (this.state.rightButtonIcon) {
            return (
                <Image style={styles.rightButtonIcon} resizeMode={'contain'} source={this.state.rightButtonIcon} />
            );
        }
        return null;
    }

    _onRightButtonPressHandle(event) {
        let onPress = this.state.onRightButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    render() {
        let height = Platform.OS === 'ios' ? this.state.height + 20 : this.state.height;
        return (
            <View style={[styles.container, {
                height: height,
                backgroundColor: this.state.backgroundColor
            }]}>

                <View style={styles.title}>
                    <Text style={[styles.titleText, { color: this.state.titleColor }]} numberOfLines={1}>
                        {this.state.title}
                    </Text>
                </View>

                <TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
                    <View style={styles.rightButton}>
                        {this._renderRightIcon()}
                        <Text style={[styles.rightButtonTitle, { color: this.state.rightButtonTitleColor }]}>
                            {this.state.rightButtonTitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        width: width
    },
    title: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 1,
        justifyContent: 'center',
        width: width - 200,
        overflow: 'hidden'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '400'
    },
    rightButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingRight: 8
    },
    rightButtonIcon: {
        width: 10,
        height: 15
    },
    rightButtonTitle: {
        fontSize: 15
    }
});

if (Platform.OS === 'ios') {
    styles = {
        ...styles,
        container: {
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            flexDirection: 'row',
            width: width,
            paddingTop: 20
        },
        rightButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 90,
            paddingTop: 1,
            paddingRight: 8
        }
    }
}