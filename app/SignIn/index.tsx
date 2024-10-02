import { AuthContext } from "@/context/auth";
import { NativeBaseProvider, Box, Text, Input, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";

export default function Signin() {
  const navigation = useNavigation();
  const {Signin} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const backInSignin = () => {
    navigation.navigate("Register");
  };

  return (
    <NativeBaseProvider>
      <Box bg={'#FFF'} w={'full'} h={'full'} justifyContent={'center'} alignItems={'center'} padding={10}>

        <Input
          placeholder="email"
          variant={"rounded"}
          bgColor={"#DBFBD2"}
          borderWidth={0}
          mb={'10'}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          variant={"rounded"}
          bgColor={"#DBFBD2"}
          borderWidth={0}
          mb={'10'}
          onChangeText={setPassword}
        />

        <Button
          onPress={(()=> Signin(email,password))}
          rounded={"full"}
          w={200}
          fontWeight={"bold"}
          bgColor={"#1AAD5F"}
          mb={'10'}
        >
          Acessa
        </Button>

        <Button
        onPress={backInSignin}
        bgColor={'#FFF'}
        >
          <Text>não tem uma conta cadastre-se !</Text>
        </Button>
      </Box>
    </NativeBaseProvider>
  );
}
