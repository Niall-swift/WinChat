import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from '@react-native-firebase/storage';



export const AuthContext = createContext({});

export function AuthProvider ({children}) {

  const [user, setUser] = useState(null);

// função Register
  async function Register(email,password) {
  await createUserWithEmailAndPassword(auth,email, password)
  .then(async(value)=> {
    let uid = value.user.uid
    console.log('s')
    await setDoc(doc(db, "users", uid),{
      uid: uid,
      name: null,
      phone: null,
      email: email,
      avatarURL: null
    })
    .then(()=> {
      let data = {
        uid: uid,
        email: value.user.email,
        avatarURL: null
      };
      setUser(data)
    })
  })
  .catch(()=> {
    console.log('n')
  })
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
  })
}

/// envio de imagem
  async function UploadFile(image) {
    
    const uploadRef = storage().ref('users').child(user?.uid)

    return await uploadRef.putFile(image)
  }



  return(
    <AuthContext.Provider value={{
      user,
      Register,
      Signin,
      UploadFile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}