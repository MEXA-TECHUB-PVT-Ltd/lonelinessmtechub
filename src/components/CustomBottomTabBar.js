import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Platform } from 'react-native';
import fonts from '../styles/fonts';
import { theme } from '../assets';
import { scaleHeight } from '../styles/responsive';
import { useAuth } from '../providers/AuthProvider';

const CustomBottomTabBar = ({ state, descriptors, navigation, icons, chatBadgeCount }) => {
    const { routes } = state;
    const { isLoggedIn, userRole } = useAuth();

    return (
        <View style={[styles.tabContainer, { backgroundColor: userRole === 'Buddy Finder' ? '#4C4615' : theme.dark.primary, }]}>
            {routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.title !== undefined ? options.title : route.name;
                const Icon = options.icon; // Extract icon from options
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={[styles.tabButton, isFocused && styles.selectedTab]}
                    >
                        {/* Icon */}
                        <View style={{ position: 'relative' }}>
                            <Image style={{
                                height: 24,
                                width: 26,
                                alignSelf: 'center',
                                tintColor: isFocused
                                    ? theme.dark.secondary
                                    : theme.dark.inActiveColor,
                            }}
                                source={icons[index]} />
                        </View>
                        <Text style={[styles.tabText, {
                            color: isFocused
                                ? theme.dark.secondary
                                : theme.dark.inActiveColor,
                        }]}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#4C4615',
        height: Platform.OS === 'ios' ? 80 : 56,
        paddingBottom: Platform.OS === 'ios' ? 15 : 0,
        // shadowOpacity: 0.05,
        // elevation: 4,
    },
    tabButton: {
        borderRadius: 30,
        paddingHorizontal: 10,
        height: 40
    },
    tabText: {
        alignSelf: 'center',
        color: theme.dark.secondary,
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(15),
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red', // Adjust badge background color
        borderRadius: 10,
        minWidth: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white', // Adjust badge text color
        fontSize: 10,
        fontFamily: fonts.fontsType.medium,
        alignSelf: 'center'
    },
});

export default CustomBottomTabBar;
