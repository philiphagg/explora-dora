import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {auth} from '../Firebase/firebaseconfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../Redux/redusers/user";


function Login() {
    const user = useSelector((state) => state.user.value);

    const styles = useSelector((state) => state.theme.value.style);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const navigation = useNavigation();


    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                console.log("User saved", user)
                dispatch(login({id: user.uid,email: user.email, distance: 234322} ))
                //navigation.navigate("Navigationbar")
            }
        })
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                //dispatch(login(user))
                console.log('Registered with : ', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                //dispatch(login(user))
                //dispatch(login({id: user.apiKey,email: user.email} ))
                console.log('logged in with: ', user.email);
            })
            .catch(error => alert(error.message))
    }



    return (
        <KeyboardAvoidingView style={styles.centerContent}
                              behavior={Platform.OS === "ios" ? "padding" : "height"}
                              keyboardVerticalOffset={50}>
            <View styles={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
            <Text>{user.apiKey}</Text>
        </KeyboardAvoidingView>
    )
}


export default Login;


