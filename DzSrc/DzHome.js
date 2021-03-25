/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {colors, textFont} from '../DzComp/DzColor';
import {H_W} from '../DzComp/DzDim';
import Data from '../DzData';
import Loop from '../DzComp/DzFlatList';
import RefNavigation from '../DzComp/DzRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import FastImage from 'react-native-fast-image';
import {
  DzsetCurrentProductAction,
  DzremoveFavAction,
  DzsetFavAction,
} from '../DzRedux/DzActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DzSearchBar from '../DzComp/DzSearchBar';
import DzHeader from '../DzComp/DzHeader';
import UseHeader from '../DzComp/DzHeader';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import asd from '../DzPhotos/donut1.png';

function DzHome(props) {
  useEffect(() => {
    DzchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Dzcategories, setDzCategories] = useState(Data.category);
  const [DzcurrentCat, setDzCurrentCat] = useState(Data.category[0]);
  const [DztabProducts, setDzTabProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const DzchangeTab = (tab) => {
    setDzCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    const filterFavorites = props.DzFavs.filter(
      (item) => item.categoryId === tab.id,
    );
    setDzTabProducts(filteredProducts);
    setFavourites(filterFavorites);
  };

  const DzGotoFav = () => RefNavigation.Navigate('DzFav');
  const DzGotoCart = () => RefNavigation.Navigate('DzCart');
  const DzGotoSearch = () => RefNavigation.Navigate('DzSearch');
  const DzGoToSingleProduct = (item) => {
    props.DzsetCurrentProductAction(item);
    RefNavigation.Navigate('DzSP');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <Loop
        ListHeaderComponent={
          <ScrollView bounces={false}>
            <UseHeader
              leftIcon={Entypo}
              rightIcon={Entypo}
              leftIconName="shopping-cart"
              rightIconName="magnifying-glass"
              leftIconColor={colors.primary}
              rightIconColor={colors.primary}
              leftIconAction={DzGotoCart}
              rightIconAction={DzGotoSearch}
              Title={<Text style={{fontSize: 20}}>DONUT ZOON</Text>}
            />
            <Loop
              style={{marginTop: HEIGHT * 0.02}}
              data={Dzcategories}
              renderItem={({item}) => (
                <TabList
                  item={item}
                  DzcurrentCat={DzcurrentCat}
                  DzchangeTab={DzchangeTab}
                />
              )}
            />
            <View
              style={{
                paddingLeft: H_W.width * 0.08,
                paddingRight: H_W.width * 0.15,
                marginTop: HEIGHT * 0.02,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Popular {DzcurrentCat.categoryName}
              </Text>
              <MaterialCommunityIcons name="fire" color="orange" size={35} />
            </View>
          </ScrollView>
        }
        numColumns={2}
        horizontal={false}
        data={DztabProducts}
        renderItem={({item}) => (
          <DzVerticalTile
            item={item}
            DzGoToSingleProduct={DzGoToSingleProduct}
          />
        )}
        ListFooterComponent={
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: HEIGHT * 0.01,
                marginHorizontal: H_W.width * 0.03,
              }}>
              Your Favourite {DzcurrentCat.categoryName}
            </Text>
            <Loop
              data={props.DzFavs.filter(
                (item) => item.categoryId === DzcurrentCat.id,
              )}
              renderItem={({item}) => (
                <DzVerticalTile
                  item={item}
                  DzGoToSingleProduct={DzGoToSingleProduct}
                />
              )}
            />
          </>
        }
      />
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
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => DzGoToSingleProduct(item)}
      style={{
        width: H_W.width * 0.42,
        marginHorizontal: H_W.width * 0.04,
        marginVertical: HEIGHT * 0.016,
        alignItems: 'center',
      }}>
      <View
        style={{
          borderRadius: H_W.width * 0.2,
          backgroundColor: `rgba(${colors.rgb_Primary}, 0.1)`,
        }}>
        <FastImage
          source={item.images}
          style={{
            width: H_W.width * 0.37,
            height: HEIGHT * 0.2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          }}
          resizeMode="contain"
        />
      </View>

      <Text
        numberOfLines={2}
        style={{
          textAlign: 'center',
          marginTop: HEIGHT * 0.01,
          fontWeight: 'bold',
        }}>
        {item.productName}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: HEIGHT * 0.007,
        }}>
        <Text
          style={{
            marginHorizontal: H_W.width * 0.02,
            fontWeight: 'bold',
            color: colors.lightGrey3,
          }}>
          <AntDesign name="star" color="#ffce33" size={H_W.width * 0.037} />
          {item.rating}
        </Text>
        <View
          style={{
            backgroundColor: `rgba(${colors.rgb_Primary}, 0.2)`,
            borderRadius: 50,
            paddingVertical: HEIGHT * 0.002,
          }}>
          <Text
            style={{
              marginHorizontal: H_W.width * 0.02,
              fontWeight: 'bold',
              color: colors.primary,
            }}>
            ${item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, DzchangeTab, DzcurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        ...styles.HomeTabsWrapper,
        backgroundColor: `rgba(${colors.rgb_Primary},${
          item.categoryName === DzcurrentCat.categoryName ? 1 : 0.15
        })`,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
      }}
      onPress={() => DzchangeTab(item)}>
      <ImageBackground
        source={item.categoryImage}
        style={
          item.categoryName === DzcurrentCat.categoryName
            ? {
                width: H_W.width * 0.16,
                height: H_W.width * 0.16,
              }
            : {width: H_W.width * 0.13, height: H_W.width * 0.13}
        }
        imageStyle={
          item.categoryName === DzcurrentCat.categoryName
            ? {marginLeft: -H_W.width * 0.06, marginTop: -HEIGHT * 0.02}
            : {}
        }
        resizeMode="contain"
      />
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.categoryName === DzcurrentCat.categoryName
              ? 'white'
              : colors.primary,
        }}>
        {item.categoryName}
      </Text>
    </TouchableOpacity>
  );
};

const border = {
  borderWidth: 1,
  borderColor: 'red',
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
    marginLeft: H_W.width * 0.05,
    fontSize: 17.5,
    fontWeight: 'bold',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: H_W.width * 0.05,
    paddingLeft: H_W.width * 0.02,
    paddingRight: H_W.width * 0.04,
    borderRadius: 50,
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
