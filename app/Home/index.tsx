import { Box, Button, NativeBaseProvider, Text} from "native-base";
import { db } from "@/firebase/fireBase";
import { useContext, useEffect, useState } from "react";
import { query, onSnapshot, collection, orderBy} from "firebase/firestore";
import { AuthContext } from "@/context/auth";

export default function Home () {
  const { SingOut} = useContext(AuthContext);
  const [users, setUsers] = useState([])
  console.log(users)

  useEffect(()=>{
    async function SearchingForUsers() {
      const listingUsers = collection(db, 'users')

      const onSub = onSnapshot(listingUsers, (snapshot)=> {

        let list = [];

        snapshot.forEach((doc)=> {
          list.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            avatarURL: doc.data().avatarURL
          })
          setUsers(list)
        })
      })
    }
    SearchingForUsers()
  },[])


  return(
    <NativeBaseProvider>


      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Button onPress={( SingOut)}>sair</Button>

      {users.map((u, i)=>(
        <Button
        bgColor={'amber.500'}
        >
          <Text>{u.name}</Text>
        </Button>
      ))}


    </Box>
    </NativeBaseProvider>
  )
}