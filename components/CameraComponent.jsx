import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            // Save the captured image to a local folder
            const savedImage = await saveImage(photo);
            setCapturedImage(savedImage);
        }
    };

    const saveImage = async (photo) => {
        const { uri } = photo;
        const fileName = uri.split('/').pop(); // Extracts the file name from the URI
        const newUri = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: uri,
                to: newUri,
            });
            return newUri;
        } catch (error) {
            console.error('Error saving image:', error);
            return null;
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {capturedImage ? (
                <View>
                    <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />
                    <Button title="Retake Picture" onPress={() => setCapturedImage(null)} />
                </View>
            ) : (
                <Camera ref={cameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.back}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button title="Take Picture" onPress={takePicture} />
                    </View>
                </Camera>
            )}
        </View>
    );
};

export default CameraComponent;