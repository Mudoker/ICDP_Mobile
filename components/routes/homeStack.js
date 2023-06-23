import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DashboardPage from '../screen/Dashboard/Dashboard';
import PhotoSelectionPage from '../screen/ImageProcessing/ImageProcessing';
import NavPane from '../screen/NavPane/NavPane';
import { Banner } from 'react-native-paper';
import Login from '../screen/Login/Login';
import OTPScreen from '../screen/OTP/OTPView';
import Status from '../screen/ImageProcessing/Status';
const screens = {
  // Register screens
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false, // Hide the screen title
    },
  },
  Dashboard: {
    screen: DashboardPage,
    navigationOptions: {
      headerShown: false, // Hide the screen title
    },

  },
  PhotoSelectionPage: {
    screen: PhotoSelectionPage,
    navigationOptions: {
      headerShown: false, // Hide the screen title
    },
  },
  NavPane: {
    screen: NavPane,
    navigationOptions: {
      headerShown: false, // Hide the screen title
    },
  },
  Banner: {
    screen: Banner,
    navigationOptions: {
      headerShown: false, // Hide the screen title
    },
  },
    Status: {
    screen: Status,
    navigationOptions: {
      headerShown: false, // Hide the screen title
    },
  }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);