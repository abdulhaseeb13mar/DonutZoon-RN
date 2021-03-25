/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {H_W} from '../DzComp/DzDim';
import NavigationRef from '../DzComp/DzRefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../DzComp/DzColor';
import Data from '../DzData';
import Loop from '../DzComp/DzFlatList';
import {connect} from 'react-redux';
import {
  DzsetCurrentProductAction,
  DzsetFavAction,
  DzremoveFavAction,
} from '../DzRedux/DzActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DzSearchBar from '../DzComp/DzSearchBar';
import DzHeader from '../DzComp/DzHeader';
import {DzVerticalTile} from './DzHome';

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

  const DzGoToSingleProduct = (item) => {
    props.DzsetCurrentProductAction(item);
    NavigationRef.Navigate('DzSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        numColumns={2}
        horizontal={false}
        data={Arr}
        renderItem={({item}) => (
          <DzVerticalTile
            item={item}
            DzGoToSingleProduct={DzGoToSingleProduct}
            DzFavs={props.DzFavs}
            DzsetFav={(fd) => props.DzsetFavAction(fd)}
            DzremoveFav={(fd) => props.DzremoveFavAction(fd)}
          />
        )}
      />
    );
  };
  const DzGoBack = () => NavigationRef.GoBack();

  const DzchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={styles.DzSearch1}>
        <DzHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconColor={colors.primary}
          leftIconAction={DzGoBack}
          Title={<Text style={styles.DzSearch2}>Search</Text>}
        />
        <View style={styles.DzSearch3}>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: -HEIGHT * 0.02,
              ...styles.DzSearch4,
            }}>
            <DzSearchBar changeSearchText={DzchangeSearchText} />
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
  DzFavs: state.DzToggleFav,
});

export default connect(mapStateToProps, {
  DzsetCurrentProductAction,
  DzsetFavAction,
  DzremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  DzSearch1: {
    // backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  DzSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary,
  },
  DzSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  DzSearch4: {
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 17.11,
  },
  DzSearch5: {},
  DzSearch6: {},
});
