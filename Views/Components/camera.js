import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {useSelector} from "react-redux";
import {setImageState} from '../../Redux/redusers/camera'

export default function CameraView({route, navigation}) {
    const {title} = route.params;
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            //setImage(data.uri);
            setImageState(data.uri);
            navigation.navigate("Claim Landmark", {title, image})
        }
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref => {
                    setCamera(ref);
                }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <Button title="Snap"
                    onPress={() => takePicture()}
            />
            {
                image && <Image source={{uri: image}} style={{flex: 1}}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
