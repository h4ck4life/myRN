import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, Alert } from 'react-native';
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
        refreshing: false
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
        Axios.get('http://www.omdbapi.com/?s=space', { timeout: 5000 })
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
                this.setState({
                    albums: response.data.Search || [],
                    spinnerIsVisible: false,
                    refreshing: false
                });

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
            <AlbumDetail key={album.Title} album={album} />
        );
    }

    render() {
        return (
            <ScrollView
                style={{backgroundColor: '#F3F3F3'}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                {this._showSpinner()}
                {this._renderAlbums()}
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