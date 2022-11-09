import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import MainScreen from './src/Screens/MainScreen';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import ProfileSreen from './src/Screens/ProfileScreen';
import { RootSiblingParent } from 'react-native-root-siblings';
import SingUpScreen from './src/Screens/SingUpScreen';

const store = configureStore()
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <Provider
        store={store}
      // initialState={myInitialState}
      // loading={/* your loading UI*/}
      >
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SingUpScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileSreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
}


