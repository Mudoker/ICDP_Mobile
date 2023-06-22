import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import DashboardPage from '../screen/Dashboard/Dashboard';
import PhotoSelectionPage from '../screen/ImageProcessing/ImageProcessing';
import { create } from 'react-test-renderer';
import NavPane from '../screen/NavPane/NavPane';
const screens = {
    NavPane: {
        screen: NavPane
    },
    Dashboard: {
        screen: DashboardPage
    },
    PhotoSelectionPage: {
        screen: PhotoSelectionPage
    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);