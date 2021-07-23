import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { Icon } from "react-native-elements";
import { useBackHandler } from "@react-native-community/hooks";

export default function HomeScreen({ navigation, route }) {
  const { userData } = route.params;

  useBackHandler(() => {
    if (navigation.isFocused()) {
      Alert.alert("", "Do you want to exit this app?", [
        { text: "Ok", onPress: () => BackHandler.exitApp() },
        { text: "Cancel" },
      ]);
      return true;
    } else {
      return false;
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile", { userData: userData })}
      >
        <Icon
          type="ionicon"
          name="person-outline"
          size={40}
          color="#D7BFAE"
          raised
          reverse
        />
      </TouchableOpacity>

      <Text style={styles.header}>Welcome {userData.userName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Group Code", { userData: userData })
        }
      >
        <Text style={styles.text}>Join</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Create Room", { userData: userData })
        }
      >
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("My Cats", { userData: userData.userName })
        }
      >
        <Text style={styles.text}>My Cats</Text>
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
  button: {
    borderRadius: 20,
    padding: 20,
    margin: 30,
    backgroundColor: "#D7BFAE",
    width: "50%",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
  },
  profileButton: {},
  header: {
    fontSize: 20,
  },
});
