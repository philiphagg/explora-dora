import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {auth} from '../Firebase/firebaseconfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../Redux/Redusers/user";

/**
 * View that displays the login screen for the user and handles
 * firebase auth
 *
 * @returns {JSX.Element}
 * @constructor
 */
function LoginView() {

    const styles = useSelector((state) => state.theme.value.style);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(login({id: user.uid, email: user.email}));
            }
        })
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
            const user = userCredentials.user;

            dispatch(login({id: user.uid, email: user.email}));
        }).catch(error => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
            const user = userCredentials.user;
            dispatch(login({id: user.uid, email: user.email}));
        }).catch(error => alert(error.message))
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
        </KeyboardAvoidingView>
    )
}


export default LoginView;


