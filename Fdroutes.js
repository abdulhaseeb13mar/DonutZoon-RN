import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './FdComp/FdRefNavigation';
import FdHome from './FdSrc/FdHome';
import FdSP from './FdSrc/FdSP';
import FdFav from './FdSrc/FdFav';
import FdCart from './FdSrc/FdCart';
import FdContact from './FdSrc/FdContact';
// import FdConfirmOrder from './FdSrc/FdConfirmOrder';
import FdSearch from './FdSrc/FdSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="FdHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="FdHome" component={FdHome} />
        <Stack.Screen name="FdSP" component={FdSP} />
        <Stack.Screen name="FdFav" component={FdFav} />
        <Stack.Screen name="FdCart" component={FdCart} />
        <Stack.Screen name="FdContact" component={FdContact} />
        {/* <Stack.Screen name="FdConfirmOrder" component={FdConfirmOrder} /> */}
        <Stack.Screen name="FdSearch" component={FdSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
