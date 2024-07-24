import React, { useState, useEffect, useRef } from 'react';
import {
    View, Platform, KeyboardAvoidingView, TouchableOpacity,
    Dimensions, TextInput, StyleSheet, SafeAreaView, ActivityIndicator,
    Image,
    Text
} from 'react-native';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
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
import { launchImageLibrary } from 'react-native-image-picker';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET_URL } from '../../configs/apiUrl';
import { userBuddyAction } from '../../redux/userBuddyActionSlice';
import { setRoute } from '../../redux/appSlice';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function GeneralChat({ navigation }) {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const { userLoginInfo, role } = useSelector((state) => state.auth)
    const { currentRoute } = useSelector((state) => state.app)
    const user_id = userLoginInfo?.user?.id
    const { showAlert } = useAlert()
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const giftedChatRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);
    const refRBSheet = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const userId = parseInt(user_id);
    const blockTitle = role === "USER" ? "Block Buddy?" : "Block User?"

    const handleOpenModal = () => {
        setModalVisible(true);
        refRBSheet.current.close()
    };

    const handleDeleteModal = () => {
        setDeleteModal(true);
        refRBSheet.current.close()
    };

    const updateLastMessage = () => {
        if (socket) {
            socket.emit("updateLastMessage", { userId, contactId: currentRoute?.receiver_id });
        }
    };

    const handleBackPress = () => {
        updateLastMessage();
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.CHAT })
        return true;
    };
    useBackHandler(handleBackPress);


    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);
        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        if (newSocket && firstLoad) {

            newSocket.emit("getMessages", { userId, contactId: currentRoute?.receiver_id });

            newSocket.on("messages", (data) => {
                const reConstructedMessages = data?.messages?.map(message => {
                    return {
                        _id: Math.round(Math.random() * 1000000),
                        text: message?.message,
                        image: message?.image_url,
                        createdAt: new Date(message?.created_at),
                        user: {
                            _id: parseInt(message?.sender_id)
                        }
                    };
                }).reverse();

                handleMessage(reConstructedMessages)
                setFirstLoad(false)
                setLoadingMessages(false)
            });

            newSocket.emit("markMessagesAsRead", {
                userId: userId,
                contactId: currentRoute?.receiver_id,
            });

        }

        return () => {
            newSocket.disconnect();
            if (newSocket) {
                newSocket.off("messages");
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    useEffect(() => {

        if (socket) {
            socket.emit("registerUser", userId);
            socket.on("chat message", (receivedMessage) => {
                console.log('receivedMessage', receivedMessage)
                const transformedMessage = {
                    _id: Math.round(Math.random() * 1000000),
                    text: receivedMessage.message,
                    image: receivedMessage?.image_url,
                    createdAt: new Date(receivedMessage.timestamp),
                    user: {
                        _id: parseInt(receivedMessage.sender_id),
                    }
                };
                setMessages((previousMessages) => GiftedChat.append(previousMessages, transformedMessage));

                socket.emit("updateLastMessage", {
                    userId: receivedMessage.sender_id,
                    contactId: receivedMessage.receiver_id,
                });
            });
        }
        return () => {
            if (socket) {
                socket.off("chat message");
            }

        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])


    const handleImagePick = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 800,
            maxHeight: 800,
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const { uri } = response.assets[0];
                setImageUri(uri);
            }
        });
    };

    const renderInputToolbar = () => {

        if (currentRoute?.blockStatus) {
            return (
                <View style={{ padding: 10, alignItems: 'center', backgroundColor: 'red' }}>
                    <Text style={{ color: 'white' }}>You cannot send a message to this user.</Text>
                </View>
            );
        }
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
                        handleImagePick()
                    }}>
                        <ImageIcon name='camera' size={24} color={theme.dark.inputLabel} />
                    </TouchableOpacity>

                </View>

            </View>

        );
    };

    const renderBubble = (props) => {
        const messageUserId = props.currentMessage.user._id;
        const isCurrentUser = parseInt(messageUserId) === parseInt(user_id);

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
                        fontFamily: fonts.fontsType.medium,
                        fontSize: scaleHeight(15)
                    },
                    left: {
                        color: theme.dark.primary,
                        fontFamily: fonts.fontsType.medium,
                        fontSize: scaleHeight(15)
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

    const handleBlockCloseModal = () => {
        setModalVisible(false);
    };

    const handleDeleteCloseModal = () => {
        setDeleteModal(false);
    };


    const handleBlockUser = (userId) => {
        const userPayload = {
            user_id: userId,
            type: "BLOCK"
        }

        const buddyPayload = {
            buddy_id: userId,
            type: "BLOCK"
        }
        const finalPayload = role === "USER" ? buddyPayload : userPayload;
        dispatch(userBuddyAction(finalPayload)).then((result) => {
            if (result?.payload?.status === "success") {
                handleBlockCloseModal();
                showAlert("Success", "success", result?.payload?.message);
                setTimeout(() => {
                    handleBackPress();
                }, 3000);
            } else if (result?.payload?.status === "error") {
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const handleReportNavigation = () => {
        const updatedRoute = {
            ...currentRoute,
            buddy_name: currentRoute?.user_name,
            route: SCREENS.GENERAL_CHAT,
            ...(role === "USER" ? { buddy_id: currentRoute?.receiver_id } : { user_id: currentRoute?.receiver_id })
        };

        dispatch(setRoute(updatedRoute));
        resetNavigation(navigation, SCREENS.REPORT_BUDDY);
    };

    const handleUserProfileDetail = () => {
        const updatedRoute = {
            ...currentRoute,
            route: SCREENS.GENERAL_CHAT,
            chat_id: currentRoute?.receiver_id
        };

        dispatch(setRoute(updatedRoute));
        if (role === "USER") {
            resetNavigation(navigation, SCREENS.BUDDY_PROFILE_DETAIL);
        } else {
            resetNavigation(navigation, SCREENS.USER_PROFILE_DETAIL);
        }

    };

    const renderSheet = () => {
        return <RBSheet
            ref={refRBSheet}
            height={100}
            openDuration={3000}
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
                    handleReportNavigation();
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

    const onSend = (newMessages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
        setInputText('');
    };

    const handleSend = () => {
        if (inputText.trim().length > 0 || imageUri) {
            const newMessage = {
                sender_id: user_id,
                receiver_id: currentRoute?.receiver_id,
                message: inputText.trim(),
                image_url: imageUri
                //createdAt: new Date(),
            }
            socket.emit("chat message", newMessage);
            console.log("message has been sent", newMessage);
            // const transformedMessage = {
            //     _id: Math.round(Math.random() * 1000000),
            //     text: newMessage.message,
            //     image: newMessage?.image_url,
            //     createdAt: new Date(),
            //     user: {
            //         _id: parseInt(newMessage.sender_id),
            //     }
            // };
            // setMessages((previousMessages) => GiftedChat.append(previousMessages, transformedMessage));
            setInputText('');
            setImageUri(null);
        }
    };

    const handleMessage = (newMessage) => {
        setMessages([]);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
    };

    const renderLoader = () => {
        return <FullScreenLoader loading={loadingMessages} />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.dark.primary }}>
            <View style={{ marginHorizontal: 10 }}>

                <ChatHeader
                    userName={currentRoute?.user_name}
                    image_url={currentRoute?.image_url}
                    status={currentRoute?.status}
                    backPress={handleBackPress}
                    onPress={() => {
                        refRBSheet.current.open()
                    }}
                    profilePress={() => {
                        handleUserProfileDetail();
                    }}
                />

            </View>
            <HorizontalDivider />


            {
                loadingMessages ? renderLoader() : <>
                    <View style={{ flex: 1 }}>
                        <GiftedChat
                            ref={giftedChatRef}
                            messages={messages}
                            onSend={(newMessages) => onSend(newMessages)}
                            user={{
                                _id: parseInt(user_id),
                            }}
                            alignTop={false}
                            inverted={true}
                            renderAvatar={null}
                            renderBubble={renderBubble}
                            renderInputToolbar={renderInputToolbar}
                        />
                    </View>

                    {/* {currentRoute?.blockStatus && (
                        <View style={styles.blockStyle}>
                            <Text style={styles.blockText}>You cannot send a message to this user.</Text>
                        </View>
                    )} */}

                    {Platform.OS === 'android' && <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />}
                    {!currentRoute?.blockStatus && (<TouchableOpacity style={styles.sendButton} onPress={() => { handleSend() }}>
                        <Image
                            style={{
                                width: scaleWidth(55),
                                height: scaleHeight(55),
                                alignSelf: 'center'
                            }}
                            source={sendButton} />
                    </TouchableOpacity>)}
                </>
            }


            {renderSheet()}
            <CustomModal
                isVisible={modalVisible}
                onClose={handleBlockCloseModal}
                headerTitle={blockTitle}
                imageSource={blockUser}
                isParallelButton={true}
                text={`Are you sure you want to Block ${currentRoute?.user_name}?`}
                parallelButtonText1={"Cancel"}
                parallelButtonText2={"Yes, Block"}
                parallelButtonPress1={() => {
                    handleBlockCloseModal()
                }}
                parallelButtonPress2={() => {
                    handleBlockUser(currentRoute?.receiver_id);
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
        fontSize: scaleHeight(14),
        fontFamily: fonts.fontsType.regular,
        color: theme.dark.white,
        textAlignVertical: 'center',
        flex: 1

    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockStyle: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    blockText: {
        color: 'white',
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(13)
    }
});
