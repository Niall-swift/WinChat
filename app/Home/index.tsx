import { Box, Button, NativeBaseProvider, Text} from "native-base";
import { db } from "@/firebase/fireBase";
import { useContext, useEffect, useState } from "react";
import { query, onSnapshot, collection, orderBy, doc, collectionGroup} from "firebase/firestore";
import { AuthContext } from "@/context/auth";

export default function Home () {
  const { SingOut} = useContext(AuthContext);

  const [users, setUsers] = useState([])
  console.log(users)

  // buscando usuarios
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
            avatarURL: doc.data().avatarURL,
            message: doc.data().message
          })
          setUsers(list)
        })
      })
    }
    SearchingForUsers()
  },[])

  

  return(
    <NativeBaseProvider>


      <Box flex={1}>
      <Button onPress={( SingOut)}>sair</Button>

      {users.map((u, i)=>(
        <Button
        key={i}
        bgColor={'amber.500'}
        >
          <Text>{u.message}</Text>
        </Button>
      ))}


    </Box>
    </NativeBaseProvider>
  )
}