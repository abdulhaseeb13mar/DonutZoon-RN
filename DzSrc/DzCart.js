/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  DzremoveCartAction,
  DzaddCartAction,
  DzsetCurrentProductAction,
  DzsetFavAction,
  DzremoveFavAction,
  DzresetCart,
} from '../DzRedux/DzActions';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../DzComp/DzColor';
import {H_W} from '../DzComp/DzDim';
import RefNavigation from '../DzComp/DzRefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import {DzVerticalTile} from './DzHome';
import Loop from '../DzComp/DzFlatList';
import UseHeader from '../DzComp/DzHeader';
import DzItemCounterWrapper from '../DzComp/DzItemCounterWrapper';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.DzCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.DzCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.DzCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const DzGoBack = () => RefNavigation.GoBack();

  const DzGoToSingleProduct = (item) => {
    props.DzsetCurrentProductAction(item);
    RefNavigation.Navigate('DzSP');
  };
  const DzinfoScreen = () => RefNavigation.Navigate('DzContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={styles.DzCart1}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconColor={colors.primary}
          leftIconAction={DzGoBack}
          Title={<Text style={styles.DzCart2}>Cart</Text>}
        />
        <View
          style={{
            paddingVertical: HEIGHT * 0.01,
            // marginBottom: -HEIGHT * 0.02,
            ...styles.DzCart3,
          }}>
          <View style={styles.DzCart4}>
            <Text style={{fontWeight: 'bold'}}>Total:</Text>
            <Text style={{fontWeight: 'bold'}}>${props.DzTotal}</Text>
          </View>
          <View style={styles.DzCart5}>
            <Text>Items:</Text>
            <Text>{props.DzTotalItems}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={HorizontalCartArray}
          renderItem={({item}) => (
            <DzItemCounterWrapper
              position="top"
              Counterlength={HEIGHT * 0.15}
              style={{marginTop: HEIGHT * 0.05}}
              item={item}
              counterColor={colors.primary}
              counterContentColor={'white'}>
              <DzVerticalTile
                item={item}
                DzGoToSingleProduct={DzGoToSingleProduct}
                DzFavs={props.DzFavs}
                DzsetFav={(fd) => props.DzsetFavAction(fd)}
                DzremoveFav={(fd) => props.DzremoveFavAction(fd)}
              />
            </DzItemCounterWrapper>
          )}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          raised
          onPress={DzinfoScreen}
          title="Proceed to Checkout"
          titleStyle={{fontWeight: 'bold', fontSize: 18}}
          containerStyle={{width: '80%', borderRadius: 50}}
          buttonStyle={{
            borderRadius: 50,
            paddingVertical: HEIGHT * 0.02,
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,
          }}
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  DzCart: state.DzCartReducer.items,
  DzTotal: state.DzCartReducer.totalAmount,
  DzFavs: state.DzToggleFav,
  DzTotalItems: state.DzCartReducer.totalItems,
});

export default connect(mapStateToProps, {
  DzremoveCartAction,
  DzaddCartAction,
  DzsetCurrentProductAction,
  DzsetFavAction,
  DzremoveFavAction,
  DzresetCart,
})(Cart);

const styles = StyleSheet.create({
  DzCart1: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  DzCart2: {
    color: colors.primary,
    fontSize: 22,
  },
  DzCart3: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: H_W.width * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 17.11,
  },
  DzCart4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DzCart5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DzCart6: {},
  DzCart7: {},
});
