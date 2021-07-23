import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import firebase from "../database/firebaseDB";
import Constants from "expo-constants";
import Cat from "../components/Cat";

export default function LobbyScreen({ navigation, route }) {
  const { catType, name, id, userData, people } = route.params;

  const db = firebase.firestore().collection("rooms");
  var roomRef = db.doc(id);
  useEffect(() => {
    roomRef.get().then((doc) => {
      const retrievedUserData = doc.data().userData;
      if (retrievedUserData == undefined) {
        roomRef.set(
          {
            userData: [
              { username: userData.userName, catType: catType, catName: name },
            ],
          },
          { merge: true }
        );
      } else {
        roomRef.set(
          {
            userData: [
              { username: userData.userName, catType: catType, catName: name },
              ...retrievedUserData,
            ],
          },
          { merge: true }
        );
      }
    });
  }, []);

  function enterWhenFull() {
    // if (data.length == people) {
    //   return (
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => navigation.navigate("Room", { id: id })}
    //     >
    //       <Text style={styles.buttonText}>Enter</Text>
    //     </TouchableOpacity>
    //   );
    // } else {
    return (
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    );
    // }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    const dataListener = firebase
      .firestore()
      .collection("rooms")
      .doc(id)
      .onSnapshot((doc) => {
        const firebaseData = doc.data().userData;
        setData(firebaseData);
        return firebaseData;
      });

    return () => dataListener();
  }, []);

  function ListItem({ item }) {
    return (
      <View style={styles.choiceBox}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.catName}>{item.catName}</Text>
          <Cat
            catName={item.catType}
            style={{
              aspectRatio: 1,
              height: 50,
              flex: 2,
              // backgroundColor: "lightpink",
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lobby</Text>
      <Text style={styles.text}>
        Please wait for everyone to enter the room.
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        {/* {data.length}/{people} */}
      </Text>
      {enterWhenFull()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Room", { id: id })}
      >
        <Text style={styles.buttonText}>Enter anyway</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: Constants.statusBarHeight + 40,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    backgroundColor: "coral",
    width: "50%",
    alignSelf: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  choiceBox: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "lightgrey",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  catName: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
