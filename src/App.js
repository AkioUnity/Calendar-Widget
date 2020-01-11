import React from 'react';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';

import Main from './pages/main';
import Home from './container/HomeContainer';
import SideBar from './pages/sidebar';
import Calendar from './pages/calendar';
import Information from './pages/information';
import Album from './pages/album';

const Drawer = createDrawerNavigator(
  {
      // WebRoute: { screen: WebView },
      Home: {screen: Home},
  },
  {
      initialRouteName: 'Home',
      contentOptions: {
          activeTintColor: '#e91e63',
      },
      contentComponent: props => <SideBar {...props} />,
  },
);

const AppNavigator = createStackNavigator(
  {
      Main: {screen: Main},
      Calendar: {screen: Calendar},
      Information: {screen: Information},
      Album: {screen: Album},
  },
  {
      initialRouteName: 'Main',
      headerMode: 'none',
  },
);
const App = createAppContainer(AppNavigator);
export default App;
