/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  DzremoveFavAction,
  DzsetFavAction,
  DzsetCurrentProductAction,
} from '../DzRedux/DzActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../DzComp/DzHeader';
import {colors} from '../DzComp/DzColor';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import Loop from '../DzComp/DzFlatList';
import NavigationRef from '../DzComp/DzRefNavigation';
import {DzVerticalTile} from './DzHome';

const DzFavourites = (props) => {
  const DzGoToSingleProduct = (item) => {
    props.DzsetCurrentProductAction(item);
    NavigationRef.Navigate('DzSP');
  };

  const DzGoBack = () => NavigationRef.Navigate('DzHome');

  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={props.DzFavs}
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
            <View style={styles.DzFav1}>
              <UseHeader
                leftIcon={Entypo}
                leftIconName="chevron-left"
                leftIconColor="white"
                leftIconAction={DzGoBack}
                Title={
                  <Text style={styles.DzFav2}>
                    {props.DzFavs.length} Favourites
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
    DzFavs: state.DzToggleFav,
  };
};

export default connect(mapStateToProps, {
  DzsetFavAction,
  DzsetCurrentProductAction,
  DzremoveFavAction,
})(DzFavourites);

const styles = StyleSheet.create({
  DzFav1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  DzFav2: {
    color: 'white',
    fontSize: 22,
  },
  DzFav3: {},
  DzFav4: {},
});
