import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableWithoutFeedback, Switch, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../../firebase-config';
import { baseStyles } from '../Styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import backgrounds from '../../Enumeration/backgrounds';
import { EnumDiviceCategory } from '../../Enumeration/EnumDiviceCategory';
import { FontAwesome5 } from '@expo/vector-icons';

const RoomScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const homeId = useSelector((store) => store.state.homeId);
  const [roomActive, setRoomActive] = useState(1);
  const [datahome, setDataHome] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // nếu đi từ home sang thì xử lý theo data home gửi sang
    if (props.route && props.route.params && props.route.params.options && props.route.params.options.data) {
      setRoomActive(props.route.params.options.data.id);
    }

    return onValue(ref(db, '/Homes/' + homeId), querySnapShot => {
      let data = querySnapShot.val() || [];
      setDataHome(data);
      setIsLoading(true);
    });
  }, [props]);

  const changeRoom = (item) => {
    setRoomActive(item.id);
  }

  const onOpenViewProfile = () => {
    navigation.replace("Profile", {
      options: {
        parent: "Rooms"
      }
    })
  }

  const toggleSwitch = (index, state) => {
    let path = `Homes/${homeId}/${roomActive - 1}/infoEquipment/`;
    let dataItem = { ...datahome[roomActive - 1].infoEquipment[index], state: !state };
    if (path && dataItem) {
      update(ref(db, path), {
        [index]: dataItem
      })
    }
  }

  const renderItem = ({ item, index, separators }) => (
    <TouchableWithoutFeedback onPress={() => changeRoom(item)}>
      <ImageBackground source={backgrounds[index]} resizeMode='cover' imageStyle={{ borderRadius: 10, width: '100%', height: '100%' }}
        style={[styles.item, roomActive == item.id ? styles.activeRoom : ""]}>
        <View style={styles.roomName}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );

  const renderIconDevice = (element) => {
    let icon = <MaterialCommunityIcons name="lightbulb-on-outline" size={35} color={element.state ? "white" : "#450b00"} />;
    switch (element.type) {
      case EnumDiviceCategory.Lighting:
        icon = <MaterialCommunityIcons name="lightbulb-on-outline" size={35} color={element.state ? "white" : "#450b00"} />
        break;
      case EnumDiviceCategory.Fan:
        icon = <FontAwesome5 name="fan" size={35} color={element.state ? "white" : "#450b00"} />
        break;
      case EnumDiviceCategory.Door:
        if (element.state) {
          icon = <FontAwesome5 name="door-open" size={35} color={element.state ? "white" : "#450b00"} />;
        }
        else {
          icon = <FontAwesome5 name="door-closed" size={35} color={element.state ? "white" : "#450b00"} />;
        }
        break;
      case EnumDiviceCategory.Heater:
        icon = <MaterialCommunityIcons name="car-coolant-level" size={35} color={element.state ? "white" : "#450b00"} />
        break;
      case EnumDiviceCategory.Curtains:
        icon =<MaterialCommunityIcons name="curtains" size={35} color={element.state ? "white" : "#450b00"}/>
        break;
    }

    return icon;
  }

  return isLoading ?
    (
      <View style={styles.container}>
        <View style={baseStyles.row}>
          <View>
            <Text style={styles.dateTime}>February 13, 2020</Text>
            <Text style={baseStyles.h1}>Rooms</Text>
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
              data={datahome}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              contentOffset={{ x: (roomActive - 1) * 100, y: 0 }}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.dataRoom}>
            <Text style={styles.titleRoom}>{datahome[roomActive - 1].title}</Text>
            <View style={styles.equipments}>
              {
                datahome[roomActive - 1].infoEquipment.map((element, index) => {
                  return (
                    <TouchableWithoutFeedback key={index}>
                      <View style={[styles.equipment, element.state ? styles.backgroundActive : styles.backgroundNonActive]}>
                        <View style={{ marginLeft: 'auto', marginTop: 10 }}>
                          <Switch
                            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                            trackColor={{ false: "#767577", true: "#fcd8b6" }}
                            thumbColor={"#FFFFFF"}
                            ios_backgroundColor="#450b00"
                            onValueChange={() => toggleSwitch(index, element.state)}
                            value={element.state} />
                        </View>
                        <View style={{ marginLeft: 25 }}>
                          {renderIconDevice(element)}
                        </View>
                        <View style={styles.nameEquipment}>
                          <Text style={[{ fontSize: 17, fontWeight: '400' }, element.state ? { color: 'white' } : { color: 'black' }]}>{element.nameEquipment}</Text>
                          <Text style={[baseStyles.p, element.state ? { color: 'white' } : { color: 'black' }]}>{element.data}</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })
              }
            </View>
          </View>
        </View>
      </View>
    ) :
    (<View style={baseStyles.loaddingContainer}>
      <ActivityIndicator size="large" color="#FA6400" />
    </View>)
    ;
}

// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffefe0'
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 'auto',
    borderRadius: '50%',
    marginTop: 5

  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  rooms: {
    marginTop: 10,
    width: '90%',
    marginLeft: '5%'
  },
  item: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    marginBottom: 5,
    position: 'relative',
    marginHorizontal: 8,
    borderRadius: 10,
  },
  activeRoom: {
    width: 160,
    height: 160,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  dateTime: {
    fontSize: 15,
    color: '#9BA4B0'
  },
  roomName: {
    marginLeft: '10%',
    position: 'absolute',
    bottom: 15
  },
  dataRoom: {
    marginTop: 20,
    width: '100%',
  },
  titleRoom: {
    fontSize: 23,
    fontWeight: '500'
  },
  equipments: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  equipment: {
    width: '45%',
    height: 170,
    marginTop: 20,
    marginRight: '2%',
    marginLeft: '2%',
    borderWidth: .5,
    borderRadius: 10,
    borderColor: '#B4BBC4',
    position: 'relative'
  },
  nameEquipment: {
    position: 'absolute',
    bottom: 20,
    left: 25,
  },
  backgroundActive: {
    backgroundColor: '#fb8239',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  backgroundNonActive: {
    backgroundColor: '#fff',
  }
});


export default RoomScreen;