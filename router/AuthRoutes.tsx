import { createStackNavigator } from "@react-navigation/stack";
import Signin from "@/app/SignIn";

const Stack = createStackNavigator();
export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
