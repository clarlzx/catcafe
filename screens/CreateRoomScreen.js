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

export default function CreateRoomScreen({ navigation, route }) {
  const { userData } = route.params;

  function RenderSelector({ people, setPeople }) {
    function increment() {
      if (people >= 9) {
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

  const [minHour, setMinHour] = useState(0);
  const [minMin, setMinMin] = useState(0);
  const [maxHour, setMaxHour] = useState(0);
  const [maxMin, setMaxMin] = useState(0);
  const [people, setPeople] = useState(0);
  const [isBlank, setBoolean] = useState(false);

  function buttonPressed() {
    if (minHour == "" || minMin == "" || (maxHour == "") | (maxMin == "")) {
      setBoolean(true);
    } else {
      setBoolean(false);
      return navigation.navigate("Generated Code", {
        minHour: minHour,
        minMin: minMin,
        maxHour: maxHour,
        maxMin: maxMin,
        people: people,
        userData: userData,
      });
    }
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
            onChangeText={(text) => {
              setMinHour(text);
            }}
            maxLength={2}
          />
          <Input
            keyboardType="numeric"
            label="Minutes"
            containerStyle={{ justifyContent: "flex-end", flex: 1 }}
            onChangeText={(text) => {
              setMinMin(text);
            }}
            maxLength={2}
          />
        </View>
        <Text style={styles.text}>Set maximum study time</Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Input
            keyboardType="numeric"
            label="Hours"
            containerStyle={{ justifyContent: "flex-start", flex: 1 }}
            onChangeText={(text) => {
              setMaxHour(text);
            }}
            maxLength={2}
          />
          <Input
            keyboardType="numeric"
            label="Minutes"
            containerStyle={{ justifyContent: "flex-end", flex: 1 }}
            onChangeText={(text) => {
              setMaxMin(text);
            }}
            maxLength={2}
          />
        </View>
        <Text style={styles.text}>Set number of people (Including you!)</Text>
        <RenderSelector people={people} setPeople={setPeople} />
        <TouchableOpacity
          style={styles.confirmationButton}
          onPress={buttonPressed}
        >
          <Text style={styles.buttonText}>Create room!</Text>
        </TouchableOpacity>
        {isBlank ? (
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "red",
            }}
          >
            Ensure no fields are blank!
          </Text>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: Constants.statusBarHeight,
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
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    backgroundColor: "coral",
    width: "80%",
    alignSelf: "center",
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
