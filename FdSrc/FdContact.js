/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../FdComp/FdWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../FdComp/FdDim';
import {colors} from '../FdComp/FdColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isFormValid} from '../FdComp/Fdvalidation';
import NavPointer from '../FdComp/FdRefNavigation';
import {FdUserAction, FdresetCart} from '../FdRedux/FdActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../FdComp/FdHeader';
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

  const FdConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.FdUserAction({
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
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
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

  const closeModal = () => {
    setShowModal(false);
    props.FdresetCart();
    NavPointer.Push('FdHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const FdGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      barStyle="light-content"
      statusColor={colors.primary}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <View style={styles.FdContact1}>
          <UseHeader
            leftIcon={Entypo}
            leftIconName="chevron-left"
            leftIconColor="white"
            leftIconAction={FdGoBack}
            Title={<Text style={styles.FdContact2}>Checkout</Text>}
          />
        </View>

        <Text style={{...styles.FdContact3, marginVertical: HEIGHT * 0.015}}>
          Contact Info
        </Text>
        <View style={styles.FdPersonalInfoWrapper}>
          <View style={styles.FdSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FdPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              FULL NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.FdPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.FdSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FdPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.FdPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.FdSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FdPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              PHONE NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.FdPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.lightGrey3}
              />
            </View>
          </View>
          <View style={styles.FdSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FdPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.FdPersonalInfoInputWrapper}>
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
        <Text style={{...styles.FdContact4, marginVertical: HEIGHT * 0.015}}>
          Details
        </Text>
        <View style={{...styles.FdSummaryOverlay, marginBottom: HEIGHT * 0.02}}>
          <View style={styles.FdSm1}>
            <View style={styles.FdSm2}>
              <Text style={{fontSize: 23}}>Total Amount:</Text>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>
                ${props.total}
              </Text>
            </View>
            <View style={styles.FdSm3}>
              <Text style={styles.FdSm4}>Payment Mode:</Text>
              <Text style={styles.FdSm4}>Cash on delivery</Text>
            </View>
          </View>
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.FdModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <Ionicons
              name="fast-food-sharp"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.FdModalHeadText}>THANK YOU!</Text>
            <Text style={styles.FdModalSubText}>
              Your order has been confirmed!
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
      <View
        style={{
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.primary,
        }}>
        <Button
          loading={loading}
          onPress={FdConfirm}
          disabled={props.FdTotalItems === 0}
          title="CONFIRM ORDER"
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          buttonStyle={{
            paddingVertical: HEIGHT * 0.02,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.FdCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {FdUserAction, FdresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  FdContact1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  FdContact2: {
    color: 'white',
    fontSize: 22,
  },
  FdContact3: {
    marginLeft: H_W.width * 0.03,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  FdContact4: {marginLeft: H_W.width * 0.03, fontSize: 20, fontWeight: 'bold'},
  FdSm4: {fontSize: H_W.width * 0.045, fontWeight: 'bold'},
  FdSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FdSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FdSm1: {
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
  FdSummaryOverlay: {
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
  FdModalSubText: {
    fontSize: H_W.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  FdModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  FdModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
  },
  FdConfirmButtonContainer: {
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
  FdConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 50,
  },
  FdConfirmButtonWrapper: {
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
  FdInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  FdPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGrey4,
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 1,
  },
  FdPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  FdSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  FdPersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  FdPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
