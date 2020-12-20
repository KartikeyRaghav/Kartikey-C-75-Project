import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  FontAwesome5,
  MaterialCommunityIcons,
} from 'react-native-vector-icons';
import ReadingScreen from './screens/ReadingScreen';
import WritingScreen from './screens/WritingScreen.js';
import LoginScreen from './screens/LoginScreen'

export default class App extends React.Component {
  render() {
    return (

      <AppContainer />

    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Write: { screen: WritingScreen },
  Read: { screen: ReadingScreen },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, color }) => {
        const routeName = navigation.state.routeName;
        let iconName;
        if (routeName === "Read") {
          if ((iconName = focused)) {
            color = 'blue';
          }
          return (
            <FontAwesome5 name="book-reader" size={30} color={color} />
          );

        }
        else if (routeName === "Write") {
          if ((iconName = focused)) {
            color = 'red';
          }
          return (
            <MaterialCommunityIcons
              name="typewriter"
              size={30}
              color={color}
            />
          );

        }
      }
    })
  }
);
const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: TabNavigator }
})

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});