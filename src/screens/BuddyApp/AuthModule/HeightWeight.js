import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomTextInput from '../../../components/TextInputComponent';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import HorizontalDivider from '../../../components/HorizontalDivider';
import Button from '../../../components/ButtonComponent';
import ProfileProgressBar from '../../../components/ProfileProgressBar';
import { BottomSheet } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons'
import DynamicOptionSelector from '../../../components/DynamicOptionSelector';

const HeightWeight = ({ navigation }) => {
  const gender = ["Male", "Female", "Prefer not to say"]
  const [selectedGender, setSelectedGender] = useState(null);
  const [hieghtFtSelected, setHeightFtSelected] = useState(true);
  const [hieghtInSelected, setHeightInSelected] = useState(false);
  const [weightKgSelected, setWeightKgSelected] = useState(true);
  const [weightLbSelected, setWeightLbSelected] = useState(false);

  const handleBackPress = () => {
    resetNavigation(navigation, SCREENS.BUDDY_GENDER_SELECTION)
    return true;
  };
  useBackHandler(handleBackPress);

  const handleLoginNavigation = () => {
    resetNavigation(navigation, SCREENS.SIGNUP)
  }

  const handleItemSelected = (item) => {
    console.log(item)
    setSelectedGender(item);
  };

  const handleToggleFt = () => {
    setHeightFtSelected(true);
    setHeightInSelected(false);
  };

  const handleToggleInches = () => {
    setHeightFtSelected(false);
    setHeightInSelected(true);
  };

  const handleToggleKg = () => {
    setWeightKgSelected(true);
    setWeightLbSelected(false);
  };

  const handleToggleLb = () => {
    setWeightKgSelected(false);
    setWeightLbSelected(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileProgressBar progress={70} onPress={() => {
        resetNavigation(navigation, SCREENS.BUDDY_GENDER_SELECTION)
      }} />
      <CustomLayout>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>
            Let's Get to Know You Better!
          </Text>
          <Text style={styles.subTitle}>
            Your height and weight can help us provide a more personalized experience.
          </Text>

          <View style={{ marginTop: scaleHeight(30) }}>

            <Text style={styles.label}>{'Height'}</Text>

            <View

              style={{

                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.dark.inputBg,
                height: 45,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: theme.dark.text,
                marginTop: scaleHeight(30)

              }}>

              <View style={{ flexDirection: 'row', marginHorizontal: scaleWidth(10), flex: 1 }}>

                <TextInput
                  style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(14),
                    color: theme.dark.text,
                    marginHorizontal: 10
                  }}
                  maxLength={2}
                  placeholder='00'
                  keyboardType='number-pad'
                  placeholderTextColor={theme.dark.text}
                />

                <View style={styles.verticleLine}></View>

                <TextInput
                  style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(14),
                    color: theme.dark.text
                  }}
                  maxLength={2}
                  placeholder='00'
                  keyboardType='number-pad'
                  placeholderTextColor={theme.dark.text}
                />

              </View>

              <View style={{
                flexDirection: 'row',
                borderRadius: 30,
                borderWidth: 1,
                borderColor: theme.dark.secondary,
                width: scaleWidth(70),
                height: '70%',
                marginEnd: scaleWidth(10),
                justifyContent: 'space-evenly',
              }}>

                <TouchableOpacity
                  onPress={() => {
                    handleToggleFt();
                  }}
                  style={{
                    backgroundColor: hieghtFtSelected ? theme.dark.secondary : '#333333',
                    width: scaleWidth(35),
                    height: '100%',
                    alignSelf: 'center',
                    borderBottomLeftRadius: 30,
                    borderTopLeftRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(12),
                    color: hieghtFtSelected ? theme.dark.black : theme.dark.white,
                    alignSelf: 'center'

                  }}>Ft</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleToggleInches();
                  }}
                  style={{
                    backgroundColor: hieghtInSelected ? theme.dark.secondary : '#333333',
                    width: scaleWidth(35),
                    height: '100%',
                    alignSelf: 'center',
                    borderBottomEndRadius: 30,
                    borderTopEndRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(12),
                    color: hieghtInSelected ? theme.dark.black : theme.dark.white,
                    alignSelf: 'center'

                  }}>In</Text>
                </TouchableOpacity>

              </View>


            </View>

            <Text style={styles.label}>{'Weight'}</Text>

            <View

              style={{

                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.dark.inputBg,
                height: 45,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: theme.dark.text,
                marginTop: scaleHeight(30)

              }}>

              <View style={{ flexDirection: 'row', marginHorizontal: scaleWidth(10), flex: 1 }}>

                <TextInput
                  style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(14),
                    color: theme.dark.text,
                    marginHorizontal: 10
                  }}
                  maxLength={2}
                  keyboardType='number-pad'
                  placeholder='00'
                  placeholderTextColor={theme.dark.text}
                />

                <View style={styles.verticleLine}></View>

                <TextInput
                  style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(14),
                    color: theme.dark.text
                  }}
                  maxLength={2}
                  keyboardType='number-pad'
                  placeholder='00'
                  placeholderTextColor={theme.dark.text}
                />

              </View>

              <View style={{
                flexDirection: 'row',
                borderRadius: 30,
                borderWidth: 1,
                borderColor: theme.dark.secondary,
                width: scaleWidth(70),
                height: '70%',
                marginEnd: scaleWidth(10),
                justifyContent: 'space-evenly',
              }}>

                <TouchableOpacity
                  onPress={() => {
                    handleToggleKg();
                  }}
                  style={{
                    backgroundColor: weightKgSelected ? theme.dark.secondary : '#333333',
                    width: scaleWidth(35),
                    height: '100%',
                    alignSelf: 'center',
                    borderBottomLeftRadius: 30,
                    borderTopLeftRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(12),
                    color: weightKgSelected ? theme.dark.black : theme.dark.white,
                    alignSelf: 'center'

                  }}>Kg</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleToggleLb();
                  }}
                  style={{
                    backgroundColor: weightLbSelected ? theme.dark.secondary : '#333333',
                    width: scaleWidth(35),
                    height: '100%',
                    alignSelf: 'center',
                    borderBottomEndRadius: 30,
                    borderTopEndRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: scaleHeight(12),
                    color: weightLbSelected ? theme.dark.black : theme.dark.white,
                    alignSelf: 'center'

                  }}>Lb</Text>
                </TouchableOpacity>

              </View>


            </View>

          </View>

        </View>

        <View style={styles.buttonContainer}>

          <HorizontalDivider
            customStyle={{
              marginTop: 40
            }} />

          <Button
            onPress={() => {
              //handleselectedGender();
              resetNavigation(navigation, SCREENS.SELECT_LANGUAGE)
            }}
            title={'Continue'}
          />
        </View>

      </CustomLayout>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background
  },
  contentContainer: {
    padding: 25,
    flex: 1
  },
  welcomeText: {
    fontFamily: fonts.fontsType.semiBold,
    fontSize: scaleHeight(22),
    color: theme.dark.white,
    marginTop: 15
  },
  subTitle: {
    fontFamily: fonts.fontsType.regular,
    fontSize: scaleHeight(14),
    color: theme.dark.heading,
    marginTop: 5
  },
  forgetText: {
    fontFamily: fonts.fontsType.semiBold,
    fontSize: scaleHeight(14),
    color: theme.dark.secondary,
    alignSelf: 'center'
  },
  createAccountText1: {
    fontFamily: fonts.fontsType.regular,
    fontSize: scaleHeight(16),
    color: theme.dark.white
  },
  createAccountText2: {
    fontFamily: fonts.fontsType.bold,
    fontSize: scaleHeight(16),
    color: theme.dark.secondary,
    marginHorizontal: 5,
    textDecorationLine: 'underline'
  },
  createAccountItem: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scaleHeight(200),
    marginBottom: scaleHeight(20)
  },
  createAccountView: {
    flex: 1
  },
  forgetPassContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    alignSelf: 'center'
  },
  errorText: {
    fontFamily: fonts.fontsType.regular,
    fontSize: scaleHeight(12),
    color: theme.dark.error,
    marginTop: 8,
    marginHorizontal: scaleWidth(15),
  },
  verticleLine: {
    height: '60%',
    width: 1,
    backgroundColor: '#909090',
    alignSelf: 'center'
  },
  label: {
    fontFamily: fonts.fontsType.medium,
    fontSize: scaleHeight(17),
    color: theme.dark.inputLabel,
    marginHorizontal: 8,
    top: scaleHeight(20)
  }
});


export default HeightWeight;
