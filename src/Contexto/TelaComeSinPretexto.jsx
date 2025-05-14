import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from '../Firebase/Firebase'

const TelaComeSinPretexto = createContext(); // Caja donde almaceno el contexto para toda la web

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // el estado del usuario Firebase Auth
  const [userData, setUserData] = useState(null); // estado de los datos personalizados desde Firestore
  const navigate = useNavigate(); // Método para navegar

  // Escucha cambios en el estado de autenticación (inicio o cierre de sesión)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      // Si hay un usuario logueado, obtenemos su info desde Firestore
      if (firebaseUser) {
        const userRef = doc(db, "usuarios", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data()); // Guardamos la info del usuario en sesión
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null); // No hay sesión, se limpia
      }
    });

    return () => unsubscribe(); // Limpiamos el listener
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/Home"); // Redirige al home si el login es exitoso
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null); // limpia también los datos de Firestore
    navigate("/"); // Redirige al login
  };

  return (
    <TelaComeSinPretexto.Provider value={{
      user, // datos de Firebase Auth
      userData, // datos desde Firestore
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </TelaComeSinPretexto.Provider>
  );
};

export const useAuth = () => useContext(TelaComeSinPretexto); // El atajo al contexto