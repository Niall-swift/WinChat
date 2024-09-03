import {
  NativeBaseProvider,
  Box,
  Text,
  Button,
  Image,
  Input,
  ScrollView,
} from "native-base";
import Icon from "@expo/vector-icons/Ionicons";
import {Audio} from "expo-av";
import { useState, useEffect} from "react";

export default function Home() {
  const [sound, setSound] = useState();


  /// buscando audio
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../../sounds/message-swoosh.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
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
          <Button margin={4} padding={1} bg={"#fff"}>
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

        <Box bgColor={"#fff"} h={'82%'}  justifyContent={'center'} width={'full'}>
          <ScrollView h={80}>

            <Box
            width={"90%"}
            bgColor={"blue.100"}
            borderBottomRadius={'30'}
            borderTopRightRadius={'30'}
            margin={2}
            padding={4}
            >
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                recusandae optio dolore. Vero quis eius amet, provident tempore
                ad doloribus cumque harum, accusantium consequatur laboriosam
                praesentium in magni consectetur inventore.
              </Text>
            </Box>

            <Box
            width={"90%"}
            bgColor={"#D0FECF"}
            borderTopRadius={'30'}
            borderBottomLeftRadius={'30'}
            margin={2}
            padding={4}
            marginLeft={8}
            >
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              </Text>
            </Box>

            <Box
            width={"90%"}
            bgColor={"blue.100"}
            borderBottomRadius={'30'}
            borderTopRightRadius={'30'}
            margin={2}
            padding={4}
            >
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                recusandae optio dolore. Vero quis eius amet, provident tempore
                ad doloribus cumque harum, accusantium consequatur laboriosam
                praesentium in magni consectetur inventore.
              </Text>
            </Box>

            <Box
            width={"90%"}
            bgColor={"#D0FECF"}
            borderTopRadius={'30'}
            borderBottomLeftRadius={'30'}
            margin={2}
            marginLeft={8}
            padding={4}
            >
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              </Text>
            </Box>


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
          onPress={playSound}
          >
            <Icon name="send" size={25} color={"#fff"} />
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
