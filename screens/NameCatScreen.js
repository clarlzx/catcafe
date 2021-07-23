import React, { useState, useEffect } from "react";
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
  const { catType, id, userData, people } = route.params;
  const [name, setName] = useState("");
  const [haveName, setHaveName] = useState(false);

  useEffect(() => {
    if (name != "") {
      setHaveName(true);
    } else {
      setHaveName(false);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Meow.{"\n"}Name your cat!</Text>
        <View style={styles.catContainer}>
          <Cat
            catName={catType}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
          />
        </View>

        <Input placeholder="Name" onChangeText={(name) => setName(name)} />
        {haveName && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Lobby", {
                catType: catType,
                name: name,
                id: id,
                userData: userData,
                people: people,
              })
            }
          >
            <Text style={styles.buttontText}>Confirm</Text>
          </TouchableOpacity>
        )}
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
  catContainer: {
    height: 220,
    width: "100%",
    marginLeft: 6,
    marginBottom: 20,
  },
});
