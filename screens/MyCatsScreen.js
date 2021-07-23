import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import firebase from '../database/firebaseDB';
import Cat from '../components/Cat';

export default function MyCatsScreen({ navigation }) {

  firebase.firestore().collection("users").doc("cXtbyzUpkWRE3IaxI2Eiwprim6v1").get().then((doc) => {
    myCats = doc.data().myCats;
  })

  return (
    <View style={styles.container}>
      <Text style={{paddingTop: 50}}>My cats</Text>
      <FlatList
        data={myCats}
        renderItem={({item}) => <Cat catName={item.key} style={{padding: 5, height: 100, width: 100}}/>}
        styles={styles.list}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.text}>Back</Text>
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
  },
  text: {
    fontSize: 32,
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
  }
});
