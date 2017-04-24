import React, { Component } from 'react';
import { Text, View, Share, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const shareIcon = (<Icon style={{}} name="share" size={18} color="#fff" />)

class SocialShare extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    _shareText() {
        Share.share({
            message: this.props.msg,
            url: this.props.url,
            title: this.props.title
        }, {
                dialogTitle: 'Share to..',
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ],
                tintColor: 'green'
            })
            .catch((error) => console.log(error.message));
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this._shareText()} style={styles.buttonStyle} activeOpacity={0.7}>
                <Text style={styles.textStyle}>
                    {shareIcon}  {this.props.children}
                </Text>
            </TouchableOpacity>
        )
    }
}

SocialShare.PropTypes = {
    title: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#30BA3C',
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#30BA3C',
        marginLeft: 5,
        marginRight: 5
    }
};

export default SocialShare;