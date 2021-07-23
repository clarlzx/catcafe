import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import firebase from "../database/firebaseDB";

export default function LoadingScreen({ navigation }) {
  const [userExists, setUserExists] = useState();
  const [userData, setUserData] = useState({});

  const db = firebase.firestore();

  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  useEffect(() => {
    const asyncFunction = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          db.collection("users")
            .doc(uid)
            .get()
            .then((doc) => {
              if (!doc.exists) {
                console.log("Does not exist");
                db.collection("users").doc(uid).set({
                  loggedInBefore: false,
                });
                //return login screen
                setUserExists(false);
              } else {
                console.log("User exists");
                if (doc.data()["loggedInBefore"]) {
                  setUserExists(true);
                  setUserData(doc.data());
                } else {
                  setUserExists(false);
                }
              }
            });
          // ...
        } else {
          // User is signed out
          // ...
          setUserExists(false);
        }
      });
    };
    asyncFunction();
  }, []);

  useEffect(() => {
    if (
      (userExists != undefined) &
      userExists &
      (JSON.stringify(userData) != "{}")
    ) {
      navigation.navigate("Home", { userData: userData });
    } else if ((userExists != undefined) & !userExists) {
      navigation.navigate("Login");
    }
  });

  return (
    <View style={styles.loadingScreenContainer}>
      <ImageBackground
        source={require("../assets/splash.png")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingScreenContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  addChatButton: {
    backgroundColor: "lightgreen",
    borderRadius: 6,
    marginRight: 10,
    padding: 10,
    flexDirection: "row",
  },
  addChatText: {
    fontSize: 16,
    marginLeft: 3,
  },
});
