import React, { Component } from 'react';
import { AppRegistry, View, DrawerLayoutAndroid, Text } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

// Create a component
class App extends Component {

  render() {

    var navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <View style={{ flex: 1 }}>
          <Header headerText={'Albums'} />
          <AlbumList />
        </View>
      </DrawerLayoutAndroid>
    );
  }

}

// Render it to the device
AppRegistry.registerComponent('myRN', () => App);