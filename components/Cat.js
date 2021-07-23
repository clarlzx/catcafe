import React from "react";
import { Image, View } from "react-native";

export default function Cat({ catName, style }) {
  if (catName == "ginger") {
    return (
      <Image source={require("../assets/cats/ginger.png")} style={style} />
    );
  } else if (catName == "russianBlue") {
    return (
      <Image source={require("../assets/cats/russianBlue.png")} style={style} />
    );
  } else if (catName == "calico") {
    return (
      <Image source={require("../assets/cats/calico.png")} style={style} />
    );
  } else if (catName == "royal") {
    return <Image source={require("../assets/cats/royal.png")} style={style} />;
  } else if (catName == "train") {
    return <Image source={require("../assets/cats/train.png")} style={style} />;
  } else if (catName == "black") {
    return <Image source={require("../assets/cats/black.png")} style={style} />;
  } else {
    console.log("Cat name does not exist!");
    return <View></View>;
  }
}
