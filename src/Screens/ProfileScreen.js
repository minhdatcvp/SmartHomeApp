import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { baseStyles } from '../Styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { useSelector } from 'react-redux';
import { onValue, ref } from 'firebase/database';

const ProfileSreen = (props) => {
    const userId = useSelector((s) => s.state.userId)
    const navigation = useNavigation();
    const [user , setuser] = useState({});

    // 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.replace("Login")
            }
            else {
                if (userId) {
                    const user = onValue(ref(db, '/users/' + userId), querySnapShot => {
                        let data = querySnapShot.val() || [];
                        setuser(data);
                    });
                }
            }
        })

        return unsubscribe
    }, [])

    const onback = () => {
        if (props.route && props.route.params && props.route.params.options && props.route.params.options.parent) {
            navigation.replace("Main", {
                options: {
                    tabActive: props.route.params.options.parent
                }
            });
        }
        else {
            navigation.replace("Main");
        }
    }

    const logoutSmarthome = async () => {
        await signOut(auth)
            .then(() => console.log("User signed out!"));
    }

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={() => onback()} >
                <View style={styles.backPage}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                </View>
            </TouchableNativeFeedback>
            <View style={styles.headerProfile}>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 5, marginBottom: 10 }}>My Profile</Text>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assets/avatar.png')}
                        />
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: '500', color: '#BCC1C8' }}>{user.fullname}</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={baseStyles.row}>
                    <View style={styles.family}>
                        <View style={{ margin: 20 }}>
                            <FontAwesome name="users" size={24} color="white" />
                            <Text style={{ marginTop: 10, color: 'white', fontSize: 12, fontWeight: '500' }}>Lucia, Lucas, Maria</Text>
                        </View>
                        <View style={{ marginLeft: 'auto', marginRight: 10, marginTop: 5 }}>
                            <MaterialCommunityIcons name="dots-horizontal" size={25} color="white" />
                        </View>
                    </View>
                    <View style={styles.boxPush}>
                        <View style={styles.iconPlus}>
                            <Entypo name="plus" size={24} color="#7E8082" />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={styles.optionsSetting}>
                    <View style={[baseStyles.row, styles.itemOption]}>
                        <FontAwesome name="user" size={24} color="#FA6400" />
                        <Text style={{ marginLeft: 20 }}>Personal Info</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
                    </View>
                </View>
                <View style={styles.optionsSetting}>
                    <View style={[baseStyles.row, styles.itemOption]}>
                        <MaterialIcons name="security" size={24} color="#FA6400" />
                        <Text style={{ marginLeft: 20 }}>Security</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
                    </View>
                </View>
                <View style={styles.optionsSetting}>
                    <View style={[baseStyles.row, styles.itemOption]}>
                        <FontAwesome name="user" size={24} color="#FA6400" />
                        <Text style={{ marginLeft: 20 }}> Account Insights</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
                    </View>
                </View>
                <View style={styles.optionsSetting}>
                    <View style={[baseStyles.row, styles.itemOption]}>
                        <MaterialIcons name="policy" size={24} color="#FA6400" />
                        <Text style={{ marginLeft: 20 }}>Privacy Policy</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
                    </View>
                </View>
            </View>
            <TouchableNativeFeedback onPress={() => logoutSmarthome()}>
                <View style={styles.logOut}>
                    <Entypo name="log-out" size={24} color="black" />
                    <Text style={{marginLeft: 10}}>Logout</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

// style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative'
    },
    backPage: {
        position: 'absolute',
        top: 80,
        left: '5%',
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
    headerProfile: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    avatar: {
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginTop: 5,
        marginBottom: 10
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    family: {
        width: '70%',
        backgroundColor: '#FA6400',
        flexDirection: 'row',
        borderRadius: 10,
    },
    boxPush: {
        width: '25%',
        borderWidth: 1,
        marginLeft: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: '#BCC1C8'
    },
    iconPlus: {
        backgroundColor: '#EFF0F2',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsSetting: {
        width: '90%',
        height: 82,
        marginLeft: '5%',
        borderRadius: 20,
        backgroundColor: '#EFF0F2',
        marginTop: 20
    },
    itemOption: {
        height: '100%',
        alignItems: 'center',
    },
    logOut: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        width: '40%',
        left: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
    }
});

export default ProfileSreen;