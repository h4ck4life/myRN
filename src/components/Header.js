import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';

const menuIcon = (<Icon style={{}} name="menu" size={30} color="#ccc" />)

// Make a component
const Header = (props) => {

    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableOpacity onPress={() => props.drawer()}>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    {menuIcon}
                </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'stretch'}}>
                <Text style={textStyle}>{props.headerText}</Text>
            </View>
        </View>
    );
};

Header.propTypes = {
    headerText: PropTypes.string.isRequired,
    drawer: PropTypes.func.isRequired
}

const styles = {
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        //justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        //paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};

// Make the component available to other parts of the app
export default Header;