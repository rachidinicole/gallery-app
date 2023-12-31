import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

const ImageDetails = () => {
    const route = useRoute();
    const { imageUri } = route.params || {};
    const image = getImageDetails(imageUri);

    const getImageDetails = (uri) => {
        const location = 'Dummy Location';
        const creationTime = new Date();
        return { uri, location, creationTime };
    };

    const handleDelete = async () => {
        try {
            await MediaLibrary.deleteAssetsAsync([imageUri]);
            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <View style={styles.detailsContainer}>
                {image.location && <Text style={styles.text}>Location: {image.location}</Text>}
                {image.creationTime && (
                    <Text style={styles.text}>
                        Capture Date: {format(new Date(image.creationTime), 'MMMM dd, yyyy HH:mm')}
                    </Text>
                )}
            </View>
            <Button title="Delete" onPress={handleDelete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    detailsContainer: {
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ImageDetails;
