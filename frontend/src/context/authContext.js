import { useState, createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         onAuthStateChanged, 
         signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth' // onAuthStateChanged Muestra cuando el usuario cambia, si me logueo me devuelve el usuario, si hago logOut devuelve el estado, para poderlo ejecutar se llama apenas se cargue la app
import { auth } from '../firebase'
import axios from 'axios'


export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    console.log(context)
    if(!context) throw new Error("There is not auth provider");
    return context;
};

export function AuthProvider ({ children }){

    //const [user, setUser] = React.useState('hola');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

    const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)    
    }

    const logout = () => signOut(auth);

    useEffect(() => {
        console.log('auth provider loaded')
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            //console.log(currentUser)
        })

        return () => unsuscribe();

    }, [])

    return (
        <authContext.Provider value={{ signup, login, logout, user, loading, loginWithGoogle }}>
            {children}
        </authContext.Provider>
    );
}