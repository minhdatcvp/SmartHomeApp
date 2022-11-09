import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, TouchableNativeFeedback } from 'react-native'
import { auth } from '../../firebase-config'
import { SocialIcon } from 'react-native-elements'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithCredential,
    sendPasswordResetEmail,
    signInWithPopup,
} from 'firebase/auth';
import { baseStyles } from '../Styles/styles';
import { authErrors } from '../../Enumeration/autherror'
import { useDispatch, useSelector } from 'react-redux'
import { setuser } from '../Actions/counts'
import Toast from 'react-native-root-toast';

// màn đăng nhập
const LoginScreen = (props) => {
    // tài khoản
    const [email, setEmail] = useState('')
    // mật khẩu
    const [password, setPassword] = useState('')
    // chuyển view
    const navigation = useNavigation()

    // call store bắt sự kiện action
    const dispatch = useDispatch();
    // call store lấy state
    const userId = useSelector((store) => store.state.userId);

    // 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(setuser(user.uid));
                navigation.replace("Main")
            }
        })
        return unsubscribe
    }, [])

    // đăng nhập
    const handleLogin = async () => {

        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => {
                // trường hợp lỗi do firebase trả về
                createTwoButtonAlert("Đăng nhập thất bại", authErrors[error.code.split("/")[1]]);
            })
    }
    // quên mật khẩu
    const forgotPassword = async () => {
        // lấy ra email
        if (email != "") {
            await sendPasswordResetEmail(auth, email)
                .then(function (user) {
                    toastMessage('Vui lòng kiểm tra email của bạn...');
                }).catch(function (e) {
                    console.log(e)
                })
        }
        else {
            toastMessage('Vui lòng nhập email của bạn.');
        }
    }

    const singUpApp = () => {
        navigation.replace("SignUp");
    }

    // Toast mess
    const toastMessage = (msg) => {
        let toast = Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });

        setTimeout(function () {
            Toast.hide(toast);
        }, 1000);
    }

    // alert
    const createTwoButtonAlert = (title, message) =>
        Alert.alert(
            title || 'Thông báo',
            message || "My Alert Msg",
            [
                { text: "OK" }
            ]
        );

    const handleLoginOther = () => {
        alert(JSON.stringify(userId))
    }

    // render
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
                <View style={styles.headerLogin}>
                    <Text style={baseStyles.h2}>Welcome</Text>
                    <Text style={baseStyles.span}>to smart home system</Text>
                </View>
                <View style={styles.contentLogin}>
                    <View style={styles.inputContainer}>
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
                    <TouchableNativeFeedback onPress={() => forgotPassword()}>
                        <Text style={[baseStyles.p, styles.forgotpass]}>Forgot Password?</Text>
                    </TouchableNativeFeedback>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => handleLogin()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={baseStyles.p}>Don't have an account ?  <Text style={{color: '#FA6400'}} onPress={() => singUpApp()}>Signup Now</Text></Text>
                </View>
                <View style={[styles.contentLogin, styles.ortherLogin]}>
                    <View style={baseStyles.row}>
                        <View style={baseStyles.line} />
                        <Text style={styles.textOther}>or login with</Text>
                        <View style={baseStyles.line} />
                    </View>
                    <View style={baseStyles.row}>
                        <View style={[styles.buttonLoginOther, styles.loginWithFB]}>
                            <SocialIcon
                                onPress={() => handleLoginOther()}
                                style={[styles.button, styles.buttonloginWithFB]}
                                title='Facebook'
                                button
                                type='facebook'
                            />
                        </View>
                        <View style={[styles.buttonLoginOther, styles.loginWithGG]}>
                            <SocialIcon
                                // onPress={handleLogin}
                                style={[styles.button, styles.buttonloginWithGG]}
                                title='Google'
                                button
                                type='google'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        width: '100%',
        height: '100%'
    },
    headerLogin: {
        margin: 24,
        marginBottom: 70,
        marginTop: 100
    },
    contentLogin: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        height: 60,
    },
    forgotpass: {
        marginLeft: 'auto',
        marginRight: 24,
    },
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#FA6400',
        width: '100%',
        height: 60,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
    ortherLogin: {
        marginTop: 100,
    },
    textOther: {
        fontSize: 12,
        marginLeft: 10,
        marginRight: 10
    },
    buttonLoginOther: {
        width: '40%',
        marginTop: 20,
    },
    loginWithFB: {
        marginLeft: '5%',
    },
    loginWithGG: {
        marginLeft: '10%'
    },
    buttonloginWithFB: {
        backgroundColor: '#3695f1'
    },
    buttonloginWithGG: {
        backgroundColor: '#f33e3e'
    }
})