/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  FdremoveCartAction,
  FdaddCartAction,
  FdsetCurrentProductAction,
  FdsetFavAction,
  FdremoveFavAction,
  FdresetCart,
} from '../FdRedux/FdActions';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../FdComp/FdColor';
import {H_W} from '../FdComp/FdDim';
import RefNavigation from '../FdComp/FdRefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import {FdVerticalTile} from './FdHome';
import Loop from '../FdComp/FdFlatList';
import UseHeader from '../FdComp/FdHeader';
import FdItemCounterWrapper from '../FdComp/FdItemCounterWrapper';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.FdCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.FdCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.FdCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const FdGoBack = () => RefNavigation.GoBack();

  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    RefNavigation.Navigate('FdSP');
  };
  const FdinfoScreen = () => RefNavigation.Navigate('FdContact');

  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <View style={styles.FdCart1}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconColor="white"
          leftIconAction={FdGoBack}
          Title={<Text style={styles.FdCart2}>Cart</Text>}
        />
        <View
          style={{
            paddingVertical: HEIGHT * 0.01,
            marginBottom: -HEIGHT * 0.02,
            ...styles.FdCart3,
          }}>
          <View style={styles.FdCart4}>
            <Text style={{fontWeight: 'bold'}}>Total:</Text>
            <Text style={{fontWeight: 'bold'}}>${props.FdTotal}</Text>
          </View>
          <View style={styles.FdCart5}>
            <Text>Items:</Text>
            <Text>{props.FdTotalItems}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={HorizontalCartArray}
          renderItem={({item}) => (
            <FdItemCounterWrapper
              position="top"
              Counterlength={HEIGHT * 0.15}
              style={{marginTop: HEIGHT * 0.05}}
              item={item}
              counterColor={colors.primary}
              counterContentColor={'white'}>
              <FdVerticalTile
                item={item}
                FdGoToSingleProduct={FdGoToSingleProduct}
                FdFavs={props.FdFavs}
                FdsetFav={(fd) => props.FdsetFavAction(fd)}
                FdremoveFav={(fd) => props.FdremoveFavAction(fd)}
              />
            </FdItemCounterWrapper>
          )}
        />
      </View>
      <View
        style={{
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.primary,
        }}>
        <Button
          onPress={FdinfoScreen}
          disabled={props.FdTotalItems === 0}
          title="PROCEED TO CHECKOUT"
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          buttonStyle={{
            paddingVertical: HEIGHT * 0.02,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  FdCart: state.FdCartReducer.items,
  FdTotal: state.FdCartReducer.totalAmount,
  FdFavs: state.FdToggleFav,
  FdTotalItems: state.FdCartReducer.totalItems,
});

export default connect(mapStateToProps, {
  FdremoveCartAction,
  FdaddCartAction,
  FdsetCurrentProductAction,
  FdsetFavAction,
  FdremoveFavAction,
  FdresetCart,
})(Cart);

const styles = StyleSheet.create({
  FdCart1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  FdCart2: {
    color: 'white',
    fontSize: 22,
  },
  FdCart3: {
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
  FdCart4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FdCart5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FdCart6: {},
  FdCart7: {},
});
