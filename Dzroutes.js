import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './DzComp/DzRefNavigation';
import DzHome from './DzSrc/DzHome';
import DzSP from './DzSrc/DzSP';
import DzCart from './DzSrc/DzCart';
// import DzFav from './DzSrc/DzFav';
import DzContact from './DzSrc/DzContact';
import DzConfirmOrder from './DzSrc/DzConfirmOrder';
import DzSearch from './DzSrc/DzSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="DzHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="DzHome" component={DzHome} />
        <Stack.Screen name="DzSP" component={DzSP} />
        {/* <Stack.Screen name="DzFav" component={DzFav} /> */}
        <Stack.Screen name="DzCart" component={DzCart} />
        <Stack.Screen name="DzContact" component={DzContact} />
        <Stack.Screen name="DzConfirmOrder" component={DzConfirmOrder} />
        <Stack.Screen name="DzSearch" component={DzSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
