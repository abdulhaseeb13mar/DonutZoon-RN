/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {View, Text} from 'react-native';
import {H_W} from '../DzComp/DzDim';
import {colors} from '../DzComp/DzColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import NavigationRef from '../DzComp/DzRefNavigation';
import {connect} from 'react-redux';
import {DzresetCart} from '../DzRedux/DzActions';

function DzConfirmOrder(props) {
  const ResetAndGoHome = () => {
    props.DzresetCart();
    NavigationRef.NavigateAndReset('DzHome');
  };
  return (
    <WrapperScreen
      barStyle="light-content"
      statusBar={colors.primary}
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons name="icecream" size={H_W.width * 0.4} color="white" />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            width: H_W.width * 0.9,
            marginTop: 15,
          }}>
          WE HAVE RECEIVED YOUR ORDER
        </Text>
        <Button
          onPress={ResetAndGoHome}
          title="Get More Food!"
          buttonStyle={{
            backgroundColor: 'white',
            width: H_W.width * 0.6,
            borderRadius: 10,
          }}
          raised
          titleStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            borderRadius: 10,
            color: colors.primary,
          }}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {DzresetCart})(React.memo(DzConfirmOrder));
