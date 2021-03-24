/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {H_W} from '../FdComp/FdDim';
import NavigationRef from '../FdComp/FdRefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../FdComp/FdColor';
import Data from '../FdData';
import Loop from '../FdComp/FdFlatList';
import {connect} from 'react-redux';
import {
  FdsetCurrentProductAction,
  FdsetFavAction,
  FdremoveFavAction,
} from '../FdRedux/FdActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FdSearchBar from '../FdComp/FdSearchBar';
import FdHeader from '../FdComp/FdHeader';
import {FdVerticalTile} from './FdHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    NavigationRef.Navigate('FdSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        numColumns={2}
        horizontal={false}
        data={Arr}
        renderItem={({item}) => (
          <FdVerticalTile
            item={item}
            FdGoToSingleProduct={FdGoToSingleProduct}
            FdFavs={props.FdFavs}
            FdsetFav={(fd) => props.FdsetFavAction(fd)}
            FdremoveFav={(fd) => props.FdremoveFavAction(fd)}
          />
        )}
      />
    );
  };
  const FdGoBack = () => NavigationRef.GoBack();

  const FdchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <View style={styles.FdSearch1}>
        <FdHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconColor="white"
          rightIconColor="white"
          leftIconAction={FdGoBack}
          Title={<Text style={styles.FdSearch2}>Search</Text>}
        />
        <View style={styles.FdSearch3}>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: -HEIGHT * 0.02,
              ...styles.FdSearch4,
            }}>
            <FdSearchBar changeSearchText={FdchangeSearchText} />
          </View>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.06, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  FdFavs: state.FdToggleFav,
});

export default connect(mapStateToProps, {
  FdsetCurrentProductAction,
  FdsetFavAction,
  FdremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  FdSearch1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  FdSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    color: 'white',
  },
  FdSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FdSearch4: {
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 17.11,
  },
  FdSearch5: {},
  FdSearch6: {},
});
