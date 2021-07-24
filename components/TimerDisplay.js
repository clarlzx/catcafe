import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerDisplay({
  backgroundColor,
  initialHour,
  initialMin,
}) {
  const [hour, setHour] = useState(initialHour);
  const realInitialMin = initialMin == 0 ? 60 : initialMin;
  const [min, setMin] = useState(realInitialMin);

  useEffect(() => {
    if (min == 60 && hour != 0) {
      setTimeout(() => setHour(hour - 1), 60000);
    }

    if (hour == 0) {
      setHour(0);
    }

    if (min == 1 && hour == 0) {
      setTimeout(() => setMin(0), 60000);
    }

    if (min == 1 && hour > 0) {
      setTimeout(() => setMin(60), 60000);
    }

    if (min > 1) {
      setTimeout(() => setMin(min - 1), 60000);
    }
  });

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      backgroundColor: backgroundColor,
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    text: {
      fontSize: 25,
      color: "white",
    },
  });

  return (
    <View style={styles.row}>
      <Text style={styles.text}>{hour}</Text>
      <Text style={styles.text}>:</Text>
      {min % 60 < 10 && <Text style={styles.text}>0{min % 60}</Text>}
      {min % 60 > 9 && <Text style={styles.text}>{min % 60}</Text>}
    </View>
  );
}
