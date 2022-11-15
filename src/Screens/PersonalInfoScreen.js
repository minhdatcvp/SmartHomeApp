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

const PersonalInfoScreen = (props) => {
    const navigation = useNavigation();

    const onback = () => {
        navigation.replace("Profile");
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
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 5, marginBottom: 10 }}>Personal Info</Text>
                </View>
            </View>
            <View style={{ marginTop: 50 }}>
                <View style={styles.itemInfo}>
                    <Text style={styles.titleInfo}>Name</Text>
                    <Text style={styles.contentInfo}>{props.route.params.options.data.fullname}</Text>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.titleInfo}>Email</Text>
                    <Text style={styles.contentInfo}>{props.route.params.options.data.email}</Text>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.titleInfo}>Phone</Text>
                    <Text style={styles.contentInfo}>{props.route.params.options.data.phone}</Text>
                </View>
            </View>
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
    itemInfo: {
        width: '90%',
        marginTop:20,
        marginBottom:10,
        marginLeft: '5%',
        borderBottomColor: '#BDC4CC',
        borderBottomWidth: 1,
    },
    titleInfo: {
        fontSize: 13,
        color: '#BCC1C8',
        marginBottom: 10,
    },
    contentInfo:{
        fontSize: 17,
        color: 'black',
        marginBottom: 10,
    }
});

export default PersonalInfoScreen;