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
  const DzProduct = props.DzProduct;
  const [fav, setFav] = useState(false);
  const [currentImage, setCurrentImage] = useState(DzProduct.images);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

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

  const renderSmallImages = () => {
    return [DzProduct.images, DzProduct.images, DzProduct.images].map(
      (item, index) => (
        <TouchableOpacity
          onPress={() => setCurrentImage(item)}
          key={index}
          style={{
            backgroundColor: colors.lightBackground2,
            padding: H_W.width * 0.015,
            borderRadius: 13,
            marginHorizontal: H_W.width * 0.03,
          }}>
          <ImageBackground
            source={item}
            style={{
              width: H_W.width * 0.11,
              height: H_W.width * 0.13,
            }}
          />
        </TouchableOpacity>
      ),
    );
  };

  const DzGotoCart = () => NavigationRef.Navigate('DzCart');
  const DzGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView bounces={false}>
        <DzHeader
          leftIcon={Entypo}
          rightIcon={FontAwesome}
          rightIconName="bookmark"
          leftIconName="chevron-left"
          leftIconAction={DzGoBack}
          leftIconColor={colors.primary}
          rightIconAction={toggleFav}
          rightIconColor={`rgba(224,180,0, ${fav ? 1 : 0.4})`}
          Title={<Text style={{fontSize: 20}}>Details</Text>}
        />
        <View style={styles.DzSp1}>
          <ImageBackground
            source={currentImage}
            style={{
              width: '100%',
              height: HEIGHT * 0.34,
              shadowColor: colors.darkGray,
              shadowOffset: {
                width: 0,
                height: 35,
              },
              shadowOpacity: 0.46,
              shadowRadius: 30.14,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: HEIGHT * 0.01,
            }}>
            {renderSmallImages()}
          </View>
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
            marginTop: HEIGHT * 0.005,
            ...styles.DzSp3,
          }}>
          <StarRating rating={DzProduct.rating} size={H_W.width * 0.2} />
          <Text style={styles.DzSp4}>{DzProduct.rating}</Text>
        </View>
        <Text
          style={{
            marginHorizontal: H_W.width * 0.03,
            fontWeight: 'bold',
            fontSize: 18,
            color: colors.primary,
            marginTop: HEIGHT * 0.04,
          }}>
          Details
        </Text>
        <Text
          style={{
            ...styles.DzSp5,
            marginTop: HEIGHT * 0.015,
            paddingBottom: HEIGHT * 0.02,
          }}>
          {DzProduct.Description}
        </Text>
        <View style={{...styles.DzSp6, marginTop: HEIGHT * 0.015}}>
          <View>
            <Text style={{color: colors.darkGray, fontWeight: 'bold'}}>
              Price
            </Text>
            <Text style={{fontFamily: textFont.DINAlternate, fontSize: 26}}>
              $ {DzProduct.price}
            </Text>
          </View>
          {props.DzCart[DzProduct.id] !== undefined &&
          props.DzCart[DzProduct.id].added !== 0 ? (
            <View
              style={{
                ...styles.DzSp7,
                height: HEIGHT * 0.06,
              }}>
              <TouchableOpacity onPress={DzRemoveFromCart} style={styles.DzSp8}>
                <Feather name="minus" color="white" size={23} />
              </TouchableOpacity>
              <Text style={styles.DzSp9}>
                {props.DzCart[DzProduct.id].added}
              </Text>
              <TouchableOpacity onPress={DzAddToCart} style={styles.DzSp10}>
                <Feather name="plus" color="white" size={23} />
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
              {/* <View
                style={{
                  height: HEIGHT * 0.06,
                  ...styles.DzSp13,
                }}>
                <Feather name="plus" color="white" size={25} />
              </View> */}
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: HEIGHT * 0.02,
          }}>
          <Button
            raised
            onPress={DzGotoCart}
            title="Order Now"
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
      </KeyboardAwareScrollView>
      {/* <View
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
      </View> */}
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
const border = {
  borderWidth: 1,
  borderColor: 'red',
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
    fontFamily: textFont.DINAlternate,
  },
  DzSp3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_W.width * 0.03,
  },
  DzSp4: {
    marginLeft: H_W.width * 0.065,
    color: colors.lightGrey3,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  DzSp5: {
    paddingHorizontal: H_W.width * 0.03,
    fontSize: 15,
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
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.2)`,
    alignSelf: 'stretch',
    width: H_W.width * 0.4,
    borderRadius: 50,
    paddingHorizontal: H_W.width * 0.04,
  },
  DzSp8: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 2,
    backgroundColor: colors.primary,
  },
  DzSp9: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  DzSp10: {
    alignItems: 'center',
    padding: 2,
    borderRadius: 50,
    backgroundColor: colors.primary,
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
