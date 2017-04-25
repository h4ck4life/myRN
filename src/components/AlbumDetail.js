import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity, Modal } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import SocialShare from './SocialShare';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';


const _showCoverPhoto = (imgUrl) => (
    <Modal onRequestClose={() => { }} visible={true} transparent={false}>
        <ImageViewer imageUrls={['https://avatars2.githubusercontent.com/u/7970947?v=3&s=460']} />
    </Modal>
)

const AlbumDetail = ({ album }) => {

    const url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dmovies-tv&field-keywords=';
    const { Title, Year, Poster, image } = album;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle
  } = styles;

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: Poster }}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={headerTextStyle}>{Title}</Text>
                    <Text>Year {Year}</Text>
                </View>
            </CardSection>

            <TouchableOpacity activeOpacity={0.7} onPress={() => { console.log('open photo..'); _showCoverPhoto() }}>
                <CardSection>
                    <Image
                        style={imageStyle}
                        source={{ uri: Poster }}
                    />
                </CardSection>
            </TouchableOpacity>

            <CardSection>
                <Button onPress={() => Linking.openURL(url + Title)}>
                    Buy Now
                </Button>
                <SocialShare title={'Share to..'} msg={'Checkout this movie ' + url + encodeURIComponent(Title) + ' #reactnative #react'} url={url + encodeURIComponent(Title)} >
                    Share
                </SocialShare>
            </CardSection>
        </Card>
    );
};

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