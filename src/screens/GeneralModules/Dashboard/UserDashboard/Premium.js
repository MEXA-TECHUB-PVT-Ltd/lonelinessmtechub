import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import Button from '../../../../components/ButtonComponent';
import PremiumItem from '../../../../components/PremiumItem';
import { premiumGift } from '../../../../assets/images';
import { theme } from '../../../../assets';
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';
import Header from '../../../../components/Header';


const Premium = ({ navigation }) => {
    const [selectedPlan, setSelectedPlan] = useState('1 Month');
    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                onPress={() => {
                    handleBackPress()
                }}
                title={"Go Premium"} />
            <View style={styles.container}>


                {/* <Text style={styles.title}>Go Premium</Text> */}
                <View style={styles.giftBox}>
                    <Image
                        style={{
                            width: scaleWidth(250),
                            height: scaleHeight(150),
                            alignSelf: 'center'
                        }}
                        source={premiumGift} />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, selectedPlan === '1 Month' && styles.selectedButton]}
                        onPress={() => setSelectedPlan('1 Month')}
                    >
                        <Text style={[styles.buttonText, selectedPlan === '1 Month' && styles.selectedText]}>$500</Text>
                        <Text style={[styles.buttonSubText, selectedPlan === '1 Month' && styles.selectedSubText]}>1 Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedPlan === '6 Months' && styles.selectedButton]}
                        onPress={() => setSelectedPlan('6 Months')}
                    >
                        <Text style={[styles.buttonText, selectedPlan === '6 Months' && styles.selectedText]}>$900</Text>
                        <Text style={[styles.buttonSubText, selectedPlan === '6 Months' && styles.selectedSubText]}>6 Months</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedPlan === '12 Months' && styles.selectedButton]}
                        onPress={() => setSelectedPlan('12 Months')}
                    >
                        <Text style={[styles.buttonText, selectedPlan === '12 Months' && styles.selectedText]}>$1,000</Text>
                        <Text style={[styles.buttonSubText, selectedPlan === '12 Months' && styles.selectedSubText]}>12 Months</Text>
                    </TouchableOpacity>
                </View>

                {/* // 1 Month Plan */}

                {
                    selectedPlan === '1 Month' && <View style={styles.featuresList}>
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Unlock premium features for 03 months."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Access advanced matching capabilities."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.inputLabel}
                            text={"Send unlimited likes to increase your connections."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.inputLabel}
                            text={"Flexible monthly pricing for your convenience."}
                        />

                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.inputLabel}
                            text={"Easily upgrade, downgrade, or cancel anytime."}
                        />

                    </View>
                }


                {/* // 6 Month Plan */}

                {
                    selectedPlan === '6 Months' && <View style={styles.featuresList}>
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Unlock premium features for 03 months."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Access advanced matching capabilities."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Send unlimited likes to increase your connections."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Flexible monthly pricing for your convenience."}
                        />

                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.inputLabel}
                            text={"Easily upgrade, downgrade, or cancel anytime."}
                        />

                    </View>
                }


                {/* // 12 Month Plan */}

                {
                    selectedPlan === '12 Months' && <View style={styles.featuresList}>
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Unlock premium features for 03 months."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Access advanced matching capabilities."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Send unlimited likes to increase your connections."}
                        />
                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Flexible monthly pricing for your convenience."}
                        />

                        <PremiumItem
                            iconName="checkcircle"

                            iconColor={theme.dark.secondary}
                            text={"Easily upgrade, downgrade, or cancel anytime."}
                        />

                    </View>
                }

                <Button title={"Pay Now!"} />

            </View>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.dark.primary,

    },
    container: {
        padding: 25,
        alignItems: 'center',
    },
    title: {
        color: theme.dark.secondary,
        fontSize: 24,
        fontFamily: fonts.fontsType.bold,
        marginBottom: 20,
    },
    giftBox: {
        width: 100,
        height: 100,
        marginTop: scaleHeight(30)
    },
    buttonGroup: {
        width: '100%',
        height: scaleHeight(94),
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: scaleHeight(80),
        backgroundColor: theme.dark.inputBg,
        borderRadius: 14
    },
    button: {
        width: scaleWidth(99),
        height: scaleHeight(80),
        backgroundColor: theme.dark.transparentBg,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,

        justifyContent: 'center'
    },
    selectedButton: {
        backgroundColor: theme.dark.secondary,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: theme.dark.inputLabel,
        fontSize: scaleHeight(16),
        fontFamily: fonts.fontsType.bold,
        alignSelf: 'center',
    },
    selectedText: {
        color: theme.dark.primary,
        fontSize: scaleHeight(16),
        alignSelf: 'center',
        fontFamily: fonts.fontsType.bold
    },
    selectedSubText: {
        color: theme.dark.primary,
        fontSize: scaleHeight(16),
        alignSelf: 'center',
        fontFamily: fonts.fontsType.bold
    },
    buttonSubText: {
        color: theme.dark.inputLabel,
        fontSize: scaleHeight(16),
        fontFamily: fonts.fontsType.bold,
        alignSelf: 'center',

    },
    featuresList: {
        marginBottom: 20,
    },
    feature: {
        color: '#FFF',
        fontSize: 14,
        marginVertical: 5,
    },
    payButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 5,
    },
    payButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Premium;