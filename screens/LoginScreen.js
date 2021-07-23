import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  BackHandler,
} from "react-native";
import { useBackHandler } from "@react-native-community/hooks";
import firebase from "../database/firebaseDB";

//TODO: Data validation

export default function LoginScreen({ navigation, route }) {
  const [userName, setUserName] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [userData, setUserData] = useState({});

  useBackHandler(() => {
    Alert.alert("", "Do you want to exit this app?", [
      { text: "Ok", onPress: () => BackHandler.exitApp() },
      { text: "Cancel" },
    ]);
    return true;
  });

  useEffect(() => {
    if (userName != "") {
      setCanLogin(true);
    } else {
      setCanLogin(false);
    }
  });

  function onLogin() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    if (user !== null) {
      const uid = user.uid;
      const userData = {
        userName: userName,
        loggedInBefore: true,
        uid: uid,
      };
      db.collection("users").doc(uid).set(userData, { merge: true });
      console.log(userData);
      setUserData(userData);

      navigation.navigate("Home", { userData: userData });
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/splash.png")}
        resizeMode="cover"
        style={styles.image}
        blurRadius={1.7}
      >
        <View style={styles.overlay}>
          <View style={styles.overlay2}>
            <Text style={styles.header}>Create An Account</Text>
            <View style={styles.textInputRow}>
              <Text style={styles.userNameText}>User name: </Text>
              <TextInput
                style={styles.userNameTextInput}
                onChangeText={setUserName}
                value={userName}
                placeholder="Your User Name"
                maxLength={20}
                placeholderTextColor={`rgba(255,255,255,0.7)`}
              ></TextInput>
            </View>

            {canLogin && (
              <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: `rgba(0,0,0,0.7)`,
  },
  overlay2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: `rgba(10,10,255,0.2)`,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 60,
    color: "white",
  },
  textInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 5,
    color: "white",
  },
  userNameTextInput: {
    borderRadius: 6,
    width: "45%",
    height: 45,
    paddingLeft: 10,
    fontSize: 18,
    backgroundColor: `rgba(255,255,255,0.3)`,
    color: "white",
  },
  loginButton: {
    marginTop: 60,
    backgroundColor: "darkorange",
    height: 55,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "white",
  },
  loginButtonText: {
    color: "black",
    fontSize: 20,
  },
});
