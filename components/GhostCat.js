import React from "react";
import { Image, View } from "react-native";

export default function GhostCat({ catName, style }) {
  if (catName == "ginger") {
    return (
      <Image source={require("../assets/cats/gingerGhost.png")} style={style} />
    );
  } else if (catName == "russianBlue") {
    return (
      <Image
        source={require("../assets/cats/russianBlueGhost.png")}
        style={style}
      />
    );
  } else if (catName == "calico") {
    return (
      <Image source={require("../assets/cats/calicoGhost.png")} style={style} />
    );
  } else if (catName == "royal") {
    return (
      <Image source={require("../assets/cats/royalGhost.png")} style={style} />
    );
  } else if (catName == "train") {
    return (
      <Image source={require("../assets/cats/trainGhost.png")} style={style} />
    );
  } else if (catName == "black") {
    return (
      <Image source={require("../assets/cats/blackGhost.png")} style={style} />
    );
  } else {
    console.log("Cat name does not exist!");
    return <View></View>;
  }
}
