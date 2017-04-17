import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, Alert } from 'react-native';
import Axios from 'axios';
import AlbumDetail from './AlbumDetail';
import Spinner from 'react-native-spinkit';

class AlbumList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            albums: [],
            spinnerType: 'ThreeBounce',
            spinnerSize: 70,
            spinnerColor: "#aaaaaa",
            spinnerIsVisible: true,
            refreshing: false
        }

        this._onRefresh = this._onRefresh.bind(this);
        this._reset = this._reset.bind(this);
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
        var parent = this;
        Axios.get('https://api.myjson.com/bins/1csnrf', { timeout: 5000 })
            .catch(function (error) {
                Alert.alert(
                    'API Call Error',
                    'Oops cant get data from remote API, ' + error.message,
                    [
                        {
                            text: 'Retry', onPress: () => {
                                parent._reset();
                            }
                        },
                        {
                            text: 'OK', onPress: () => {
                                parent._reset();
                            }
                        }
                    ],
                    { cancelable: false }
                );
            })
            .then(response => {
                this.setState({
                    albums: response.data || [],
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
            <AlbumDetail key={album.title} album={album} />
        );
    }

    render() {
        return (
            <ScrollView
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