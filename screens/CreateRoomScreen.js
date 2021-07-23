import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CreateRoomScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Create your room</Text>
      <Text>Set minimum study time</Text>
      <Text>Set maximum study time</Text>
      <Text>Set number of people</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Choose Cat")}
      >
        <Text style={styles.text}>Create room!</Text>
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
    margin: 20,
    backgroundColor: "coral",
  },
});
