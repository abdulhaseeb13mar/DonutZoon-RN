/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {colors, textFont} from '../FdComp/FdColor';
import {H_W} from '../FdComp/FdDim';
import Data from '../FdData';
import Loop from '../FdComp/FdFlatList';
import RefNavigation from '../FdComp/FdRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FdsetCurrentProductAction,
  FdremoveFavAction,
  FdsetFavAction,
} from '../FdRedux/FdActions';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FdSearchBar from '../FdComp/FdSearchBar';
import FdHeader from '../FdComp/FdHeader';
import StarRating from '../starRating';

function FdHome(props) {
  useEffect(() => {
    FdchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Fdcategories, setFdCategories] = useState(Data.category);
  const [FdcurrentCat, setFdCurrentCat] = useState(Data.category[0]);
  const [FdtabProducts, setFdTabProducts] = useState([]);

  const FdchangeTab = (tab) => {
    setFdCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    setFdTabProducts(filteredProducts);
  };

  const FdGotoFav = () => RefNavigation.Navigate('FdFav');
  const FdGotoCart = () => RefNavigation.Navigate('FdCart');
  const FdGotoSearch = () => RefNavigation.Navigate('FdSearch');
  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    RefNavigation.Navigate('FdSP');
  };
  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={FdtabProducts}
          renderItem={({item}) => (
            <FdVerticalTile
              item={item}
              FdGoToSingleProduct={FdGoToSingleProduct}
              FdFavs={props.FdFavs}
              FdsetFav={(fd) => props.FdsetFavAction(fd)}
              FdremoveFav={(fd) => props.FdremoveFavAction(fd)}
            />
          )}
          ListHeaderComponent={
            <ScrollView style={{flex: 1}} bounces={false}>
              <View style={{...styles.FdHome1, paddingVertical: HEIGHT * 0.03}}>
                <FdHeader
                  leftIcon={Feather}
                  rightIcon={FontAwesome}
                  rightIconName="heart"
                  leftIconName="shopping-cart"
                  leftIconColor="white"
                  rightIconColor="white"
                  rightIconAction={FdGotoFav}
                  leftIconAction={FdGotoCart}
                  Title={
                    <Text style={styles.FdHome2}>
                      THE <Text style={styles.FdHome3}>FOOD</Text> DOOR
                    </Text>
                  }
                />
                <View style={styles.FdHome4}>
                  <TouchableOpacity
                    onPress={FdGotoSearch}
                    style={{
                      marginTop: HEIGHT * 0.025,
                      marginBottom: -HEIGHT * 0.05,
                      ...styles.FdHome5,
                    }}>
                    <FdSearchBar editable={false} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{marginTop: HEIGHT * 0.05, marginBottom: HEIGHT * 0.03}}>
                <Loop
                  data={Fdcategories}
                  renderItem={({item}) => (
                    <TabList
                      item={item}
                      FdcurrentCat={FdcurrentCat}
                      FdchangeTab={FdchangeTab}
                    />
                  )}
                />
              </View>
            </ScrollView>
          }
        />
      </View>
    </WrapperScreen>
  );
}

export const FdVerticalTile = ({
  item,
  FdGoToSingleProduct,
  FdFavs,
  FdremoveFav,
  FdsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  });
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let Fd = 0; Fd < FdFavs.length; Fd++) {
      if (FdFavs[Fd].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? FdremoveFav(item.id) : FdsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => FdGoToSingleProduct(item)}
      style={styles.FdHome6}>
      <ImageBackground
        source={item.images}
        style={{width: '100%', height: HEIGHT * 0.2}}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        style={{...styles.FdHome7, marginTop: HEIGHT * 0.007}}>
        {item.productName}
      </Text>
      <View style={{marginTop: HEIGHT * 0.01, ...styles.FdHome8}}>
        <StarRating rating={item.rating} size={H_W.width * 0.17} />
        <Text style={styles.FdHome9}>{item.rating}</Text>
      </View>
      <View
        style={{
          ...styles.FdHome10,
          marginTop: HEIGHT * 0.015,
          marginBottom: HEIGHT * 0.01,
        }}>
        <Text style={styles.FdHome11}>${item.price}</Text>
        <TouchableOpacity onPress={toggleFav}>
          <FontAwesome
            name="heart"
            color={`rgba(${colors.rgb_Primary}, ${fav ? 1 : 0.5})`}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, FdchangeTab, FdcurrentCat}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => FdchangeTab(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.categoryName === FdcurrentCat.categoryName
              ? colors.primary
              : `rgba(${colors.rgb_Primary}, 0.5)`,
        }}>
        {item.categoryName.toUpperCase()}
      </Text>
      {item.categoryName === FdcurrentCat.categoryName ? (
        <View style={styles.tabIndicator} />
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  FdHome21: {},
  FdHome20: {},
  FdHome19: {},
  FdHome18: {},
  FdHome17: {},
  FdHome16: {},
  FdHome15: {},
  FdHome14: {},
  FdHome13: {},
  FdHome12: {},
  FdHome11: {
    fontSize: 19,
    fontFamily: textFont.DINAlternate,
    color: colors.primary,
  },
  FdHome10: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  FdHome9: {
    marginLeft: H_W.width * 0.045,
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  FdHome8: {display: 'flex', flexDirection: 'row', alignItems: 'center'},
  FdHome7: {
    fontSize: 18.5,
    fontFamily: textFont.DINAlternate,
    color: colors.darkGray,
  },
  FdHome6: {
    margin: H_W.width * 0.023,
    width: H_W.width * 0.45,
    padding: 7,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    borderRadius: 8,
  },
  FdHome5: {
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 17.11,
  },
  FdHome4: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FdHome3: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    fontStyle: 'italic',
    color: 'white',
  },
  FdHome2: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    color: 'white',
  },
  FdHome1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  tabIndicator: {
    width: 30,
    borderWidth: 1.8,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: colors.primary,
  },
  HomeTabsText: {
    fontSize: 23,
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: H_W.width * 0.05,
    height: H_W.width * 0.1,
    paddingHorizontal: H_W.width * 0.02,
    paddingTop: H_W.width * 0.02,
  },
});

const mapStateToProps = (state) => {
  return {
    FdtotalItems: state.FdCartReducer.totalItems,
    FdFavs: state.FdToggleFav,
  };
};

export default connect(mapStateToProps, {
  FdsetCurrentProductAction,
  FdremoveFavAction,
  FdsetFavAction,
})(FdHome);
