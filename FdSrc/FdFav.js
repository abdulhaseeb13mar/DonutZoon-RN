/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  FdremoveFavAction,
  FdsetFavAction,
  FdsetCurrentProductAction,
} from '../FdRedux/FdActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../FdComp/FdHeader';
import {colors} from '../FdComp/FdColor';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import Loop from '../FdComp/FdFlatList';
import NavigationRef from '../FdComp/FdRefNavigation';
import {FdVerticalTile} from './FdHome';

const FdFavourites = (props) => {
  const FdGoToSingleProduct = (item) => {
    props.FdsetCurrentProductAction(item);
    NavigationRef.Navigate('FdSP');
  };

  const FdGoBack = () => NavigationRef.Navigate('FdHome');

  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={props.FdFavs}
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
            <View style={styles.FdFav1}>
              <UseHeader
                leftIcon={Entypo}
                leftIconName="chevron-left"
                leftIconColor="white"
                leftIconAction={FdGoBack}
                Title={
                  <Text style={styles.FdFav2}>
                    {props.FdFavs.length} Favourites
                  </Text>
                }
              />
            </View>
          }
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    FdFavs: state.FdToggleFav,
  };
};

export default connect(mapStateToProps, {
  FdsetFavAction,
  FdsetCurrentProductAction,
  FdremoveFavAction,
})(FdFavourites);

const styles = StyleSheet.create({
  FdFav1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  FdFav2: {
    color: 'white',
    fontSize: 22,
  },
  FdFav3: {},
  FdFav4: {},
});
