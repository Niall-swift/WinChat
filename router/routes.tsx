import { View, ActivityIndicator } from "react-native";
import { useContext } from "react";

import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

function Routes() {
 const  isAuthenticated = true
 const loading = false

    if (loading) {

        return (

            <View style={{
                flex: 1,
                backgroundColor: '#f5f7fb',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >

                <ActivityIndicator size={60} color='#0d11f7' />

            </View>
        )
    }

    return (
        isAuthenticated ?  <AppRoutes />  : <AuthRoutes />
    )
}

export default Routes;