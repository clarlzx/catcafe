import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import { Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

export default function CreateRoomScreen({ navigation }) {
  function renderSelector() {
    const [people, setPeople] = useState(0);

    function increment() {
      if (people >= 20) {
        return null;
      } else {
        setPeople(people + 1);
      }
    }

    function decrement() {
      if (people <= 0) {
        return null;
      } else {
        setPeople(people - 1);
      }
    }

    return (
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Entypo name="minus" size={18} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{people}</Text>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Entypo name="plus" size={18} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Create your room</Text>
        <Text style={styles.text}>Set minimum study time</Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Input
            keyboardType="numeric"
            label="Hours"
            containerStyle={{ justifyContent: "flex-start", flex: 1 }}
          />
          <Input
            keyboardType="numeric"
            label="Minutes"
            containerStyle={{ justifyContent: "flex-end", flex: 1 }}
          />
        </View>
        <Text style={styles.text}>Set maximum study time</Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Input
            keyboardType="numeric"
            label="Hours"
            containerStyle={{ justifyContent: "flex-start", flex: 1 }}
          />
          <Input
            keyboardType="numeric"
            label="Minutes"
            containerStyle={{ justifyContent: "flex-end", flex: 1 }}
          />
        </View>
        <Text style={styles.text}>Set number of people</Text>
        {renderSelector()}
        <TouchableOpacity
          style={styles.confirmationButton}
          onPress={() => navigation.navigate("Choose Cat")}
        >
          <Text style={styles.buttonText}>Create room!</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Constants.statusBarHeight,
    padding: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: "coral",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  confirmationButton: {
    backgroundColor: "coral",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
});
