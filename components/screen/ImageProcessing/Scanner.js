import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraPermissionStatus, requestCameraPermission, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import axios from 'axios';

export default function App() {
    const [cameraPermission, setCameraPermission] = useState();
    const [photoUri, setPhotoUri] = useState(null);
    const [resultText, setResultText] = useState(null);
    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const cameraPermissionStatus = await Camera.requestCameraPermission();
            setCameraPermission(cameraPermissionStatus);
        })();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto({
                quality: 'high',
                exif: true,
            });
            setPhotoUri('file://' + photo.path);
            analyzeImage('file://' + photo.path);
        }
    };

    const analyzeImage = async (imageUri) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: element?.uri,  // ! Path image
                // type: 'image/jpg',
                name: element?.name + '.jpg'// ! Name image add
            });
            let config = {
                method: 'post',
                url: 'http://1.52.246.101:5000/handle-lcd/valid',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };
            const response = await axios.post(config);
            console.log('Response:', response.data);
            const { status, message } = response.data;

            if (status) {
                setResultText(message === 'good' ? 'Good' : 'Bad');
            }
        } catch (error) {
            console.log('Error analyzing image:', error);
        }
    };

    const devices = useCameraDevices();
    const cameraDevice = devices.back;

    const renderDetectorContent = () => {
        if (cameraDevice && cameraPermission === 'authorized') {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={cameraRef} style={{ flex: 1 }} device={cameraDevice} isActive={true} photo={true} />

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

                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                </View>
            );
        }
        return <ActivityIndicator size="large" color="#1C6758" />;
    };

    // const processFrame = async ({ data, width, height }) => {
    //     const luminance = data[0];
    //     const imageUri = `data:image/jpeg;base64,${luminance}`;
    //     analyzeImage(imageUri);
    // };

    // useFrameProcessor(processFrame);

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
                    <Image source={{ uri: 'file://' + photoUri }} style={{ width: 100, height: 100 }} />
                </View>
            )}
        </View>
    );
}
