import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

export default function App() {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [resultText, setResultText] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            setPhotoUri(photo.uri);
            analyzeImage(photo.uri);
        }
    };

    const analyzeImage = async (imageUri) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpg',
                name: 'photo.jpg',
            });

            const config = {
                method: 'post',
                url: 'http://1.52.246.101:5000/handle-lcd/valid',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            };

            const response = await axios(config);
            console.log('Response:', response.data);
            const { status, message } = response.data;

            if (status) {
                setResultText(message === 'good' ? 'Good' : 'Bad');
            }
        } catch (error) {
            console.log('Error analyzing image:', error);
        }
    };

    const renderDetectorContent = () => {
        if (cameraPermission === true) {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={cameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.back}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    width: 300,
                                    height: 200,
                                    borderWidth: 4,
                                    borderStyle: 'dashed',
                                    borderColor: 'white',
                                    opacity: 1,
                                }}
                            />
                        </View>
                    </Camera>

                    {resultText && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                backgroundColor: resultText === 'Good' ? 'green' : 'red',
                                borderRadius: 8,
                                padding: 8,
                                zIndex: 999,
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{resultText}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={takePhoto}
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 2,
                            borderRadius: 40,
                            padding: 12,
                            width: 80,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'black', fontSize: 14 }}>Capture</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return <ActivityIndicator size="large" color="#1C6758" />;
    };

    return (
        <View style={{ flex: 1 }}>
            {renderDetectorContent()}
            {photoUri && (
                <View
                    style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        padding: 8,
                        zIndex: 999,
                    }}
                >
                    <Image source={{ uri: photoUri }} style={{ width: 100, height: 100 }} />
                </View>
            )}
        </View>
    );
}
