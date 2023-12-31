import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        try {
            const imageFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            const imageUris = imageFiles.map((file) => FileSystem.documentDirectory + file);
            setImages(imageUris);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    const handleImagePress = (imageUri) => {
        // Navigate to ImageDetails with the selected image URI
        navigation.navigate('ImageDetails', { imageUri });
    };

    return (
        <View>
            <FlatList
                data={images}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImagePress(item)}>
                        <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 5 }} />
                    </TouchableOpacity>
                )}
                numColumns={3}
            />
        </View>
    );
};

export default ImageGallery;
