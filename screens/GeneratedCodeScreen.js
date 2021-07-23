import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../database/firebaseDB";

export default function GeneratedCodeScreen({ navigation, route }) {
  const { minHour, minMin, maxHour, maxMin, people, userData } = route.params;

  //Just for testing
  // {
  //   console.log(minHour);
  //   console.log(minMin);
  //   console.log(maxHour);
  //   console.log(maxMin);
  //   console.log(people);
  // }

  const db = firebase.firestore().collection("rooms");

  var result = "";
  function randomCode(length) {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  function generateValidCode() {
    randomCode(6);
    return result;
    // const [ids, setIds] = useState([]);

    // useEffect(() => {
    //   const unsubscribe = db.onSnapshot((collection) => {
    //     const data = collection.docs.map((doc) => {
    //       return {
    //         id: doc.data().id,
    //       };
    //     });
    //     setIds(data);
    //   });

    //   return () => {
    //     unsubscribe();
    //   };
    // }, []);

    //   var isUnique = true;
    //   for (var i = 0; i < ids.length; i++) {
    //     if (ids[i].id == result) {
    //       isUnique = false;
    //     }
    //   }

    //   if (isUnique) {
    //     return result;
    //   } else {
    //     randomCode(6);
    //   }
  }

  useEffect(() => {
    db.add({
      id: result,
      minHour: minHour,
      minMin: minMin,
      maxHour: maxHour,
      maxMin: maxMin,
      people: people,
      userData: { username: userData.userName },
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Group code</Text>
      <Text style={styles.text}>Share this code with your friends!</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{generateValidCode()}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Choose Cat")}
      >
        <Text style={styles.buttonText}>Choose your cat!</Text>
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
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 20,
    margin: 30,
    backgroundColor: "coral",
    width: "80%",
  },
  code: {
    fontSize: 60,
    fontWeight: "bold",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  codeContainer: {
    backgroundColor: "lightgrey",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  text: {
    fontSize: 18,
  },
});
