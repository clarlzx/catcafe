import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Input } from "react-native-elements";
import Constants from "expo-constants";
import Cat from "../components/Cat";

export default function NameCatScreen({ navigation, route }) {
  const { catType, id, userData } = route.params;
  const [name, setName] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Meow.{"\n"}Name your cat!</Text>
        <Cat
          catName={catType}
          style={{
            aspectRatio: 1,
            height: 200,
            alignSelf: "center",
          }}
        />
        <Input placeholder="Name" onChangeText={(name) => setName(name)} />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Lobby", {
              catType: catType,
              name: name,
              id: id,
              userData: userData,
            })
          }
        >
          <Text style={styles.buttontText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    padding: 20,
    paddingTop: Constants.statusBarHeight + 40,
  },
  buttontText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    margin: 30,
    backgroundColor: "coral",
    width: "50%",
    alignSelf: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
});
