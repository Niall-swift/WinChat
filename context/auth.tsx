import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db, auth, storage } from "@/firebase/fireBase";
import AsyncStorage from '@react-native-async-storage/async-storage';



type UserProps = {
  id: string,
  uid: string,
  name: string,
  email: string
}
export const AuthContext = createContext({});

export function AuthProvider ({children}) {

  const [user, setUser] = useState(null);
  const isAuthenticated = !!user

  // buscando dados local
  useEffect(()=>{
    async function getUser() {
      const userDetatil = await AsyncStorage.getItem('@WinChat');
      let hasUser:UserProps = JSON.parse(userDetatil || '{}')

      /// VERIFICAR SE RECEBEMOS AS INFORMAÇOES DO USUARIO
      if(Object.keys(hasUser).length > 0){
        setUser({
          id: hasUser.uid,
          name: hasUser.name,
          emial: hasUser.email,
          avatarURL: null,
          phone: null,
        })
      }
    }
    getUser()
  },[])

  /// função para deslogar usuario
  async function SingOut(){
    await AsyncStorage.clear()
    .then(()=>{
      setUser({
        id: '',
        name: '',
        emial:'',
        avatarURL:'',
        phone: '',
      })
    })
  }

// função Register
  async function Register(email,password) {
  await createUserWithEmailAndPassword(auth,email, password)
  .then(async(value)=> {
    let uid = value.user.uid
    console.log('s')
    await setDoc(doc(db, "users", uid),{
      id: uid,
      name: null,
      phone: null,
      email: email,
      avatarURL: null
    })
    .then(async()=> {
      let data = {
        uid: uid,
        email: value.user.email,
        avatarURL: null
      };
      setUser(data)
      RegisterForUsser(data)
      await AsyncStorage.setItem('@WinChat', JSON.stringify(data))
    })
  })
  .catch(()=> {
    console.log('n')
  })
}


// registe user na collection 
  async function RegisterForUsser() {
    const docRef = collection(db, "users")
  }


//  função Signin
  async function Signin({email, password}) {
  await signInWithEmailAndPassword(auth, email, password)
  .then(async (value) => {
    let UID = value.user.uid;

    const docRef = doc(db, "users", UID)
    const docSnap = await getDoc(docRef)

    let data = {
      uid: UID,
      name: docSnap.data()?.name, // Certifique-se de acessar corretamente a propriedade 'name', se necessário
      email: value.user.email,
      avatarURL: docRef.data()?.avatarURL // Certifique-se de acessar corretamente a propriedade 'avatarURL', se necessário
    }
    setUser(data)
    await AsyncStorage.setItem('@WinChat', JSON.stringify(data))
  })
}

  return(
    <AuthContext.Provider value={{
      user,
      Register,
      Signin,
      SingOut,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}