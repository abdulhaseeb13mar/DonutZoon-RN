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
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="fastfood"
          size={H_W.width * 0.4}
          color={colors.secondary}
        />
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
            backgroundColor: colors.secondary,
            width: H_W.width * 0.6,
            borderRadius: 10,
          }}
          raised
          titleStyle={{fontSize: 20, fontWeight: 'bold', borderRadius: 10}}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
      <MaterialIcons
        name="celebration"
        color="rgba(255,255,255,0.2)"
        style={{
          position: 'absolute',
          bottom: 0,
          right: -H_W.width * 0.1,
          zIndex: -1,
          transform: [{rotateY: '180deg'}],
        }}
        size={H_W.width * 1}
      />
    </WrapperScreen>
  );
}

export default connect(null, {DzresetCart})(React.memo(DzConfirmOrder));
