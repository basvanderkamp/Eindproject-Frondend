import React, {useNavigate} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";



export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState("pending");

    useEffect(()=> {

        const storedToken = localStorage.getItem('token')

        if ( storedToken ) {
            const decodedToken = jwt_decode(storedToken)


            if ( Math.floor( Date.now() / 1000 ) < decodedToken.exp ) {
                console.log( "De gebruiker is NOG STEEDS ingelogd 🔓" )
                setUsername(decodedToken.sub)
                void loginFunction()
            } else  {
                console.log( "De token is verlopen" )
                localStorage.removeItem( 'token' )
            }
        } else {
            setStatus("done")
            setIsAuthenticated(false)
            navigate("/")

        }
    },[])

    function loginFunction() {
        setIsAuthenticated(true)
        setStatus("done")
    }

    function logoutFunction() {
        setIsAuthenticated(false)
        console.log("gebruiker is uitgelogd")
        localStorage.removeItem('token');
        setStatus("done")
        navigate("/login")
    }


    const noAuthAxios= axios.create( {
        baseURL : 'http://localhost:8080'
    });

    const jwToken = localStorage.getItem('token')
    const authAxios = axios.create( {
        baseURL : 'http://localhost:8080',
        headers : {
            Authorization: `Bearer ${jwToken}`,

        },
    });

    const data = {
        isAuthenticated,
        username,
        setUsername,
        noAuthAxios,
        authAxios,
        login: loginFunction,
        logout: logoutFunction,
        navigate,
    }

    return (
        <AuthContext.Provider value={data}>
            {status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider