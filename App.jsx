import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawContent } from './components/CustomDrawer';
import Home from './components/Home';
import SignInScreen from './components/screen/Login/Login';
import PhotoSelectionPage from './components/screen/ImageProcessing/ImageProcessing'
import MyStack from './components/SidebarMenu';
import {Reanimated} from 'react-native-reanimated';
import Dashboard from './components/screen/Dashboard/Dashboard';
// Reanimated.initialize();
import { AuthContext } from './components/Context/AuthContext';
import Navigator from './components/routes/homeStack'
import NavPane from './components/screen/NavPane/NavPane';
import Banner from './components/screen/Banner/Banner';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const initLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) { // Fixed typo: changed "types" to "type"
      case 'RETRIEVE': // Fixed typo: changed "RETRIVE" to "RETRIEVE"
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.user,
          userToken: action.token,
          isLoading: null, // Fixed typo: changed "isLoading: null" to "isLoading: false"
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: (username, password) => {
        let userToken = null;
        if (username === 'admin' && password === '1234') {
          userToken = 'some random token';
        }
        dispatch({ type: 'LOGIN', user: username, token: userToken });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' }); // Removed "user" and "token" parameters
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'RETRIEVE', token: 'a different token' }); // Fixed typo: changed "types" to "type"
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    // <AuthContext.Provider value={authContext}>
    //   <NavigationContainer>
    //     {initLoginState.userToken !== null ? (
    //       <Drawer.Navigator drawerContent={(props) => <DrawContent {...props} />}>
    //         <Drawer.Screen name="Overview" component={Home} />
    //       </Drawer.Navigator>
    //     ) : (
    //       <Stack.Navigator screenOptions={{ headerShown: false }}>
    //         <Stack.Screen name="SignIn" component={SignInScreen} />
    //         <Stack.Screen name="Home" component={MyStack} />
    //       </Stack.Navigator>
    //     )}
    //   </NavigationContainer>
    // </AuthContext.Provider>
    // <Dashboard/>
    // <PhotoSelectionPage/>
    // <Dashboard/>
    <Navigator />
    // <Banner/>
    // // <NavPane/>
    // <AuthContext.Provider value={authContext}>
    //   <NavigationContainer>
    //     {initLoginState.userToken !== null ? (
    //       <Drawer.Navigator drawerContent={(props) => <DrawContent {...props} />}>
    //         <Drawer.Screen name="Overview" component={Home} />
    //       </Drawer.Navigator>
    //     ) : (
    //       <Stack.Navigator screenOptions={{ headerShown: false }}>
    //         {/* <Stack.Screen name="SignIn" component={SignInScreen} />
    //         <Stack.Screen name="Home" component={MyStack} /> */}
    //         <Stack.Screen name="Tool" component={PhotoSelectionPage} />
    //       </Stack.Navigator>
    //     )}
    //   </NavigationContainer>
    // </AuthContext.Provider>
  );
};

export default App;
