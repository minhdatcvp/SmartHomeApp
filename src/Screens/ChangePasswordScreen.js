import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, TouchableNativeFeedback } from 'react-native'
import { auth, db } from '../../firebase-config'
import { baseStyles } from '../Styles/styles';
import Toast from 'react-native-root-toast';
import { MaterialIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { RoomDefault } from '../../Enumeration/RoomDefault';
import { authErrors } from '../../Enumeration/autherror';
import { push, ref, update } from 'firebase/database';
import { async } from '@firebase/util';
import { Ionicons } from '@expo/vector-icons';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

// màn đăng ký
const SingUpScreen = () => {
    // tài khoản
    const [currentpassword, setCurrentPassword] = useState('')
    // mật khẩu
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true);
    // chuyển view
    const navigation = useNavigation()

    // 
    useEffect(() => {

    }, []);

    // get data pass
    const reauthenticate = (currentPassword) => {
        var user = auth.currentUser;
        var cred = EmailAuthProvider.credential(
            user.email, currentPassword);
        return reauthenticateWithCredential(user, cred);
    }

    const changePass = async () => {
        if (password != '' && currentpassword != '') {
            reauthenticate(currentpassword).then((res) => {
                var user = auth.currentUser;
                updatePassword(user, password).then(() => {
                    toastMessage("Thay đổi mật khẩu thành công!");
                    onback();
                }).catch((error) => {
                    alert(JSON.stringify(error))
                });
            }).catch((error) => {
                toastMessage("Mật khẩu hiện tại không đúng.");
            });

        }
        else {
            toastMessage("Bạn phải nhập đủ thông tin.");
        }
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

    const onback = () => {
        navigation.replace("Main", {
            options: {
                tabActive: "Settings"
            }
        });
    }

    // render
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
                <TouchableNativeFeedback onPress={() => onback()} >
                    <View style={styles.backPage}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.headerLogin}>
                    <Text style={baseStyles.h2}>Change Password</Text>
                </View>
                <View style={styles.contentLogin}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Current Password"
                            value={currentpassword}
                            keyboardType='default'
                            onChangeText={text => setCurrentPassword(text)}
                            style={styles.input}

                            secureTextEntry={hidePass ? true : false}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            keyboardType='default'
                            onChangeText={text => setPassword(text)}
                            style={styles.input}

                            secureTextEntry={hidePass ? true : false}
                        />
                        <Ionicons style={styles.showhidePass} name={hidePass ? 'ios-eye-off' : 'ios-eye'} size={22} color="#9d9d9d" onPress={() => setHidePass(!hidePass)} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => changePass()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}


export default SingUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    backPage: {
        marginLeft: '5%',
        width: 38,
        height: 36,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#EFF0F2',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        zIndex: 2
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
    showhidePass: {
        position: 'absolute',
        bottom: 15,
        right: 15
    }
})