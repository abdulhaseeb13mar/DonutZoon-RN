/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {H_W} from '../DzComp/DzDim';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {connect} from 'react-redux';
import {colors, textFont} from '../DzComp/DzColor';
import NavigationRef from '../DzComp/DzRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import DzHeader from '../DzComp/DzHeader';
import {
  DzremoveFavAction,
  DzsetFavAction,
  DzaddCartAction,
  DzremoveCartAction,
} from '../DzRedux/DzActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from '../starRating';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const DzProduct = props.DzProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.DzFavs.length; us++) {
      if (props.DzFavs[us].id === DzProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.DzremoveFavAction(DzProduct.id)
      : props.DzsetFavAction(DzProduct);
    setFav(!fav);
  };

  const DzAddToCart = () => {
    props.DzaddCartAction({...DzProduct});
  };

  const DzRemoveFromCart = () => {
    props.DzCart[DzProduct.id].added !== 0 &&
      props.DzremoveCartAction(DzProduct);
  };

  const DzGotoCart = () => NavigationRef.Navigate('DzCart');
  const DzGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView bounces={false}>
        <DzHeader
          leftIcon={Entypo}
          rightIcon={FontAwesome}
          rightIconName="heart"
          leftIconName="chevron-left"
          leftIconAction={DzGoBack}
          leftIconColor={colors.secondary}
          rightIconAction={toggleFav}
          rightIconColor={`rgba(${colors.rgb_Primary}, ${fav ? 1 : 0.5})`}
        />
        <View style={styles.DzSp1}>
          <ImageBackground
            source={DzProduct.images}
            style={{width: '100%', height: HEIGHT * 0.37}}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            ...styles.DzSp2,
            marginTop: HEIGHT * 0.01,
          }}>
          {DzProduct.productName}
        </Text>
        <View
          style={{
            marginTop: HEIGHT * 0.01,
            ...styles.DzSp3,
          }}>
          <StarRating rating={DzProduct.rating} size={H_W.width * 0.3} />
          <Text style={styles.DzSp4}>{DzProduct.rating}</Text>
        </View>
        <Text
          style={{
            ...styles.DzSp5,
            marginTop: HEIGHT * 0.015,
            paddingBottom: HEIGHT * 0.02,
          }}>
          {DzProduct.Description}
        </Text>
        <View style={styles.DzSp6}>
          <Text style={{fontFamily: textFont.DINAlternate, fontSize: 26}}>
            $ {DzProduct.price}
          </Text>
          {props.DzCart[DzProduct.id] !== undefined &&
          props.DzCart[DzProduct.id].added !== 0 ? (
            <View
              style={{
                ...styles.DzSp7,
                height: HEIGHT * 0.06,
              }}>
              <TouchableOpacity onPress={DzRemoveFromCart} style={styles.DzSp8}>
                <Feather name="minus" color="black" size={25} />
              </TouchableOpacity>
              <Text style={styles.DzSp9}>
                {props.DzCart[DzProduct.id].added}
              </Text>
              <TouchableOpacity onPress={DzAddToCart} style={styles.DzSp10}>
                <Feather name="plus" color="black" size={25} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={DzAddToCart}
              style={{
                ...styles.DzSp11,
                height: HEIGHT * 0.06,
              }}>
              <Text style={styles.DzSp12}>Add to Cart</Text>
              <View
                style={{
                  height: HEIGHT * 0.06,
                  ...styles.DzSp13,
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
          onPress={DzGotoCart}
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
    DzProduct: state.DzCrntPrdtReducer,
    DzFavs: state.DzToggleFav,
    DzCart: state.DzCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  DzsetFavAction,
  DzremoveFavAction,
  DzremoveCartAction,
  DzaddCartAction,
})(React.memo(SingleProduct));

const styles = StyleSheet.create({
  DzSp1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: H_W.width * 0.03,
  },
  DzSp2: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 29,
    paddingHorizontal: H_W.width * 0.03,
  },
  DzSp3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_W.width * 0.03,
  },
  DzSp4: {
    marginLeft: H_W.width * 0.065,
    color: colors.secondary,
    fontSize: 22,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  DzSp5: {
    paddingHorizontal: H_W.width * 0.03,
    fontSize: 18,
    color: colors.darkGray,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  DzSp6: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: H_W.width * 0.03,
  },
  DzSp7: {
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
  DzSp8: {
    alignSelf: 'stretch',
    width: H_W.width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DzSp9: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.primary,
  },
  DzSp10: {
    alignSelf: 'stretch',
    width: H_W.width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DzSp11: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    width: H_W.width * 0.4,
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.1)`,
  },
  DzSp12: {
    flex: 1,
    textAlign: 'center',
    fontFamily: textFont.DINAlternate,
    fontSize: 18,
  },
  DzSp13: {
    alignSelf: 'stretch',
    borderRadius: 50,
    width: H_W.width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  DzSp14: {},
  DzSp15: {},
  DzSp16: {},
  DzSp17: {},
});
