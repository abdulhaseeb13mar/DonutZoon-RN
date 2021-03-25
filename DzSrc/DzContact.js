/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../DzComp/DzWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../DzComp/DzDim';
import {colors} from '../DzComp/DzColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isFormValid} from '../DzComp/Dzvalidation';
import NavPointer from '../DzComp/DzRefNavigation';
import {DzUserAction, DzresetCart} from '../DzRedux/DzActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../DzComp/DzHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConfirmOrder = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const DzConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.DzUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            email: email,
            appname: 'The Food Door',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? MoveToConfirmOrder() : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const MoveToConfirmOrder = () => {
    props.DzresetCart();
    NavPointer.Push('DzConfirmOrder');
  };

  const closeModal = () => {
    setShowModal(false);
    props.DzresetCart();
    NavPointer.Push('DzHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const DzGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconColor={colors.primary}
          leftIconAction={DzGoBack}
          Title={<Text style={styles.DzContact2}>Contact Info</Text>}
        />
        <View style={styles.DzPersonalInfoWrapper}>
          <View style={styles.DzSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.DzPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              FULL NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.DzPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.DzSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.DzPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.DzPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.DzSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.DzPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              PHONE NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.DzPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.DzSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.DzPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.DzPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.13}}
                onChangeText={changeAddress}
                multiline
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
        </View>
        <Text style={{...styles.DzContact4, marginVertical: HEIGHT * 0.015}}>
          Details
        </Text>
        <View style={{...styles.DzSummaryOverlay, marginBottom: HEIGHT * 0.02}}>
          <View style={styles.DzSm1}>
            <View style={styles.DzSm2}>
              <Text style={{fontSize: 23}}>Total Amount:</Text>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>
                ${props.total}
              </Text>
            </View>
            <View style={styles.DzSm3}>
              <Text style={styles.DzSm4}>Payment Mode:</Text>
              <Text style={styles.DzSm4}>Cash on delivery</Text>
            </View>
          </View>
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.DzModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <Ionicons
              name="fast-food-sharp"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.DzModalHeadText}>THANK YOU!</Text>
            <Text style={styles.DzModalSubText}>
              Your order has been confirmed!
            </Text>
          </View>
        </Overlay>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            raised
            loading={loading}
            onPress={DzConfirm}
            disabled={props.DzTotalItems === 0}
            title="CONFIRM ORDER"
            titleStyle={{fontWeight: 'bold', fontSize: 20}}
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
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.DzCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {DzUserAction, DzresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  DzContact1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  DzContact2: {
    color: colors.primary,
    fontSize: 22,
  },
  DzContact3: {
    marginLeft: H_W.width * 0.03,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  DzContact4: {marginLeft: H_W.width * 0.03, fontSize: 20, fontWeight: 'bold'},
  DzSm4: {fontSize: H_W.width * 0.045, fontWeight: 'bold'},
  DzSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DzSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DzSm1: {
    width: '85%',
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.3)`,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: H_W.width * 0.04,
  },
  DzSummaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  DzModalSubText: {
    fontSize: H_W.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  DzModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  DzModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
  },
  DzConfirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  DzConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 50,
  },
  DzConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: H_W.width * 0.035,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  DzInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  DzPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGrey4,
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 1,
  },
  DzPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  DzSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  DzPersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  DzPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
