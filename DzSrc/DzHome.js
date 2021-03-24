/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {colors, textFont} from '../DzComp/DzColor';
import {H_W} from '../DzComp/DzDim';
import Data from '../DzData';
import Loop from '../DzComp/DzFlatList';
import RefNavigation from '../DzComp/DzRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DzsetCurrentProductAction,
  DzremoveFavAction,
  DzsetFavAction,
} from '../DzRedux/DzActions';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DzSearchBar from '../DzComp/DzSearchBar';
import DzHeader from '../DzComp/DzHeader';
// import StarRating from '../starRating';

function DzHome(props) {
  useEffect(() => {
    DzchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Dzcategories, setDzCategories] = useState(Data.category);
  const [DzcurrentCat, setDzCurrentCat] = useState(Data.category[0]);
  const [DztabProducts, setDzTabProducts] = useState([]);

  const DzchangeTab = (tab) => {
    setDzCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    setDzTabProducts(filteredProducts);
  };

  const DzGotoFav = () => RefNavigation.Navigate('DzFav');
  const DzGotoCart = () => RefNavigation.Navigate('DzCart');
  const DzGotoSearch = () => RefNavigation.Navigate('DzSearch');
  const DzGoToSingleProduct = (item) => {
    props.DzsetCurrentProductAction(item);
    RefNavigation.Navigate('DzSP');
  };
  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <Text>asdas</Text>
      {/* <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={DztabProducts}
          renderItem={({item}) => (
            <DzVerticalTile
              item={item}
              DzGoToSingleProduct={DzGoToSingleProduct}
              DzFavs={props.DzFavs}
              DzsetFav={(fd) => props.DzsetFavAction(fd)}
              DzremoveFav={(fd) => props.DzremoveFavAction(fd)}
            />
          )}
          ListHeaderComponent={
            <ScrollView style={{flex: 1}} bounces={false}>
              <View style={{...styles.DzHome1, paddingVertical: HEIGHT * 0.03}}>
                <DzHeader
                  leftIcon={Feather}
                  rightIcon={FontAwesome}
                  rightIconName="heart"
                  leftIconName="shopping-cart"
                  leftIconColor="white"
                  rightIconColor="white"
                  rightIconAction={DzGotoFav}
                  leftIconAction={DzGotoCart}
                  Title={
                    <Text style={styles.DzHome2}>
                      THE <Text style={styles.DzHome3}>FOOD</Text> DOOR
                    </Text>
                  }
                />
                <View style={styles.DzHome4}>
                  <TouchableOpacity
                    onPress={DzGotoSearch}
                    style={{
                      marginTop: HEIGHT * 0.025,
                      marginBottom: -HEIGHT * 0.05,
                      ...styles.DzHome5,
                    }}>
                    <DzSearchBar editable={false} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{marginTop: HEIGHT * 0.05, marginBottom: HEIGHT * 0.03}}>
                <Loop
                  data={Dzcategories}
                  renderItem={({item}) => (
                    <TabList
                      item={item}
                      DzcurrentCat={DzcurrentCat}
                      DzchangeTab={DzchangeTab}
                    />
                  )}
                />
              </View>
            </ScrollView>
          }
        />
      </View> */}
    </WrapperScreen>
  );
}

export const DzVerticalTile = ({
  item,
  DzGoToSingleProduct,
  DzFavs,
  DzremoveFav,
  DzsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  });
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let Dz = 0; Dz < DzFavs.length; Dz++) {
      if (DzFavs[Dz].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? DzremoveFav(item.id) : DzsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => DzGoToSingleProduct(item)}
      style={styles.DzHome6}>
      <ImageBackground
        source={item.images}
        style={{width: '100%', height: HEIGHT * 0.2}}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        style={{...styles.DzHome7, marginTop: HEIGHT * 0.007}}>
        {item.productName}
      </Text>
      <View style={{marginTop: HEIGHT * 0.01, ...styles.DzHome8}}>
        <StarRating rating={item.rating} size={H_W.width * 0.17} />
        <Text style={styles.DzHome9}>{item.rating}</Text>
      </View>
      <View
        style={{
          ...styles.DzHome10,
          marginTop: HEIGHT * 0.015,
          marginBottom: HEIGHT * 0.01,
        }}>
        <Text style={styles.DzHome11}>${item.price}</Text>
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

export const TabList = ({item, DzchangeTab, DzcurrentCat}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => DzchangeTab(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.categoryName === DzcurrentCat.categoryName
              ? colors.primary
              : `rgba(${colors.rgb_Primary}, 0.5)`,
        }}>
        {item.categoryName.toUpperCase()}
      </Text>
      {item.categoryName === DzcurrentCat.categoryName ? (
        <View style={styles.tabIndicator} />
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  DzHome21: {},
  DzHome20: {},
  DzHome19: {},
  DzHome18: {},
  DzHome17: {},
  DzHome16: {},
  DzHome15: {},
  DzHome14: {},
  DzHome13: {},
  DzHome12: {},
  DzHome11: {
    fontSize: 19,
    fontFamily: textFont.DINAlternate,
    color: colors.primary,
  },
  DzHome10: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  DzHome9: {
    marginLeft: H_W.width * 0.045,
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  DzHome8: {display: 'flex', flexDirection: 'row', alignItems: 'center'},
  DzHome7: {
    fontSize: 18.5,
    fontFamily: textFont.DINAlternate,
    color: colors.darkGray,
  },
  DzHome6: {
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
  DzHome5: {
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 17.11,
  },
  DzHome4: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  DzHome3: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    fontStyle: 'italic',
    color: 'white',
  },
  DzHome2: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    color: 'white',
  },
  DzHome1: {
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
    DztotalItems: state.DzCartReducer.totalItems,
    DzFavs: state.DzToggleFav,
  };
};

export default connect(mapStateToProps, {
  DzsetCurrentProductAction,
  DzremoveFavAction,
  DzsetFavAction,
})(DzHome);
