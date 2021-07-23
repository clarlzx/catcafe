import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ChooseCatScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Choose your cat!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Name Cat")}
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
