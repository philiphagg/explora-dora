import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {useSelector} from "react-redux";
import {setImageState} from '../../Redux/redusers/camera'
import {addImage} from "../../Firebase/FirebaseFunctions";
import AddPost from "../AddPost";

export default function CameraView({title, lat, lon, styles, user, addPost, setClaim}) {

    const [image, setImage] = React.useState(null);
    const [camera, setCamera] = React.useState(null);
    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data);
            console.log("Image -------------------------------", data.uri);
            //setImageState(data.uri);
            //navigation.navigate("Claim Landmark", {title, lat, lon, data})
        }
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        image != null ?
            <AddPost title={title} lat={lat} lon={lon} image={image} styles={styles} user={user}
                     addPost={(x) => addPost(x)} setClaim={(x) => setClaim(x)}/>
:
    <View style={cameraStyles.container}>
        <Camera
            style={cameraStyles.camera}
            type={type}
            ref={ref => {
                setCamera(ref);
            }}>
            <View style={cameraStyles.buttonContainer}>
                <TouchableOpacity
                    style={cameraStyles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={cameraStyles.text}> Flip </Text>
                </TouchableOpacity>
            </View>
        </Camera>
        <Button title="Snap"
                onPress={() => takePicture()}
        />
    </View>
)
    ;
}

const cameraStyles = StyleSheet.create({
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
