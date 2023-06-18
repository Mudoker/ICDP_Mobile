import * as React from 'react';
import {View, Button, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawContent} from './CustomDrawer';
import Home from './Home';

const Drawer = createDrawerNavigator();

const MyStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawContent {...props} />}>
      <Drawer.Screen name="Overview" component={Home} />
      <Drawer.Screen name="Branch" component={Branch} />
    </Drawer.Navigator>
  );
};

const Branch = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

export default MyStack;
