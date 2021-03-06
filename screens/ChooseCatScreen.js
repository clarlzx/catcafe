import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import Cat from "../components/Cat";

export default function ChooseCatScreen({ navigation, route }) {
  const { id, userData, people } = route.params;

  function ListItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.choiceBox}
        onPress={() =>
          navigation.navigate("Name Cat", {
            catType: item.name,
            id: id,
            userData: userData,
            people: people,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.name != "russianBlue" && (
            <Text style={styles.catName}>{item.name} cat</Text>
          )}
          {item.name == "russianBlue" && (
            <Text style={styles.catName}>Russian{"\n"}blue cat</Text>
          )}
          <View style={{ height: 150, width: 150 }}>
            <Cat
              catName={item.name}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose your cat!</Text>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Name Cat")}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const dummyData = [
  {
    id: "0",
    name: "ginger",
  },
  {
    id: "1",
    name: "russianBlue",
  },
  {
    id: "2",
    name: "calico",
  },
  {
    id: "3",
    name: "royal",
  },
  {
    id: "4",
    name: "train",
  },
  {
    id: "5",
    name: "black",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: Constants.statusBarHeight,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  catName: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
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
  choiceBox: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "lightgrey",
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 25,
    margin: 10,
    borderRadius: 10,
  },
});
