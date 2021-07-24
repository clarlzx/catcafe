import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function MinimumSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Congratulations!{"\n"}You have gained 1 new cat.{"\n"}However there is a
        chance to upgrade your cat to a SUPER CAT, are you sure you want to
        leave now?
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("My Cats")}
      >
        <Text style={styles.buttonText}>Give up and add lame cat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>I want a super cat!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7BFAE",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    margin: 20,
    backgroundColor: "coral",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  list: {
    paddingTop: 40,
  },
});
