import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { changeCount } from '../Actions/counts';
import { bindActionCreators } from 'redux';
import { baseStyles } from '../Styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const SettingScreen = (props) => {
  const navigation = useNavigation();

  const onOpenViewProfile = () => {
    navigation.replace("Profile", {
      options: {
        parent: "Settings"
      }
    })
  }

  const onOpenViewChangePW = () => {
    navigation.replace("ChangePassword")
}


  return (
    <View style={styles.container}>
      <View style={baseStyles.row}>
        <View>
          <Text style={baseStyles.dateTime}>February 13, 2020</Text>
          <Text style={baseStyles.h1}>Setting</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => onOpenViewProfile()}>
          <View style={baseStyles.avatar}>
            <Image
              style={baseStyles.tinyLogo}
              source={require('../../assets/avatar.png')}
            />
          </View>
        </TouchableWithoutFeedback>

      </View>
      <View style={baseStyles.row}>
        <View style={styles.instruction}>
          <View style={{ width: '50%' }}>
            <MaterialCommunityIcons name="book" size={25} color="#FA6400" />
            <Text style={{ fontSize: 13, marginBottom: 8, marginTop: 8 }}>Instruction</Text>
            <Text style={{ fontSize: 10, color: '#7E8082' }}>Understandable instruction</Text>
          </View>
        </View>
        <View style={[styles.instruction, { marginLeft: 'auto' }]}>
          <View style={{ width: '50%' }}>
            <AntDesign name="message1" size={25} color="#FA6400" />
            <Text style={{ fontSize: 13, marginBottom: 8, marginTop: 8 }}>You need help ?</Text>
            <Text style={{ fontSize: 10, color: '#7E8082' }}>Contact Support</Text>
          </View>
        </View>

      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableWithoutFeedback onPress={() => onOpenViewChangePW()}>
          <View style={styles.optionsSetting}>
            <View style={[baseStyles.row, styles.itemOption]}>
              <FontAwesome name="user" size={24} color="#FA6400" />
              <Text style={{ marginLeft: 20 }}>Password</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.optionsSetting}>
          <View style={[baseStyles.row, styles.itemOption]}>
            <FontAwesome name="language" size={24} color="#FA6400" />
            <Text style={{ marginLeft: 20 }}>Languages</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
          </View>
        </View>
        <View style={styles.optionsSetting}>
          <View style={[baseStyles.row, styles.itemOption]}>
            <Entypo name="power-plug" size={24} color="#FA6400" />
            <Text style={{ marginLeft: 20 }}>Power Consuption</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
          </View>
        </View>
        <View style={styles.optionsSetting}>
          <View style={[baseStyles.row, styles.itemOption]}>
            <Entypo name="home" size={24} color="#FA6400" />
            <Text style={{ marginLeft: 20 }}>Home Page Settings</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{ marginLeft: 'auto' }} />
          </View>
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
  instruction: {
    marginTop: 20,
    borderWidth: 1,
    width: '47%',
    height: 142,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#B4BBC4',
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
  }
});

// store
const mapStateToProps = function (state) {
  return {
    roomActive: state.state.roomActive,
  }
}

const ActionCreators = Object.assign(
  {},
  changeCount,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);