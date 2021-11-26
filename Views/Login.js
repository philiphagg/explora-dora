import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core'
import {KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform} from 'react-native';
import {auth} from '../Firebase/firebaseconfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useSelector} from "react-redux";


function Login() {
    const styles = useSelector((state) => state.theme.value.style);

    const text = 'Login with apple';
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user)
                navigation.navigate("Navigationbar")
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with : ', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
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
        </KeyboardAvoidingView>
    )
}


export default Login;


