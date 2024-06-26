// ImageCarousel.js
import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { resetNavigation } from '../../../../utils/resetNavigation';
import useBackHandler from '../../../../utils/useBackHandler';
import { SCREENS } from '../../../../constant/constants';
import { dummy1, dummy2, dummyImg } from '../../../../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../../../../assets';
import { scaleHeight } from '../../../../styles/responsive';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



const ImageViewer = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const images = [dummyImg, dummy1, dummy2]

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / screenWidth);
        setActiveIndex(index);
    };

    const scrollToIndex = (index) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: index * screenWidth,
                animated: true,
            });
        }
    };
    const carouselRef = useRef(null);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.imageContainer}>
                <Image source={item} style={styles.image} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
                }}
                style={styles.backButton}>

                <Icon name={'arrow-back'} size={28} color={theme.dark.secondary} />

            </TouchableOpacity>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={image} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {images.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.indicator,
                            index === activeIndex && styles.activeIndicator,
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backButton: {
        paddingHorizontal: 25,
        marginTop: 20
    },
    imageContainer: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight, // Square aspect ratio
    },
    image: {
        width: '100%',
        height: screenHeight,
        resizeMode: 'cover',
        marginTop:scaleHeight(20)
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: theme.dark.transparentBg,
        marginHorizontal: 5,
        borderWidth:1,
        borderColor:theme.dark.secondary
    },
    activeIndicator: {
        width: 24,
        height: 8,
        borderRadius: 5,
        backgroundColor: theme.dark.secondary,
    },
});
export default ImageViewer;
