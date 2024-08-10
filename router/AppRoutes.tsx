import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/app/Home";

const Stack = createStackNavigator();
export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
