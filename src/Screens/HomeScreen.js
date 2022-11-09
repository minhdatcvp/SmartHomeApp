import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, Switch, TouchableWithoutFeedback } from 'react-native';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../../firebase-config';
import { baseStyles } from '../Styles/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core'

// data list room
const DATA = [
  {
    id: 1,
    background: require('../../assets/livingroom.png'),
    title: 'Living Room',
    divices: 3
  },
  {
    id: 2,
    background: require('../../assets/mediaroom.png'),
    title: 'Media Room',
    divices: 2
  },
  {
    id: 3,
    background: require('../../assets/bathroom.png'),
    title: 'Bath Room',
    divices: 3
  },
  {
    id: 4,
    background: require('../../assets/bedroom.png'),
    title: 'Bed Room',
    divices: 3
  }
];

const HomeScreen = (props) => {
  const navigation = useNavigation()

  const changeRoom = (data) => {
    props.navigation.navigate('Rooms', {
      options: {
        data: data
      }
    })
  }

  const onOpenViewProfile = () => {
    navigation.replace("Profile", {
      options : {
        parent: "Home"
      }
    })
  }

  const renderItem = (data) => (
    <TouchableWithoutFeedback onPress={() => changeRoom(data.item)}>
      <ImageBackground source={data.item.background} resizeMode='cover' imageStyle={{ borderRadius: 20, width: '100%' }} style={[styles.item]}>
        <View style={styles.roomName}>
          <Text style={styles.title}>{data.item.title}</Text>
          <Text style={styles.titleDivice}>{data.item.divices} Devices</Text>
        </View>

      </ImageBackground>
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    return onValue(ref(db, '/leds'), querySnapShot => {
      let data = querySnapShot.val() || [];
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={baseStyles.row}>
        <View>
          <Text style={styles.dateTime}>February 13, 2020</Text>
          <Text style={baseStyles.h1}>Welcome home</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => onOpenViewProfile()}>
          <View style={styles.avatar}>
            <Image
              style={styles.tinyLogo}
              source={require('../../assets/avatar.png')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.rooms}>
        <View >
          <FlatList
            data={DATA}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}

// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 'auto',
    borderRadius: '50%',
    borderWidth: 1,
    marginTop: 5

  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  rooms: {
    marginTop: 10,
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    width: '100%',
    height: 170,
    marginBottom: 5,
    position: 'relative'
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    color: 'white',
  },
  titleDivice: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
    marginTop: 5
  },
  dateTime: {
    fontSize: 15,
    color: '#9BA4B0'
  },
  roomName: {
    marginLeft: '10%',
    position: 'absolute',
    bottom: 30
  }
});

// store
const mapStateToProps = function (state) {
  return {
    roomActive: state.state.roomActive,
  }
}

const ActionCreators = Object.assign(
  {}
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);