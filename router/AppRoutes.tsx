import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/app/Home";
import Register from "@/app/Register";

const Stack = createStackNavigator();
export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
