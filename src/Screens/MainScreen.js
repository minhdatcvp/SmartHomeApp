import React, { Fragment, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import RoomScreen from './RoomScreen';
import SettingScreen from './SettingScreen';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { auth } from '../../firebase-config'
import { db } from '../../firebase-config'
import { useDispatch, useSelector } from 'react-redux';
import { onValue, ref } from 'firebase/database';
import { setHomeId } from '../Actions/counts';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector((s) => s.state.userId)

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
                        dispatch(setHomeId(data.home));
                        setIsLoading(true);
                    });
                }
            }
        })

        return unsubscribe
    }, [])

    const getTabActive = () => {
        let tabActive = "Home";
        if (props.route && props.route.params && props.route.params.options && props.route.params.options.tabActive) {
            tabActive = props.route.params.options.tabActive;
        }
        return tabActive;
    }

    return isLoading ?
        (<Tab.Navigator initialRouteName={getTabActive()}>
            <Tab.Screen options={{
                headerShown: false,
                tabBarActiveTintColor: "#FA6400",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                )
            }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarActiveTintColor: "#FA6400",
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="sweden" color={color} size={size} />
                )
            }} name="Rooms" component={RoomScreen} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarActiveTintColor: "#FA6400",
                tabBarIcon: ({ color, size }) => (
                    <SimpleLineIcons name="settings" color={color} size={size} />
                )
            }} name="Settings" component={SettingScreen} />
        </Tab.Navigator>)
        :
        (<View style={styles.container}>
            <ActivityIndicator size="large" color="#FA6400"/>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
});

export default MainScreen;