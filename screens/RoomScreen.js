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
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

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
    .doc(id)
    .get()
    .then((doc) => {
      setUsersData(doc.data().userData);
    });

  //   const userData = [{catName: "Tim", catType: "calico", userName: "Anon"},
  // {catName: "MM", catType: "royal", userName: "Hey"},
  // {catName: "meimei", catType: "black", userName: "Hello"}];

  const [isFeeding, setFeeding] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{ paddingTop: 40, paddingBottom: 30 }}>
        Hi I am a room where cats roam
      </Text>

      <FlatList
        data={usersData}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              {item.username}'s cat {item.catName}
            </Text>

            <View style={styles.catContainer}>
              {isFeeding ? (
                <Animatable.Text
                  animation="pulse"
                  easing="ease-out"
                  iterationCount={3}
                  direction="alternate"
                  onAnimationEnd={() => setFeeding(false)}
                >
                  <AntDesign name="heart" size={20} color="red" />
                </Animatable.Text>
              ) : null}
              <Cat
                catName={item.catType}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
              />
            </View>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFeeding(true)}
        >
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
  catContainer: {
    height: 180,
    width: Dimensions.get("screen").width * 0.4,
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
