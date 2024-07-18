import React, { Component, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { theme } from '../../../assets';
import ProfileHeader from '../../../components/ProfileHeader';
import { homeLogo } from '../../../assets/images';
import CustomHeader from '../../../components/CustomHeader';
import ProfileItemContainer from '../../../components/ProfileItemContainer';
import WalletIcon from '../../../assets/svgs/wallet_icon.svg'
import PremiumIcon from '../../../assets/svgs/premium_icon.svg';
import ProfileIcon from '../../../assets/svgs/profile_icon.svg';
import PasswordIcon from '../../../assets/svgs/password_icon.svg';
import RateAppIcon from '../../../assets/svgs/rate_app_icon.svg';
import ShareAppIcon from '../../../assets/svgs/share_app_icon.svg';
import PrivacyPolicyIcon from '../../../assets/svgs/privacy_policy_icon.svg';
import TermsConditionsIcon from '../../../assets/svgs/terms_conditions_icon.svg';
import LogoutIcon from '../../../assets/svgs/logout_icon.svg';
import DeleteAccountIcon from '../../../assets/svgs/delete_account_icon.svg';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import { HeartIcon, UpdateBuddyProfile, UpdateInterests, UpdateRate } from '../../../assets/svgs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../redux/BuddyDashboard/userLikesDetailSlice';


const userList = [
    { id: '1', icon: WalletIcon, text: 'My Wallet', route: SCREENS.MY_WALLET },
    { id: '2', icon: PremiumIcon, text: 'Go Premium' },
    { id: '3', icon: ProfileIcon, text: 'Update Profile' },
    { id: '4', icon: PasswordIcon, text: 'Change Password', route: SCREENS.CHANGE_PASSWORD },
    { id: '5', icon: RateAppIcon, text: 'Rate App' },
    { id: '6', icon: ShareAppIcon, text: 'Share App' },
    { id: '7', icon: PrivacyPolicyIcon, text: 'Privacy Policy' },
    { id: '8', icon: TermsConditionsIcon, text: 'Terms & Conditions' },
    { id: '9', icon: LogoutIcon, text: 'Logout' },
    { id: '10', icon: DeleteAccountIcon, text: 'Delete Account' },
];

const buddyList = [
    { id: '1', icon: WalletIcon, text: 'My Wallet', route: SCREENS.MY_WALLET },
    { id: '2', icon: HeartIcon, text: 'My Likes', route: SCREENS.MY_LIKES },
    { id: '3', icon: RateAppIcon, text: 'My Ratings', route: SCREENS.RATING },
    { id: '4', icon: UpdateRate, text: 'Update Rate' },
    { id: '5', icon: UpdateInterests, text: 'Update Intersets' },
    { id: '6', icon: UpdateBuddyProfile, text: 'Update Profile' },
    { id: '4', icon: PasswordIcon, text: 'Change Password', route: SCREENS.CHANGE_PASSWORD },
    { id: '7', icon: RateAppIcon, text: 'Rate App' },
    { id: '8', icon: ShareAppIcon, text: 'Share App' },
    { id: '9', icon: PrivacyPolicyIcon, text: 'Privacy Policy' },
    { id: '10', icon: TermsConditionsIcon, text: 'Terms & Conditions' },
    { id: '11', icon: LogoutIcon, text: 'Logout' },
    { id: '12', icon: DeleteAccountIcon, text: 'Delete Account' },
];


const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userDetail, loading } = useSelector((state) => state.getUserDetail)
    const { role, userLoginInfo } = useSelector((state) => state.auth);
    const profileList = role === "USER" ? userList : buddyList
    const profileNav = role === "USER" ? SCREENS.USER_PROFILE_DETAIL : SCREENS.BUDDY_PROFILE_DETAIL;
    const user_id = userLoginInfo?.user?.id



    useEffect(() => {
        dispatch(getUserDetail(user_id));
    }, [dispatch, user_id])


    const handleNavigation = (route) => {
        resetNavigation(navigation, route)
    }


    const renderItem = ({ item, index }) => (
        <ProfileItemContainer
            onPress={() => { handleNavigation(item?.route) }}
            IconComponent={item.icon}
            text={item.text}
            index={index}
        />
    );

    return (
        <View style={styles.container}>
            <CustomHeader
                homeLogo={homeLogo}
                title="Profile"
            />

            <View style={{
                flex: 1,
                paddingHorizontal: 25
            }}>
                <ProfileHeader
                    onPress={() => {
                        resetNavigation(navigation, profileNav)
                    }}
                    image_url={userDetail?.image_urls[0]}
                    full_name={userDetail?.full_name}
                    gender={userDetail?.gender}
                    customHeaderStyle={{
                        marginTop: 20,
                        marginBottom: 10
                    }} />
                <FlatList
                    data={profileList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
    },
});


export default Profile;
