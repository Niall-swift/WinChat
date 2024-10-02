import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db, auth, storage } from "@/firebase/fireBase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type UserProps = {
  uid: string;
  name: string;
  email: string;
};
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  console.log(user);

  const isAuthenticated = !!user;

  // buscando dados local
  useEffect(() => {
    async function getUser() {
      const userDetatil = await AsyncStorage.getItem("@WinChat");
      let hasUser: UserProps = JSON.parse(userDetatil || "{}");

      /// VERIFICAR SE RECEBEMOS AS INFORMAÇOES DO USUARIO
      if (Object.keys(hasUser).length > 0) {
        setUser({
          id: hasUser.id,
          name: hasUser.name,
          emial: hasUser.email,
          avatarURL: null,
          phone: null,
        });
      }
    }
    getUser();
  }, []);

  /// função para deslogar usuario
  async function SingOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        emial: "",
        avatarURL: "",
        phone: "",
      });
    });
  }

  // função Register
  async function Register(name, email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "Usuarios", uid), {
          email: value.user.email,
          name: name,
          avatarUrl: null,
        }).then(async () => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          await AsyncStorage.setItem("@WinChat", JSON.stringify(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //  função Signin
  async function Signin(email, password) {

    await signInWithEmailAndPassword(auth, email, password)

    .then(async (value) => {
        let UID = value.user.uid;

        const docRef = doc(db, "Usuarios", UID);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: UID,
          name: docRef.data().name,
          email: value.user.email,
          avatarURL: docRef.data().avatarURL, // Certifique-se de acessar corretamente a propriedade 'avatarURL', se necessário
        };
        setUser(data);
        await AsyncStorage.setItem("@WinChat", JSON.stringify(data));
      }
    );
    console.log('logado')
  }

  

  return (
    <AuthContext.Provider
      value={{
        user,
        Register,
        Signin,
        SingOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
