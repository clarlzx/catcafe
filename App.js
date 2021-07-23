import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import CodeScreen from "./screens/CodeScreen";
import RoomScreen from "./screens/RoomScreen";
import LobbyScreen from "./screens/LobbyScreen";
import ChooseCatScreen from "./screens/ChooseCatScreen";
import ChatScreen from "./screens/ChatScreen";
import ExitConfirmationScreen from "./screens/ExitConfirmationScreen";
import NameCatScreen from "./screens/NameCatScreen";
import DeadCatScreen from "./screens/DeadCatScreen";
import CreateRoomScreen from "./screens/CreateRoomScreen";
import MyCatsScreen from "./screens/MyCatsScreen";
import ProfilePage from "./screens/ProfilePage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Group Code"
          component={CodeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Lobby"
          component={LobbyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Choose Cat"
          component={ChooseCatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Name Cat"
          component={NameCatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Exit Confirmation"
          component={ExitConfirmationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dead Cat"
          component={DeadCatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Create Room"
          component={CreateRoomScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="My Cats"
          component={MyCatsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
