import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {List, Avatar, Title, Caption, Drawer} from 'react-native-paper';

import {AuthContext} from './Context/AuthContext';

export function DrawContent(props) {
  // const {signOut} = React.useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={[styles.userInfoSection, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15, marginLeft: 15}}>
              <Avatar.Image source={require('../assets/images/INAS.png')} />
            </View>
            <View style={{marginLeft: 10, marginTop: 15}}>
              <Title style={styles.title}>User's Name</Title>
              <Caption style={styles.caption}>@user.fpt</Caption>
            </View>
          </View>
          <List.Section>
            <List.Accordion
              title="Dashboard"
              left={prop => <List.Icon {...prop} icon="table" />}>
              <List.Accordion
                title="Infrastructurer"
                style={styles.menuLevelOne}
                left={prop => <List.Icon {...prop} icon="factory" />}>
                <List.Item
                  style={styles.menuItem}
                  title="Overview"
                  onPress={() => {
                    props.navigation.navigate('Overview');
                  }}
                />
                <List.Item
                  style={styles.menuItem}
                  title="Branch"
                  onPress={() => {
                    props.navigation.navigate('Branch');
                  }}
                />
              </List.Accordion>
              <List.Accordion
                title="Tool System"
                style={styles.menuLevelOne}
                left={prop => <List.Icon {...prop} icon="tools" />}>
                <List.Item
                  style={styles.menuItem}
                  title="Customer Info"
                  onPress={() => {}}
                />
                <List.Item
                  style={styles.menuItem}
                  title="Power Info"
                  onPress={() => {}}
                />
              </List.Accordion>
            </List.Accordion>
          </List.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          label="Log out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  menuLevelOne: {
    marginLeft: 10,
  },
  menuItem: {
    marginLeft: 20,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
