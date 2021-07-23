import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import firebase from '../database/firebaseDB';

export default function CodeScreen({ navigation }) {

  code = "";

  const Code = () => {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, borderWidth: 2, padding: 5}}
          placeholder="Group Code"
          onChangeText={text => code = text}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Group Code</Text>

      <Code></Code>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          firebase.firestore().collection("rooms").where("id", "==", code).get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
              navigation.navigate("Choose Cat");
            } else {
              Alert.alert("Invalid Group Code", "Please try again.",[
                { text: "OK" }
              ]);
            }
          }
        )
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
