import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  GiftedChat,
  MessageText,
  Day,
  Time,
  InputToolbar,
  Bubble,
  Avatar,
} from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

export default function ChatScreen({ navigation }) {
  const roomId = "65JZMp"; //change this
  const uid = "xZqcdjuy6qTfsYU07JxZwIua1YV2"; //change this
  const userName = "clarlzx"; //change this

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesListener = firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  const onSend = useCallback((messages = []) => {
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: uid,
          name: userName,
        },
      });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderMessageText = ({ currentMessage, ...args }) => {
    return (
      <MessageText
        currentMessage={currentMessage}
        customTextStyle={{ fontSize: 16, lineHeight: 20 }}
        {...args}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            fontSize: 12,
            color: `rgba(255,255,255,0.8)`,
          },
          left: {
            fontSize: 12,
            color: "grey",
          },
        }}
      />
    );
  };

  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          fontSize: 16,
          color: "grey",
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          height: 50,
          borderBottomWidth: 1,
          borderColor: "silver",
        }}
        customTextStyle={{
          fontSize: 10,
        }}
      />
    );
  };

  const renderBubble = (props) => {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            // Here is the color change
            backgroundColor: "white",
          },
        }}
        textStyle={{
          right: {},
        }}
      />
    );
  };

  const renderAvatar = (props) => {
    return (
      // Step 3: return the component
      <Avatar
        {...props}
        imageStyle={{
          left: {
            // Here is the color change
            height: 30,
            width: 30,
          },
          right: {
            height: 30,
            width: 30,
          },
        }}
      />
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  };

  function scrollToBottomComponent() {
    return (
      <TouchableOpacity style={styles.scrollToBottomComponent}>
        <Feather name="chevrons-down" size={24} color="white" />
      </TouchableOpacity>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      renderMessageText={renderMessageText}
      renderTime={renderTime}
      renderDay={renderDay}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
      alwaysShowSend={true}
      renderInputToolbar={renderInputToolbar}
      onSend={(messages) => onSend(messages)}
      scrollToBottomComponent={scrollToBottomComponent}
      scrollToBottomStyle={{
        backgroundColor: `rgba(0,0,0,0.5)`,
      }}
      showUserAvatar={true}
      scrollToBottom={true}
      renderUsernameOnMessage={true}
      renderLoading={renderLoading}
      user={{
        _id: uid,
        name: userName,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 8,
    marginRight: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
