import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Customise your profile</Text>
      <Text>Set username</Text>
      <Text>Set user profile picture</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
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
