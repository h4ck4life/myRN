import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const amazonIcon = (<Icon style={{}} name="amazon" size={18} color="#fff" />)

const Button = ({ onPress, children }) => {

    const {
        buttonStyle,
        textStyle,
        textIconStyle,
        buttonIconStyle
    } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle} activeOpacity={0.7}>
            <Text style={textStyle}>
                {amazonIcon}  {children}
            </Text>
        </TouchableOpacity>
    );
};

Button.propTypes = {
    onPress: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired
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
        alignSelf: 'stretch',
        backgroundColor: '#EA9004',
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#EA9004',
        marginLeft: 5,
        marginRight: 5
    }
};

export default Button;