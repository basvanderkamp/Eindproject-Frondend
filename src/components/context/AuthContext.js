import {useNavigate} from "react-router-dom";
import {createContext, useState} from "react";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function loginFunction() {
        setIsAuthenticated(true)
        console.log("gebruiker is ingelogd")
        navigate("/Profile")
    }
    function logoutFunction() {
        setIsAuthenticated(false)
        console.log("gebruiker is uitgelogd")
        navigate("/")
    }

    const data = {
        isAuthenticated,
        login: loginFunction,
        logout: logoutFunction
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider