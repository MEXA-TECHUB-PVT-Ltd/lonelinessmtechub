import React, { Component } from 'react';
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


const data = [
    { id: '1', icon: WalletIcon, text: 'My Wallet' },
    { id: '2', icon: PremiumIcon, text: 'Go Premium' },
    { id: '3', icon: ProfileIcon, text: 'Update Profile' },
    { id: '4', icon: PasswordIcon, text: 'Change Password' },
    { id: '5', icon: RateAppIcon, text: 'Rate App' },
    { id: '6', icon: ShareAppIcon, text: 'Share App' },
    { id: '7', icon: PrivacyPolicyIcon, text: 'Privacy Policy' },
    { id: '8', icon: TermsConditionsIcon, text: 'Terms & Conditions' },
    { id: '9', icon: LogoutIcon, text: 'Logout' },
    { id: '10', icon: DeleteAccountIcon, text: 'Delete Account' },
];


const Profile = () => {


    const renderItem = ({ item }) => (
        <ProfileItemContainer
            onPress={() => {
                console.log(item)
            }}
            IconComponent={item.icon}
            text={item.text} />
    );

    return (
        <View style={styles.container}>
            <CustomHeader
                homeLogo={homeLogo}
                title="Profile"
            />

            <View style={{
                padding: 25
            }}>
                <ProfileHeader />
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
