import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../database/firebaseDB";

export default function LobbyScreen({ navigation, route }) {
  const { catType, name, id, userData } = route.params;

  const db = firebase.firestore().collection("rooms");
  var roomRef = db.doc(id);
  useEffect(() => {
    roomRef.set(
      {
        userData: [
          { username: userData.userName, catType: catType, catName: name },
        ],
      },
      { merge: true }
    );
  }, []);

  // useEffect(() => {
  //   db.where("id", "==", id)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         doc.id
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <Text>Lobby</Text>
      <Text>Please wait for everyone to enter the room.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Room", { id: id })}
      >
        <Text style={styles.text}>Enter</Text>
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
