//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { resetNavigation } from '../../../../../utils/resetNavigation';
import { SCREENS } from '../../../../../constant/constants';
import useBackHandler from '../../../../../utils/useBackHandler';
import Header from '../../../../../components/Header';
import { theme } from '../../../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import Camera from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { editImage, locationPin } from '../../../../../assets/images';
import { scaleHeight, scaleWidth } from '../../../../../styles/responsive';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import CustomLayout from '../../../../../components/CustomLayout';
import fonts from '../../../../../styles/fonts';
import CustomTextInput from '../../../../../components/TextInputComponent';
import HorizontalDivider from '../../../../../components/HorizontalDivider';
import CheckBox from '../../../../../components/CheckboxComponent';
import Button from '../../../../../components/ButtonComponent';
import { LanguagesIcon } from '../../../../../assets/svgs';
import { getUserDetail } from '../../../../../redux/BuddyDashboard/userLikesDetailSlice';
import { getAddressByLatLong } from '../../../../../redux/getAddressByLatLongSlice';
import { useAlert } from '../../../../../providers/AlertContext';
import { setRoute } from '../../../../../redux/appSlice';
import { updateProfile } from '../../../../../redux/AuthModule/updateProfileSlice';
import LanguagesItem from '../../../../../components/LanguagesItem';
import { reverseGeocode } from '../../../../../utils/geoCodeUtils';

const UpdateBuddyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const { userDetail } = useSelector((state) => state.getUserDetail)
    const { loading } = useSelector((state) => state.createProfile)
    const { address } = useSelector((state) => state.getAddress)
    const { userLoginInfo } = useSelector((state) => state.auth)
    const user_id = userLoginInfo?.user?.id
    const { currentRoute } = useSelector((state) => state.app)
    const [selectedImages, setSelectedImages] = useState(['', '', '']);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({ day: '', month: '', year: '' });
    const [errors, setErrors] = useState({ birthDate: '' });
    const [selectedOption, setSelectedOption] = useState('');
    const [loader, setLoader] = useState(false)
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [placeName, setPlaceName] = useState('')
    const [inputValues, setInputValues] = useState({
        height_ft: '',
        height_in: '',
        weight_kg: '',
        weight_lb: '',
        weight_unit: 'KG',
        full_name: '',
        about: '',
        gender: '',
        location: ''
    });

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const hasRendered = useRef(false);

    useEffect(() => {
        hasRendered.current = true;
    }, []);



    const handleChange = (name, value) => {

        if (!hasRendered.current) return;

        if (name === 'day' && parseInt(value) > 31) {
            value = '31'; // Reset to max valid value if greater than 31
        }
        if (name === 'month' && parseInt(value) > 12) {
            value = '12'; // Reset to max valid value if greater than 12
        }

        // setForm({ ...form, [name]: value });

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

        if (name === 'day' && value.length === 2 && !isFirstLoad) {
            monthRef.current.focus();
        } else if (name === 'month' && value.length === 2) {
            yearRef.current.focus();
        }

        let error = '';
        if (name === 'birthDate') {
            if (value === '') {
                error = 'Birthdate is required.';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const [hieghtFtSelected, setHeightFtSelected] = useState(true);
    const [hieghtInSelected, setHeightInSelected] = useState(false);
    const [weightKgSelected, setWeightKgSelected] = useState(true);
    const [weightLbSelected, setWeightLbSelected] = useState(false);


    const handleBackPress = () => {
        if (currentRoute?.route === SCREENS.MAIN_DASHBOARD) {
            resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.PROFILE })
        } else {
            resetNavigation(navigation, currentRoute?.route)
        }

        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        dispatch(getUserDetail(user_id))
    }, [dispatch, user_id])

    const handleLocation = async () => {

        if (userDetail) {
            const { longitude, latitude } = userDetail?.location
            const address = await reverseGeocode(latitude, longitude);
            setPlaceName(address)
            // dispatch(getAddressByLatLong({
            //     lat: latitude,
            //     long: longitude
            // }));
        }
    };

    useEffect(() => {
        handleLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])

    // useEffect(() => {
    //     if (userDetail) {
    //         const { longitude, latitude } = userDetail?.location
    //         console.log(longitude, latitude)
    //         dispatch(getAddressByLatLong({
    //             lat: latitude,
    //             long: longitude
    //         }));
    //     }

    // }, [dispatch, userDetail])

    const userLocation = userDetail?.location?.country && userDetail?.location?.city
        ? `${userDetail.location.country}, ${userDetail.location.city}`
        : null;


    const addressLocation = (address?.city || address?.town || address?.suburb || address?.country) && address?.country
        ? `${address.city || address.town || address.suburb || address.county || address.state}, ${address.country}`
        : null;

    const updateImages = (image_urls) => {
        let updatedImages = [...selectedImages];
        image_urls?.forEach((url, index) => {
            if (index < updatedImages?.length) {
                updatedImages[index] = url;
            }
        });

        setSelectedImages(updatedImages);
    }
    const setDob = (dob) => {
        const [year, month, day] = dob?.split('-');
        handleChange('year', year);
        handleChange('month', month);
        handleChange('day', day);
    };

    useEffect(() => {
        const {
            height_ft,
            height_in,
            weight_unit,
            weight,
            full_name,
            about,
            image_urls,
            gender,
            dob
        } = userDetail || {};


        updateImages(image_urls && image_urls)
        setSelectedOption(gender)
        setDob(dob)
        setInputValues(prevValues => ({
            ...prevValues,
            full_name,
            about,
            height_ft: String(height_ft),
            height_in: String(height_in)
        }));

        // Set weight unit selection
        if (weight_unit === 'LB') {
            setWeightKgSelected(false);
            setWeightLbSelected(true);
            setInputValues(prevValues => ({
                ...prevValues,
                weight_lb: weight,
                weight_unit: "LB"
            }));
        } else {
            setWeightKgSelected(true);
            setWeightLbSelected(false);
            setInputValues(prevValues => ({
                ...prevValues,
                weight_kg: weight,
                weight_unit: "KG"
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail]);


    const openImagePicker = () => {
        setModalVisible(false);
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                const imageUri = response.uri || response.assets?.[0]?.uri;
                const updatedImages = [...selectedImages];
                updatedImages[currentImageIndex] = imageUri;
                setSelectedImages(updatedImages);
            }
        });
    };

    const handleCameraLaunch = () => {
        setModalVisible(false);
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            cameraType: 'front',
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                const imageUri = response.uri || response.assets?.[0]?.uri;
                const updatedImages = [...selectedImages];
                updatedImages[currentImageIndex] = imageUri;
                setSelectedImages(updatedImages);
            }
        });
    };

    const handleToggleKg = () => {
        setWeightKgSelected(true);
        setWeightLbSelected(false);
        setInputValues(prevValues => ({
            ...prevValues,
            weight_lb: '',
            weight_unit: 'KG'
        }));
    };

    const handleToggleLb = () => {
        setWeightKgSelected(false);
        setWeightLbSelected(true);
        setInputValues(prevValues => ({
            ...prevValues,
            weight_kg: '',
            weight_unit: 'LB'
        }));

    };


    const handleKeyPress = (name, key) => {
        setFirstLoad(false)
        if (key === 'Backspace') {
            if (name === 'month' && form.month === '') {
                dayRef.current.focus();
            } else if (name === 'year' && form.year === '') {
                monthRef.current.focus();
            }
        }
    };

    const handleCheckBoxStatusChange = (formField, label, isChecked) => {
        //console.log(`${label} is ${isChecked ? 'checked' : 'unchecked'}`);
        if (formField === "top_rated_profile" || formField === "top_liked_profile") {
            handleChange(formField, isChecked);
        } else {
            //handleChange(formField, label);
            setInputValues({ ...inputValues, gender: label })
        }

    };

    const handleChangeLocation = (screen) => {
        dispatch(setRoute({
            route: SCREENS.UPDATE_BUDDY_PROFILE
        }))
        resetNavigation(navigation, screen)
    }

    const showModalView = () => (
        <Modal
            backdropOpacity={0.90}
            backdropColor={'rgba(85, 85, 85, 0.70)'}
            isVisible={modalVisible}
            animationIn={'bounceIn'}
            animationOut={'bounceOut'}
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <View style={styles.modalContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalTitle}>Upload photos from</Text>
                    <Icon
                        onPress={() => setModalVisible(false)}
                        size={24}
                        color={theme.dark.white}
                        name='close'
                    />
                </View>
                <View style={styles.modalOptions}>
                    <View style={styles.modalOption}>
                        <TouchableOpacity onPress={openImagePicker} style={styles.optionButton}>
                            <EvilIcons size={40} color={theme.dark.secondary} name='image' />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>Your photos</Text>
                    </View>
                    <View style={styles.modalOption}>
                        <TouchableOpacity onPress={handleCameraLaunch} style={styles.optionButton}>
                            <Camera size={26} color={theme.dark.secondary} name='camera' />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>From Camera</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const handleUpdateProfile = () => {
        setLoader(true)
        setTimeout(() => {
            const { day, month, year } = form;
            const birthDate = `${year}-${month}-${day}`;
            const imageType = selectedImages[0]?.endsWith('.png') ? 'image/png' : 'image/jpeg';
            const formData = new FormData();

            selectedImages?.forEach((image, index) => {
                if (image && image.trim()) {
                    formData.append('files', {
                        uri: image,
                        type: imageType,
                        name: `image_${Date.now()}_${index}.${imageType.split('/')[1]}`,
                    });
                }
            });

            formData.append('full_name', inputValues?.full_name);
            formData.append('about', inputValues?.about);
            formData.append('gender', selectedOption);
            formData.append('height_ft', inputValues?.height_ft);
            formData.append('height_in', inputValues?.height_in);
            formData.append('weight', inputValues?.weight_kg);
            formData.append('weight_unit', inputValues?.weight_unit);
            formData.append('dob', birthDate);
            console.log(JSON.stringify(formData))
            dispatch(updateProfile(formData)).then((result) => {
                setLoader(false)
                if (result?.payload?.status === "success") {
                    showAlert("Success", "success", result?.payload?.message)
                    setTimeout(() => {
                        handleBackPress();
                    }, 3000);
                } else if (result?.payload?.status === "error") {
                    setLoader(false)
                    showAlert("Error", "error", result?.payload?.message)
                }
            })
        }, 1000);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                onPress={() => {
                    handleBackPress();
                }}
                title={"Update Profile"}
            />

            <View style={{
                marginHorizontal: 20,
                flex: 1
            }}>

                <CustomLayout>

                    <View style={styles.imagePickerContainer}>
                        {selectedImages.map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setCurrentImageIndex(index);
                                    setModalVisible(true);
                                }}
                                style={styles.imagePicker}
                            >
                                {image ? (
                                    <Image resizeMode='cover' source={{ uri: image }} style={styles.selectedImageStyle} />
                                ) : (
                                    <Camera size={30} color={theme.dark.heading} name='camera' />
                                )}
                                {!image ? (
                                    <Icon size={24} color={theme.dark.secondary} name='plus-circle' style={styles.plusButton} />
                                ) : (
                                    <Image source={editImage} style={[styles.plusButton, { width: scaleWidth(40), height: scaleHeight(40), bottom: 0, right: 0 }]} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <CustomTextInput
                        label={"Full Name"}
                        identifier={"full_name"}
                        value={inputValues?.full_name}
                        isColorWhite={true}
                        onValueChange={(text) => setInputValues({ ...inputValues, full_name: text })}
                        mainContainer={{
                            marginTop: scaleHeight(20)
                        }}
                        customInputStyle={{
                            color: theme.dark.white,
                            fontSize: scaleHeight(15),
                            fontFamily: fonts.fontsType.regular,
                        }}

                    />

                    <CustomTextInput
                        label={"About Me"}
                        identifier={"about"}
                        value={inputValues?.about}
                        onValueChange={(text) => setInputValues({ ...inputValues, about: text })}
                        multiline={true}
                        isColorWhite={true}
                        mainContainer={{
                            marginTop: scaleHeight(5)
                        }}

                        customInputStyle={{
                            color: theme.dark.white,
                            fontSize: scaleHeight(15),
                            fontFamily: fonts.fontsType.regular,
                            lineHeight: 26,
                            textAlign: 'justify'
                        }}

                    />

                    <View>
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
                                        marginHorizontal: 10,
                                        width: scaleWidth(50)
                                    }}
                                    maxLength={2}
                                    placeholder='00'
                                    keyboardType='number-pad'
                                    placeholderTextColor={theme.dark.text}
                                    value={inputValues.height_ft}
                                    onChangeText={(text) => setInputValues({ ...inputValues, height_ft: text })}
                                />

                                <View style={styles.verticleLine}></View>

                                <TextInput
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(14),
                                        color: theme.dark.text,
                                        width: scaleWidth(50)
                                    }}
                                    maxLength={2}
                                    placeholder='00'
                                    keyboardType='number-pad'
                                    placeholderTextColor={theme.dark.text}
                                    value={inputValues.height_in}
                                    onChangeText={(text) => setInputValues({ ...inputValues, height_in: text })}
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
                                backgroundColor: theme.dark.transparentBg
                            }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        //handleToggleFt();
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
                                        fontFamily: fonts.fontsType.semiBold,
                                        fontSize: scaleHeight(12),
                                        color: hieghtFtSelected ? theme.dark.black : theme.dark.white,
                                        alignSelf: 'center'

                                    }}>Ft</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        //handleToggleInches();
                                    }}
                                    style={{
                                        // backgroundColor: hieghtInSelected ? theme.dark.secondary : '#333333',
                                        backgroundColor: theme.dark.secondary,
                                        width: scaleWidth(35),
                                        height: '100%',
                                        alignSelf: 'center',
                                        borderBottomEndRadius: 30,
                                        borderTopEndRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        left: 1
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: fonts.fontsType.semiBold,
                                        fontSize: scaleHeight(12),
                                        // color: hieghtInSelected ? theme.dark.black : theme.dark.white,
                                        color: theme.dark.black,
                                        alignSelf: 'center'

                                    }}>In</Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    </View>

                    <View>

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
                                        marginHorizontal: 10,
                                        width: scaleWidth(50)
                                    }}
                                    editable={weightKgSelected}
                                    maxLength={2}
                                    keyboardType='number-pad'
                                    placeholder='00'
                                    placeholderTextColor={theme.dark.text}
                                    value={inputValues.weight_kg}
                                    onChangeText={(text) => setInputValues({ ...inputValues, weight_kg: text })}
                                />

                                <View style={styles.verticleLine}></View>

                                <TextInput
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(14),
                                        color: theme.dark.text,
                                        width: scaleWidth(50)
                                    }}
                                    editable={weightLbSelected}
                                    maxLength={2}
                                    keyboardType='number-pad'
                                    placeholder='00'
                                    placeholderTextColor={theme.dark.text}
                                    value={inputValues.weight_lb}
                                    onChangeText={(text) => setInputValues({ ...inputValues, weight_lb: text })}
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
                                        fontFamily: fonts.fontsType.semiBold,
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
                                        fontFamily: fonts.fontsType.semiBold,
                                        fontSize: scaleHeight(12),
                                        color: weightLbSelected ? theme.dark.black : theme.dark.white,
                                        alignSelf: 'center'

                                    }}>Lb</Text>
                                </TouchableOpacity>

                            </View>


                        </View>

                    </View>

                    <View>
                        <Text style={styles.label}>{'Date of Birth'}</Text>
                        <View style={styles.inputContainerStyle}>

                            <TextInput
                                ref={dayRef}
                                placeholder='DD'
                                placeholderTextColor={theme.dark.inputLabel}
                                maxLength={2}
                                keyboardType='number-pad'
                                style={styles.inputStyle}
                                value={form.day}
                                onChangeText={(value) => handleChange('day', value)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress('day', nativeEvent.key)}
                            />

                            <View style={styles.verticleLine}></View>

                            <TextInput
                                ref={monthRef}
                                placeholder='MM'
                                placeholderTextColor={theme.dark.inputLabel}
                                maxLength={2}
                                autoFocus={false}
                                keyboardType='number-pad'
                                style={styles.inputStyle}
                                value={form.month}
                                onChangeText={(value) => handleChange('month', value)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress('month', nativeEvent.key)}
                            />

                            <View style={styles.verticleLine}></View>

                            <TextInput
                                ref={yearRef}
                                placeholder='YYYY'
                                placeholderTextColor={theme.dark.inputLabel}
                                maxLength={4}
                                keyboardType='number-pad'
                                style={styles.inputStyle}
                                value={form.year}
                                onChangeText={(value) => {
                                    handleChange('year', value)
                                }}
                                onKeyPress={({ nativeEvent }) => handleKeyPress('year', nativeEvent.key)}
                            />

                        </View>
                        {errors.birthDate ? <Text style={styles.errorText}>{errors.birthDate}</Text> : null}
                    </View>

                    <HorizontalDivider customStyle={{
                        marginVertical: 20
                    }} />

                    <View style={{
                        //marginHorizontal: 15,
                        marginTop: scaleHeight(-10)
                    }}>
                        <Text style={{
                            fontFamily: fonts.fontsType.medium,
                            fontSize: scaleHeight(19),
                            color: theme.dark.secondary,
                        }}>
                            Gender
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <CheckBox
                                onStatusChange={handleCheckBoxStatusChange}
                                label={"Male"}
                                mode="single"
                                formField={"gender"}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                labelStyle={{
                                    color: theme.dark.inputBackground,
                                    fontFamily: fonts.fontsType.semiBold,
                                    fontSize: scaleHeight(15),
                                }} />
                            <CheckBox
                                onStatusChange={handleCheckBoxStatusChange}
                                label={"Female"}
                                mode="single"
                                formField={"gender"}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                checkBoxStyle={{
                                    marginHorizontal: scaleWidth(40)
                                }}
                                labelStyle={{
                                    color: theme.dark.inputBackground,
                                    fontFamily: fonts.fontsType.semiBold,
                                    fontSize: scaleHeight(15),
                                }} />
                        </View>

                        <View style={{
                            marginTop: 10
                        }}>
                            <CheckBox
                                onStatusChange={handleCheckBoxStatusChange}
                                label={"Prefer not to say"}
                                mode="single"
                                formField={"gender"}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                labelStyle={{
                                    color: theme.dark.inputBackground,
                                    fontFamily: fonts.fontsType.semiBold,
                                    fontSize: scaleHeight(15),
                                }} />
                        </View>
                    </View>

                    <HorizontalDivider customStyle={{
                        marginVertical: 20
                    }} />

                    <View style={{
                        flexDirection: 'row',
                        marginTop: scaleHeight(-8),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            //  marginHorizontal: -5,
                            //  marginBottom: scaleHeight(5),
                            flex: 1
                        }}>

                            <Image
                                resizeMode='contain'
                                style={{

                                    width: scaleWidth(18),
                                    height: scaleHeight(18),
                                    alignSelf: 'center',

                                }} source={locationPin} />

                            <Text style={styles.locationText}>
                                {userLocation || placeName || 'Location not available'}
                            </Text>

                            {/* <Text style={styles.locationText}>{userDetail?.location?.country && userDetail?.location?.city ?
                                `${userDetail?.location?.country}, ${userDetail?.location?.city}` :
                                (address?.city || address?.town) && address?.country ?
                                    `${address.city || address.town}, ${address.country}` :
                                    'Location not available'
                            }</Text> */}

                        </View>
                        <Button
                            onPress={() => {
                                handleChangeLocation(SCREENS.CHANGE_LOCATION);
                            }}
                            title={"Change"}
                            customStyle={{
                                width: '25%',
                                height: scaleHeight(25),
                                marginBottom: 0,
                                marginTop: 0
                            }}
                            textCustomStyle={{
                                fontSize: scaleHeight(14),
                            }}
                        />

                    </View>

                    <HorizontalDivider customStyle={{
                        marginVertical: 20
                    }} />

                    <View style={{
                        flexDirection: 'row',
                        marginTop: scaleHeight(-8),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            // marginHorizontal: -5,
                            //  marginBottom: scaleHeight(5),
                            flex: 1
                        }}>

                            <LanguagesIcon />

                            <Text style={styles.locationText}>{"Languages"}</Text>

                        </View>
                        <Button
                            onPress={() => {
                                handleChangeLocation(SCREENS.UPDATE_LANGUAGES);
                            }}
                            title={"Change"}
                            customStyle={{
                                width: '25%',
                                height: scaleHeight(25),
                                marginBottom: 0,
                                marginTop: 0
                            }}
                            textCustomStyle={{
                                fontSize: scaleHeight(14),
                            }}
                        />

                    </View>
                    
                    {JSON.parse(userDetail?.languages) != null && <LanguagesItem languages={JSON.parse(userDetail?.languages)} />}

                    <Button
                        loading={loader}
                        onPress={() => {
                            handleUpdateProfile()
                        }}
                        title={"Update Profile"}
                        customStyle={{
                            marginTop: 70,
                            width: '100%'
                        }} />

                </CustomLayout>
            </View>

            {showModalView()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },

    modalContainer: {
        backgroundColor: '#111111',
        width: '90%',
        height: scaleHeight(241),
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 20,
        padding: 20,
    },
    modalTitle: {
        color: theme.dark.white,
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(16),
        flex: 1,
    },
    modalOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: scaleHeight(40),
    },
    modalOption: {
        alignItems: 'center',
    },
    optionButton: {
        width: scaleWidth(80),
        height: scaleHeight(80),
        borderWidth: 1,
        borderColor: theme.dark.secondary,
        backgroundColor: 'rgba(252, 226, 32, 0.13)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        color: theme.dark.white,
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(16),
        marginTop: scaleHeight(10),
    },
    imagePickerContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: scaleHeight(20),
        flexDirection: 'row',
    },
    imagePicker: {
        width: scaleWidth(100),
        height: scaleHeight(147),
        borderWidth: 1,
        borderColor: theme.dark.heading,
        backgroundColor: theme.dark.inputBg,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scaleWidth(10),
    },
    plusButton: {
        position: 'absolute',
        bottom: 4,
        right: 8,
    },
    selectedImageStyle: {
        width: scaleWidth(100),
        height: scaleHeight(147),
        borderRadius: 22,
    },
    label: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(17),
        color: theme.dark.inputLabel,
        marginHorizontal: 8,
        top: scaleHeight(20)
    },
    inputContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.dark.inputBg,
        marginTop: scaleHeight(30),
        height: scaleHeight(45),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.text,
        justifyContent: 'space-evenly'
    },
    verticleLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#909090',
    },
    inputStyle: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(18),
        color: theme.dark.inputLabel,
        textAlign: 'center',
        flex: 1
    },
    locationText: {
        color: theme.dark.white,
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(15),
        width: '90%',
        alignSelf: 'center',
        marginHorizontal: scaleWidth(10)
    },
});

export default UpdateBuddyProfile;
