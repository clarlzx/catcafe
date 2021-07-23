import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

export default function ProfilePage({ navigation, route }) {
  const { userData } = route.params;
  const [userName, setUserName] = useState(userData.userName);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Customise your profile</Text>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNameHeaderText}>Username</Text>
        <TextInput
          style={styles.userNameTextInput}
          value={userName}
          onChangeText={setUserName}
          placeholder={userName}
          maxLength={20}
          placeholderTextColor={`rgba(255,255,255,0.7)`}
          editable={isEdit}
        ></TextInput>
        {!isEdit && (
          <TouchableOpacity
            style={styles.userNameButton}
            onPress={() => setIsEdit(!isEdit)}
          >
            <Entypo name="pencil" size={24} color="black" />
          </TouchableOpacity>
        )}
        {isEdit && (
          <TouchableOpacity
            style={styles.userNameButton}
            onPress={() => {
              if (userName === "") {
                console.log("here");
                setUserName(userData.userName);
              } else if (userName != userData.userName) {
                const db = firebase.firestore();
                db.collection("users").doc(userData.uid).set(
                  {
                    userName: userName,
                  },
                  { merge: true }
                );
                userData.userName = userName;
              }
              setIsEdit(!isEdit);
            }}
          >
            <MaterialIcons name="done" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home", { userData: userData })}
      >
        <Text style={styles.text}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    marginTop: 40,
    backgroundColor: "coral",
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameTextInput: {
    borderRadius: 6,
    width: "45%",
    height: 45,
    paddingLeft: 10,
    fontSize: 18,
    borderWidth: 1,
  },
  userNameHeaderText: {
    textAlignVertical: "center",
    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  userNameButton: {
    backgroundColor: "lightblue",
    height: 45,
    padding: 10,
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 5,
  },
});
