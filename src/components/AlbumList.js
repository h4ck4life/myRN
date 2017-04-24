import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, Alert, Dimensions } from 'react-native';
import Axios from 'axios';
import AlbumDetail from './AlbumDetail';
import Spinner from 'react-native-spinkit';

class AlbumList extends Component {

    state = {
        albums: [],
        spinnerType: 'ThreeBounce',
        spinnerSize: 70,
        spinnerColor: "#aaaaaa",
        spinnerIsVisible: true,
        refreshing: false,
        page: 1
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.setState({
            albums: []
        });
        this._getAlbumList();
    }

    _reset() {
        this.setState({
            albums: [],
            spinnerIsVisible: false,
            refreshing: false
        });
    }

    _getAlbumList() {
        // prev url: https://api.myjson.com/bins/1csnrf
        var _componentScope = this;
        Axios.get('http://www.omdbapi.com/?s=space&page=' + _componentScope.state.page || 1, { timeout: 5000 })
            .catch(function (error) {
                Alert.alert(
                    'API Call Error',
                    'Oops cant get data from remote API, ' + error.message,
                    [
                        {
                            text: 'Retry', onPress: () => {
                                _componentScope._reset();
                            }
                        },
                        {
                            text: 'OK', onPress: () => {
                                _componentScope._reset();
                            }
                        }
                    ],
                    { cancelable: false }
                );
            })
            .then(response => {
                if (_componentScope.state.page && _componentScope.state.page > 1) {
                    _componentScope.setState({
                        albums: _componentScope.state.albums.concat(response.data.Search),
                        spinnerIsVisible: false
                    });
                    //console.log(_componentScope.state.albums);
                } else {
                    _componentScope.setState({
                        albums: response.data.Search || [],
                        spinnerIsVisible: false,
                        refreshing: false
                    });
                }
                _componentScope.setState({ page: _componentScope.state.page + 1 });
            });
    }

    componentWillMount() {
        this._getAlbumList();
    }

    _showSpinner() {
        return (
            <View style={styles.container}>
                <Spinner style={styles.spinner} isVisible={this.state.spinnerIsVisible} size={this.state.spinnerSize} type={this.state.spinnerType} color={this.state.spinnerColor} />
            </View>
        );
    }

    _renderAlbums() {
        return this.state.albums.map(album =>
            <AlbumDetail key={album.Title + Math.round(new Date().getTime()/1000)} album={album} />
        );
    }

    _onScroll(e) {
        var _componentScope = this;
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset - 124 >= height) {
            console.log('end of scroll..');
            _componentScope.setState({ spinnerIsVisible: true });
            _componentScope._getAlbumList();
        }
    }

    render() {
        return (
            <ScrollView
                style={{ backgroundColor: '#F3F3F3' }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                onScroll={this._onScroll.bind(this)}
            >
                {this._renderAlbums()}
                {this._showSpinner()}
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        marginTop: 20,
        marginBottom: 20

    }
});

export default AlbumList;