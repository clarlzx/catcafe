import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import firebase from "../database/firebaseDB";

export default function CodeScreen({ navigation, route }) {
  const { userData } = route.params;

  code = "";

  const Code = () => {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{
            height: 50,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 30,
            borderRadius: 3,
            fontSize: 18,
            textAlign: "center",
          }}
          placeholder="Group Code"
          maxLength={6}
          onChangeText={(text) => (code = text)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your code</Text>

      <Code></Code>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          firebase
            .firestore()
            .collection("rooms")
            .where("id", "==", code)
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  if (doc.data().userData.length >= doc.data().people) {
                    Alert.alert("Room full", "Please try another room.", [
                      { text: "OK" },
                    ]);
                  } else {
                    navigation.navigate("Choose Cat", {
                      id: code,
                      userData: userData,
                    });
                  }
                });
              } else {
                Alert.alert("Invalid Group Code", "Please try again.", [
                  { text: "OK" },
                ]);
              }
            });
        }}
      >
        <Text style={styles.text}>Confirm</Text>
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
  header: {
    fontSize: 20,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    margin: 30,
    backgroundColor: "coral",
    width: "50%",
  },
});
