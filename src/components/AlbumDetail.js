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
            modalImageSource: ''
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
                            source={{ uri: this.props.album.Poster }}
                        />
                    </View>
                    <View style={styles.headerContentStyle}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.headerTextStyle}>{this.props.album.Title}</Text>
                        <Text>Year {this.props.album.Year}</Text>
                    </View>
                </CardSection>

                <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ modalImageSource: this.props.album.Poster, showModal: true }); }}>
                    <CardSection>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: this.props.album.Poster }}
                        />
                    </CardSection>
                </TouchableOpacity>

                <CardSection>
                    <Button onPress={() => Linking.openURL(this._url + this.props.album.Title)}>
                        Buy Now
                </Button>
                    <SocialShare title={'Share to..'} msg={'Checkout this movie ' + this._url + encodeURIComponent(this.props.album.Title) + ' #reactnative #react'} url={this._url + encodeURIComponent(this.props.album.Title)} >
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