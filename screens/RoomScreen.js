import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RoomScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am a room where cats roam</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Exit Confirmation")}
        >
          <Text style={styles.text}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chat")}
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
    margin: 10,
    backgroundColor: "coral",
  },
});
