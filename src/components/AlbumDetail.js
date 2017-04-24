import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import PropTypes from 'prop-types';

const AlbumDetail = ({ album }) => {
    //const { title, artist, thumbnail_image, image, url } = album;
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
                    <Text style={headerTextStyle}>{Title}</Text>
                    <Text>Year {Year}</Text>
                </View>
            </CardSection>

            <CardSection>
                <Image
                    style={imageStyle}
                    source={{ uri: Poster }}
                />
            </CardSection>

            <CardSection>
                <Button onPress={() => Linking.openURL(url + Title)}>
                    Buy Now
                </Button>
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