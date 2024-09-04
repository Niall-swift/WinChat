import { View, ActivityIndicator } from "react-native";

import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

function Routes() {
  const { isAuthenticated} = useContext(AuthContext)
  console.log(isAuthenticated)
  const loading = false;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f7fb",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color="#f70d0d" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
