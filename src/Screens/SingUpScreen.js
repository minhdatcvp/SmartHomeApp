import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, TouchableNativeFeedback } from 'react-native'
import { auth, db } from '../../firebase-config'
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
import Toast from 'react-native-root-toast';
import { MaterialIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { RoomDefault } from '../../Enumeration/RoomDefault';
import { authErrors } from '../../Enumeration/autherror';
import { push, ref, update } from 'firebase/database';
import { async } from '@firebase/util';
import { Ionicons } from '@expo/vector-icons'; 

// màn đăng ký
const SingUpScreen = () => {
    // tài khoản
    const [email, setEmail] = useState('')
     // tài khoản
     const [phone, setPhone] = useState('')
    // mật khẩu
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true);
    // tên
    const [fullName, setFullName] = useState('')
    // chuyển view
    const navigation = useNavigation()

    // 
    useEffect(() => {

    }, [])

    // đăng ký
    const handleSignUp = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                if (user) {
                    let key = user.uid;
                    let uuidHome = uuid.v4();
                    let dataUser = {
                        fullname: fullName,
                        email: email,
                        phone: phone,
                        home: uuidHome
                    }

                    // thêm user
                    update(ref(db, "/users"), {
                        [key]: dataUser
                    })

                    // thêm home cho user
                    update(ref(db, "/Homes"), {
                        [uuidHome]: RoomDefault
                    })


                    logInSmarthome();
                }
                else {
                    toastMessage("Đăng ký thất bại")
                }
            })
            .catch(error => {
                createTwoButtonAlert("Đăng ký thất bại", authErrors[error.code.split("/")[1]]);
            })
    }

    const logInSmarthome = async () => {
        navigation.replace("Login");
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

    // render
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
                <View style={styles.headerLogin}>
                    <Text style={baseStyles.h2}>Create Account</Text>
                </View>
                <View style={styles.contentLogin}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Họ và tên"
                            value={fullName}
                            onChangeText={text => setFullName(text)}
                            style={styles.input}
                            keyboardType='default'
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                            keyboardType='email-address'
                        />
                         <TextInput
                            placeholder="Phone"
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            style={styles.input}
                            keyboardType='phone-pad'
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            keyboardType='default'
                            onChangeText={text => setPassword(text)}
                            style={styles.input}

                            secureTextEntry={hidePass ? true : false}
                        />
                        <Ionicons style={styles.showhidePass}  name={hidePass ? 'ios-eye-off' : 'ios-eye'} size={22} color="#9d9d9d" onPress={() => setHidePass(!hidePass)}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => handleSignUp()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            <TouchableNativeFeedback onPress={() => logInSmarthome()}>
                <View style={styles.logIn}>
                    <MaterialIcons name="login" size={24} color="black" />
                    <Text style={{ marginLeft: 10 }}>Sign In</Text>
                </View>
            </TouchableNativeFeedback>
        </KeyboardAvoidingView>
    )
}


export default SingUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        width: '100%',
        height: '100%',
        position: 'relative'
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
    logIn: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        width: '40%',
        left: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showhidePass:{
        position: 'absolute',
        bottom:15,
        right:15
    }
})