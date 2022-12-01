// how to use context:
//import {useContext} from 'react';
//import {context} from '../components/authContext'

import { useNavigate } from 'react-router';
import { useAuth } from '../context/authContext'

export function Example(){

    const authContext = useAuth();
    // o..
    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout()
        navigate('/login')

    }


    //const authContext = useContext(context);
    console.log(authContext, user)
    return <div>home</div>
}



