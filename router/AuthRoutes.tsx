import { createStackNavigator } from "@react-navigation/stack";
import Register from "@/app/Register";
import Signin from "@/app/Signin";

const Stack = createStackNavigator();
export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Signin}
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
