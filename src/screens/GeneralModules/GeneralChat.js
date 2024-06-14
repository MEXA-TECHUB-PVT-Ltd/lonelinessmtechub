import React, { useState, useEffect, useRef } from 'react';
import {
    View, Platform, KeyboardAvoidingView, TouchableOpacity,
    Dimensions, TextInput, StyleSheet, SafeAreaView, ActivityIndicator,
    Image,
    Text
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageIcon from 'react-native-vector-icons/Entypo';
import { SCREENS } from '../../constant/constants';
import { theme } from '../../assets';
import fonts from '../../styles/fonts';
import ChatHeader from '../../components/ChatHeader';
import { blockUser, deleteUser, sendButton } from '../../assets/images';
import { scaleHeight, scaleWidth } from '../../styles/responsive';
import HorizontalDivider from '../../components/HorizontalDivider';
import { resetNavigation } from '../../utils/resetNavigation';
import useBackHandler from '../../utils/useBackHandler';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomModal from '../../components/CustomModal';
import { useAlert } from '../../providers/AlertContext';

export default function GeneralChat({ navigation }) {
    const { showAlert } = useAlert()
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const giftedChatRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);
    const refRBSheet = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const handleOpenModal = () => {
        setModalVisible(true);
        refRBSheet.current.close()
    };

    const handleDeleteModal = () => {
        setDeleteModal(true);
        refRBSheet.current.close()
    };

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello! How are you?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'John Doe',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'I am good, thank you! How about you?',
                createdAt: new Date(),
                user: {
                    _id: 123,
                    name: 'You',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 3,
                text: 'I am doing great!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'John Doe',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.CHAT })
        return true;
    };
    useBackHandler(handleBackPress);

    const renderInputToolbar = () => {
        return (

            <View style={styles.inputContainer}>

                {imageUri && (
                    <View style={{ width: 120, height: 120, borderRadius: 16, overflow: 'hidden', marginTop: 10 }}>
                        <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="cover" />
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 2, right: 3, elevation: 4, shadowOpacity: 0.5 }}
                            onPress={() => setImageUri(null)}
                        >
                            <Icon name="times-circle" size={24} color={theme.dark.transparentBg} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.inputIconContainer}>

                    <TextInput
                        style={styles.textInput}
                        value={inputText}
                        placeholderTextColor={theme.dark.inputLabel}
                        onChangeText={setInputText}
                        placeholder={"Write your message"}
                        multiline
                    />

                    <TouchableOpacity style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: -20
                        //marginEnd: 20
                    }} onPress={() => {

                    }}>
                        <ImageIcon name='camera' size={24} color={theme.dark.inputLabel} />
                    </TouchableOpacity>

                </View>

            </View>

        );
    };

    const renderBubble = (props) => {
        const messageUserId = props.currentMessage.user._id;
        const isCurrentUser = parseInt(messageUserId) === parseInt(123);

        return (
            <Bubble
                {...props}
                isCurrentUser={isCurrentUser}
                wrapperStyle={{
                    right: {
                        backgroundColor: theme.dark.secondary,
                        ...styles.bubbleContainer,
                        borderTopRightRadius: 0
                    },
                    left: {
                        backgroundColor: '#FFFFFF',
                        ...styles.bubbleContainer,
                        borderTopLeftRadius: 0,

                    },
                }}

                textStyle={{
                    right: {
                        color: theme.dark.primary,
                        fontFamily: fonts.fontsType.regular,
                        fontSize: 14
                    },
                    left: {
                        color: theme.dark.primary,
                        fontFamily: fonts.fontsType.regular,
                        fontSize: 14
                    },
                }}

                timeTextStyle={{
                    right: {
                        color: theme.dark.inputLabel,
                    },
                    left: {
                        color: theme.dark.inputLabel,
                    },
                }}
            />
        );
    };

    const scrollToBottom = () => {
        giftedChatRef.current.scrollToBottom();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleDeleteCloseModal = () => {
        setDeleteModal(false);
    };

    const handleButtonClick = (description) => {
        handleCloseModal();
        setTimeout(() => {
            showAlert("Success", 'success', description)
        }, 1000);

    }


    const renderSheet = () => {
        return <RBSheet
            ref={refRBSheet}
            height={100}
            openDuration={250}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(128, 128, 128, 0.80)',
                },
                container: {
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: theme.dark.background,
                    marginBottom: 20,
                    width: '90%',
                    alignSelf: 'center',
                    height: scaleHeight(150)
                }
            }}
        >

            <TouchableOpacity
                onPress={() => {

                    handleDeleteModal()
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{
                    fontFamily: fonts.fontsType.regular,
                    fontSize: scaleHeight(16),
                    color: theme.dark.white
                }}>Delete Chat</Text>
            </TouchableOpacity>
            <HorizontalDivider />
            <TouchableOpacity
                onPress={() => {
                    resetNavigation(navigation, SCREENS.REPORT_BUDDY)
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{
                    fontFamily: fonts.fontsType.regular,
                    fontSize: scaleHeight(16),
                    color: theme.dark.white
                }}>Report User</Text>
            </TouchableOpacity>

            <HorizontalDivider />
            <TouchableOpacity
                onPress={() => {
                    handleOpenModal()
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{
                    fontFamily: fonts.fontsType.regular,
                    fontSize: scaleHeight(16),
                    color: theme.dark.white
                }}>Block User</Text>
            </TouchableOpacity>
        </RBSheet>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.dark.primary }}>
            <View style={{ marginHorizontal: 10 }}>

                <ChatHeader
                    name={`Uzair Ahmed`}
                    profilePic={"https://i.pravatar.cc/300"}
                    online={true}
                    backPress={handleBackPress}
                    onPress={() => {
                        refRBSheet.current.open()
                    }}
                    profilePress={() => {
                        resetNavigation(navigation, SCREENS.SERVICE_DETAILS)
                    }}
                />

            </View>
            <HorizontalDivider />
            <View style={{ flex: 1 }}>
                <GiftedChat
                    ref={giftedChatRef}
                    messages={messages}
                    onSend={(newMessages) => setMessages(GiftedChat.append(messages, newMessages))}
                    user={{
                        _id: parseInt(123),
                    }}
                    alignTop={false}
                    inverted={true}
                    renderAvatar={null}
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar}
                />
            </View>

            {Platform.OS === 'android' && <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />}
            <TouchableOpacity style={styles.sendButton} onPress={() => {

            }}>
                <Image
                    style={{
                        width: scaleWidth(55),
                        height: scaleHeight(55),
                        alignSelf: 'center'
                    }}
                    source={sendButton} />
            </TouchableOpacity>
            {renderSheet()}
            <CustomModal
                isVisible={modalVisible}
                onClose={handleCloseModal}
                headerTitle={"Block User?"}
                imageSource={blockUser}
                isParallelButton={true}
                text={`Are you sure you want to Block Alex Linderson?`}
                parallelButtonText1={"Cancel"}
                parallelButtonText2={"Yes, Block"}
                parallelButtonPress1={() => {
                    handleCloseModal()
                }}
                parallelButtonPress2={() => {
                    handleButtonClick("Buddy Blocked Successfully.")
                }}
            />

            <CustomModal
                isVisible={deleteModal}
                onClose={handleDeleteCloseModal}
                headerTitle={"Delete Chat?"}
                imageSource={deleteUser}
                isParallelButton={true}
                text={`Are you sure you want to delete this chat?`}
                parallelButtonText1={"Cancel"}
                parallelButtonText2={"Yes, Delete"}
                parallelButtonPress1={() => {
                    handleDeleteCloseModal()
                }}
                parallelButtonPress2={() => {
                    handleButtonClick("Buddy Deleted Successfully.")
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bubbleContainer: {
        borderRadius: 16,
        marginBottom: 30,
        marginRight: 8,
        marginLeft: 8,
    },
    sendButton: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 22 : 2,
        right: 10,
        marginEnd: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    },
    inputContainer: {
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        marginStart: 20,
        backgroundColor: theme.dark.transparentBg,
        bottom: Platform.OS === 'ios' ? -10 : 10,
        width: '75%',
        position: 'absolute',
        borderWidth: 1,
        borderColor: theme.dark.white,
        height: scaleHeight(45),
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputIconContainer: {
        flexDirection: 'row',
        //width: '100%',
    },
    textInput: {
        fontSize: 14,
        fontFamily: fonts.fontsType.regular,
        color: theme.dark.inputLabel,
        textAlignVertical: 'center',
        flex: 1

    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
