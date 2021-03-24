/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {H_W} from '../FdComp/FdDim';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {connect} from 'react-redux';
import {colors, textFont} from '../FdComp/FdColor';
import NavigationRef from '../FdComp/FdRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FdHeader from '../FdComp/FdHeader';
import {
  FdremoveFavAction,
  FdsetFavAction,
  FdaddCartAction,
  FdremoveCartAction,
} from '../FdRedux/FdActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from '../starRating';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const FdProduct = props.FdProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.FdFavs.length; us++) {
      if (props.FdFavs[us].id === FdProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.FdremoveFavAction(FdProduct.id)
      : props.FdsetFavAction(FdProduct);
    setFav(!fav);
  };

  const FdAddToCart = () => {
    props.FdaddCartAction({...FdProduct});
  };

  const FdRemoveFromCart = () => {
    props.FdCart[FdProduct.id].added !== 0 &&
      props.FdremoveCartAction(FdProduct);
  };

  const FdGotoCart = () => NavigationRef.Navigate('FdCart');
  const FdGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView bounces={false}>
        <FdHeader
          leftIcon={Entypo}
          rightIcon={FontAwesome}
          rightIconName="heart"
          leftIconName="chevron-left"
          leftIconAction={FdGoBack}
          leftIconColor={colors.secondary}
          rightIconAction={toggleFav}
          rightIconColor={`rgba(${colors.rgb_Primary}, ${fav ? 1 : 0.5})`}
        />
        <View style={styles.FdSp1}>
          <ImageBackground
            source={FdProduct.images}
            style={{width: '100%', height: HEIGHT * 0.37}}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            ...styles.FdSp2,
            marginTop: HEIGHT * 0.01,
          }}>
          {FdProduct.productName}
        </Text>
        <View
          style={{
            marginTop: HEIGHT * 0.01,
            ...styles.FdSp3,
          }}>
          <StarRating rating={FdProduct.rating} size={H_W.width * 0.3} />
          <Text style={styles.FdSp4}>{FdProduct.rating}</Text>
        </View>
        <Text
          style={{
            ...styles.FdSp5,
            marginTop: HEIGHT * 0.015,
            paddingBottom: HEIGHT * 0.02,
          }}>
          {FdProduct.Description}
        </Text>
        <View style={styles.FdSp6}>
          <Text style={{fontFamily: textFont.DINAlternate, fontSize: 26}}>
            $ {FdProduct.price}
          </Text>
          {props.FdCart[FdProduct.id] !== undefined &&
          props.FdCart[FdProduct.id].added !== 0 ? (
            <View
              style={{
                ...styles.FdSp7,
                height: HEIGHT * 0.06,
              }}>
              <TouchableOpacity onPress={FdRemoveFromCart} style={styles.FdSp8}>
                <Feather name="minus" color="black" size={25} />
              </TouchableOpacity>
              <Text style={styles.FdSp9}>
                {props.FdCart[FdProduct.id].added}
              </Text>
              <TouchableOpacity onPress={FdAddToCart} style={styles.FdSp10}>
                <Feather name="plus" color="black" size={25} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={FdAddToCart}
              style={{
                ...styles.FdSp11,
                height: HEIGHT * 0.06,
              }}>
              <Text style={styles.FdSp12}>Add to Cart</Text>
              <View
                style={{
                  height: HEIGHT * 0.06,
                  ...styles.FdSp13,
                }}>
                <Feather name="plus" color="white" size={25} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.primary,
        }}>
        <Button
          onPress={FdGotoCart}
          title="View Cart"
          titleStyle={{fontWeight: 'bold', fontSize: 23}}
          buttonStyle={{
            paddingVertical: HEIGHT * 0.02,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    FdProduct: state.FdCrntPrdtReducer,
    FdFavs: state.FdToggleFav,
    FdCart: state.FdCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  FdsetFavAction,
  FdremoveFavAction,
  FdremoveCartAction,
  FdaddCartAction,
})(React.memo(SingleProduct));

const styles = StyleSheet.create({
  FdSp1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: H_W.width * 0.03,
  },
  FdSp2: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 29,
    paddingHorizontal: H_W.width * 0.03,
  },
  FdSp3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_W.width * 0.03,
  },
  FdSp4: {
    marginLeft: H_W.width * 0.065,
    color: colors.secondary,
    fontSize: 22,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  FdSp5: {
    paddingHorizontal: H_W.width * 0.03,
    fontSize: 18,
    color: colors.darkGray,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  FdSp6: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: H_W.width * 0.03,
  },
  FdSp7: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    width: H_W.width * 0.4,
    borderRadius: 50,
  },
  FdSp8: {
    alignSelf: 'stretch',
    width: H_W.width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FdSp9: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.primary,
  },
  FdSp10: {
    alignSelf: 'stretch',
    width: H_W.width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FdSp11: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    width: H_W.width * 0.4,
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.1)`,
  },
  FdSp12: {
    flex: 1,
    textAlign: 'center',
    fontFamily: textFont.DINAlternate,
    fontSize: 18,
  },
  FdSp13: {
    alignSelf: 'stretch',
    borderRadius: 50,
    width: H_W.width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  FdSp14: {},
  FdSp15: {},
  FdSp16: {},
  FdSp17: {},
});
