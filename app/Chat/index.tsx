import {
  NativeBaseProvider,
  Box,
  Text,
  Button,
  Image,
  Input,
  ScrollView,
} from "native-base";
import { db } from "@/firebase/fireBase";
import Icon from "@expo/vector-icons/Ionicons";
import {Audio} from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext} from "react";
import { AuthContext } from "@/context/auth";
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, getDocs } from "firebase/firestore";

export default function Chat() {
  const navigation = useNavigation();
  const {SingOut, user} = useContext(AuthContext);

  const [sound, setSound] = useState();

  const [message, setMessage] = useState("")
  

  const [listMessage, setListMessage] =  useState<{ id: string; message: string }[]>([])
  console.log(listMessage)

  function HandleButton(routeName: string) {
    navigation.navigate(routeName);
  }

  /// buscando audio
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../../sounds/message-swoosh.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  /// colocando audio como dependencia
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  
  // buscando messagem
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chat"), orderBy("data", "asc")),
      (snapshot) => {
        let list: { id: string; message: string; timestamp: Date }[] = [];;
        snapshot.forEach((doc) => {
          list.push({
            id: doc.data().id,
            message: doc.data().message,
            timestamp: doc.data().data.toDate(),
          });
        });
        setListMessage(list.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
      },
      (error) => {
        console.error("Error listening to Firestore:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  // enviando mesagem
  async function SendMessage() {
    const send = collection(db, 'chat')
    if(message === ''){
      alert('Error deve te um texto no campo')
      return
    }
    try{
      await addDoc(send, {
        message: message,
        id: user.id,
        data: new Date(),
      })
      playSound()
      setMessage("")
    }catch{
      alert("Error ao envia message")
    }
  }


  return (
    <NativeBaseProvider>
      <Box flex={1} bgColor={"#fff"}>
        <Box
          w={"full"}
          h={"20"}
          justifyContent={"flex-start"}
          alignContent={"center"}
          flexDirection={"row"}
          padding={1}
        >
          <Button
          onPress={(() => HandleButton('Home'))}
          margin={4}
          padding={1}
          bg={"#ffffff"}
          >
            <Icon name="chevron-back-outline" size={30} />
          </Button>

          <Image
            source={{
              uri: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ5q_alP8jzpTv_T3zupEpRfFIbo2qQkttFuW3AzE00-8zljPbVNRU44S_SqBOitpM143Owjd6myNdrtCo",
            }}
            width={"60"}
            height={"60"}
            rounded={50}
            margin={1}
            alt="profile photo"
          />

          <Text
            margin={3}
            fontSize={"md"}
            isTruncated
            noOfLines={1}
            width={"90"}
          >
            bill gates
          </Text>
        </Box>

        <Box bgColor={"#ffffff"} h={'80%'} width={'full'} >
          <ScrollView h={80} position={'relative'}>

            {listMessage.map((u, i)=>(
            <>
              {user.id === u.id ?
                <Box
                key={i}
                w={'container'}
                bgColor={"#D0FECF"}
                borderTopRadius={'30'}
                borderBottomLeftRadius={'30'}
                margin={2}
                padding={4}
                marginLeft={8}
                >
                  <Text>
                    {u.message}
                  </Text>
                </Box>
              :
              <Box
                key={i}
                w={'container'}
                bgColor={"blue.100"}
                borderTopRightRadius={'30'}
                borderBottomRadius={'30'}
                margin={2}
                padding={4}
                >
                  <Text>
                    {u.message}
                  </Text>
                </Box>
            }
            </>
            ))}

          </ScrollView>
        </Box>

        

        <Box
          width={"full"}
          justifyContent={"space-between"}
          padding={2}
          alignItems={"center"}
          flexDirection={"row"}
          h={"70"}
          position={"absolute"}
          bottom={5}
        >
          <Input
            onChangeText={setMessage}
            value={message}
            placeholder="digite uma messagem aqui"
            variant="unstyled"
            rounded={30}
            width={"85%"}
            focusable={false}
            bgColor={"#F8FAF9"}
            shadow={1}
            h={"50"}
          />

          <Button
          rounded={50}
          w={"50"}
          h={"50"}
          bg={"#1DCC8E"}
          shadow={1}
          onPress={SendMessage}
          >
            <Icon name="send" size={25} color={"#fff"} />
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
