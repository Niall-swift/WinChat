import { Stack } from 'expo-router';
import 'react-native-reanimated';
import Routes from '@/router/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function RootLayout() {

  return (
      <NavigationContainer independent={true}>
        <Routes/>
      </NavigationContainer>
  );
}
