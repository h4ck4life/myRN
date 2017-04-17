import React, { Component } from 'react';
import { AppRegistry, View, DrawerLayoutAndroid, Text, Alert } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';
import { AdMobBanner } from 'react-native-admob'

// Create a component
class App extends Component {

  _bannerError(err) {
    Alert.alert(
      'Admob Error',
      'Oops ads cant be served, ' + err,
      [
        { text: 'OK', onPress: () => "" },
      ]
    );
  }

  render() {

    var _navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => _navigationView}>
        <View style={{ flex: 1 }}>
          <Header headerText={'Albums'} />
          <AlbumList />
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-9221126498873830/7277608582"
            testDeviceID=""
            didFailToReceiveAdWithError={this._bannerError} />
        </View>
      </DrawerLayoutAndroid>
    );
  }

}

// Render it to the device
AppRegistry.registerComponent('myRN', () => App);