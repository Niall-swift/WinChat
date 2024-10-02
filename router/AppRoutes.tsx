import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../app/Chat";
import Register from "../app/Register";
import Home from "../app/Home";
import Signin from "@/app/Signin";

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
