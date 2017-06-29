import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableOpacity, Modal } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import SocialShare from './SocialShare';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';

class AlbumDetail extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            showModal: false,
            modalImageSource: '',
            posterUrl: this.props.album.poster_path == null ? 'http://www.technicaltextilesfinder.com/images/NoImageAvailable.png' : 'https://image.tmdb.org/t/p/w500' + this.props.album.poster_path
        }

        this._url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dmovies-tv&field-keywords=';
    }

    render() {
        return (
            <Card>
                <Modal animationType={'fade'} onRequestClose={() => { this.setState({ showModal: false }) }} visible={this.state.showModal} transparent={false}>
                    <ImageViewer imageUrls={[{url: this.state.modalImageSource}]} />
                </Modal>
                <CardSection>
                    <View style={styles.thumbnailContainerStyle}>
                        <Image
                            style={styles.thumbnailStyle}
                            source={{ uri: this.state.posterUrl }}
                        />
                    </View>
                    <View style={styles.headerContentStyle}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.headerTextStyle}>{this.props.album.original_name}</Text>
                        <Text>First Air Date: {this.props.album.first_air_date == '' ? 'Unknown' : this.props.album.first_air_date}</Text>
                    </View>
                </CardSection>

                <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ modalImageSource: this.state.posterUrl, showModal: true }); }}>
                    <CardSection>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: this.state.posterUrl }}
                        />
                    </CardSection>
                </TouchableOpacity>

                <CardSection>
                    <Button onPress={() => Linking.openURL(this._url + this.props.album.original_name)}>
                        Buy Now
                </Button>
                    <SocialShare title={'Share to..'} msg={'Checkout this movie ' + this._url + encodeURIComponent(this.props.album.original_name) + ' #reactnative #react'} url={this._url + encodeURIComponent(this.props.album.Title)} >
                        Share
                </SocialShare>
                </CardSection>
            </Card>
        )
    }

}

AlbumDetail.propTypes = {
    album: PropTypes.any.isRequired
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};

export default AlbumDetail;