import React, { Component } from 'react';
import { AppRegistry, View, DrawerLayoutAndroid, Text, Alert, Platform } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';
import { AdMobBanner } from 'react-native-admob';
import { setCustomText } from 'react-native-global-props';

// Setting default styles for all Text components.
const customTextProps = {
  style: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'notoserif',
    color: 'black',
    fontStyle: 'bold'
  }
};
setCustomText(customTextProps);

// Create a component
class App extends Component {

  constructor() {
    super();
    this._openDrawer = this._openDrawer.bind(this);
  }

  state = {
    showAds: true
  }

  _bannerError(err) {
    this.setState({ showAds: false });
    Alert.alert(
      'Admob Error',
      'Oops ads cant be served, ' + err,
      [
        { text: 'OK', onPress: () => "" },
      ],
      { cancelable: false }
    );
  }

  _renderAds() {
    if (this.state.showAds === true) {
      return (
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-9221126498873830/7277608582"
          testDeviceID=""
          didFailToReceiveAdWithError={this._bannerError.bind(this)} />
      )
    } else {
      return null;
    }
  }

  _openDrawer() {
    this.drawer.openDrawer();
  }

  render() {
    var _navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={(_drawer) => this.drawer = _drawer}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => _navigationView}>
        <View style={{ flex: 1 }}>
          <Header headerText={'Space Movies'} drawer={this._openDrawer} />
          <AlbumList />
          {this._renderAds()}
        </View>
      </DrawerLayoutAndroid>
    );
  }

}

// Render it to the device
AppRegistry.registerComponent('myRN', () => App);