import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import firebase from "../database/firebaseDB";
import Cat from "../components/Cat";
import { useBackHandler } from "@react-native-community/hooks";

export default function RoomScreen({ navigation, route }) {
  const { id, userData } = route.params;

  const [usersData, setUsersData] = useState([]);

  useBackHandler(() => {
    if (navigation.isFocused()) {
      Alert.alert("Invalid action", "Please exit using the exit button", [
        {
          text: "OK",
        },
      ]);
      return true;
    } else {
      return false;
    }
  });

  firebase
    .firestore()
    .collection("rooms")
    .doc("iu0TUc")
    .get()
    .then((doc) => {
      setUsersData(doc.data().userData);
    });

  //   const userData = [{catName: "Tim", catType: "calico", userName: "Anon"},
  // {catName: "MM", catType: "royal", userName: "Hey"},
  // {catName: "meimei", catType: "black", userName: "Hello"}];

  return (
    <View style={styles.container}>
      <Text style={{ padding: 40 }}>Hi I am a room where cats roam</Text>

      <FlatList
        data={usersData}
        renderItem={({ item }) => (
          <View>
            <Text style={{ textAlign: "center" }}>
              {item.username}'s cat {item.catName}
            </Text>
            <Cat
              catName={item.catType}
              style={{
                padding: 5,
                height: 250,
                width: 150,
                transform: [{ scale: 0.7 }],
              }}
            />
          </View>
        )}
        numColumns={2}
        styles={styles.list}
      />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Exit Confirmation")}
        >
          <Text style={styles.text}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Chat", { id: id, userData: userData })
          }
        >
          <Text style={styles.text}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => null}>
          <Text style={styles.text}>Feed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7BFAE",
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
    margin: 10,
    backgroundColor: "coral",
  },
  list: {
    paddingTop: 100,
  },
});
