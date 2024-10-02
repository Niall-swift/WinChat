import { NativeBaseProvider, Box , Text, Button, VStack, HStack, Image, Input} from "native-base";
import { useContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from "@/context/auth";
import { useNavigation } from "@react-navigation/native";


export default function Register () {
  const {Register} = useContext(AuthContext)
  const Navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [imagePhat, setImagePhat] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasseord] = useState('');
  
  /// selecionando um imagem para perfil 
  const handlePickerImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert('pemisão necesarria')
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 1,
      });

      if (canceled) {

        alert('Operação cancelada')

      } else {

        setImage(assets[0].uri)
        const fileName = assets[0].uri.substring(assets[0].uri.lastIndexOf('/') + 1, assets[0].uri.length)
        const extend = fileName.split('.')[1];
        const formData = new FormData();

        formData.append(
          'file',
          JSON.parse(
            JSON.stringify({
              name: fileName,
              uri: assets[0].uri,
              type: extend,
            })
          )
        )
        setImagePhat(assets[0].uri)

      }

    }

  };

  const backInRegister = () => {
    Navigation.navigate("Signin")
  }



  return (
    <NativeBaseProvider>
    <Box bg={'#FFF'} w={'full'} h={'full'} justifyContent={'space-evenly'} alignItems={'center'} padding={10}>

    <Box justifyContent={'center'} alignItems={'center'} w={'210'} h={'210'} rounded={'full'} borderWidth={2} borderColor={"#1DCC8E"}>

        <Button onPress={handlePickerImage} bg={'#1dcc8f1a'} w={'200'} h={'200'} rounded={'full'}  position={'absolute'} zIndex={9}>
          <Icon name="image-outline" size={100} color={'#b6b5b56d'}/>
        </Button>

        {image && (
          <HStack space={2}>
            <Image source={{ uri: image }} alt="Selected" w={'200'} h={'200'} rounded={'full'}/>
          </HStack>
        )}
      </Box>
      
      <Box w={'full'} justifyContent={'space-between'} h={150}>

      <Input
      placeholder="Nome"
      variant={'rounded'}
      bgColor={'#DBFBD2'}
      borderWidth={0}
      onChangeText={setName}
      />

      <Input
      placeholder="email"
      variant={'rounded'}
      bgColor={'#DBFBD2'}
      borderWidth={0}
      onChangeText={setEmail}
      />

      <Input
      placeholder="Password"
      variant={'rounded'}
      bgColor={'#DBFBD2'}
      borderWidth={0}
      onChangeText={setPasseord}
      />
      </Box>

      <Button
      onPress={(()=> Register(name,email,password))}
      rounded={'full'}
      w={200}
      fontWeight={'bold'}
      bgColor={'#1AAD5F'}
      >
      Registre-se
      </Button>

      <Button
      onPress={backInRegister}
      >
        faça login
      </Button>
    </Box>
    </NativeBaseProvider>
  )
}