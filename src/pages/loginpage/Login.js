import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../components/context/AuthContext"
import axios from "axios";
import Button from "../../helpers/button/Button";


function Login() {

    const {navigate, isAuthenticated, noAuthAxios, login, username, setUsername} = useContext(AuthContext);
    const [password, setPassword] = useState('');


    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await noAuthAxios.post( `/authenticate`, {
                username: username,
                password: password
            } );
            if (response.status === 200) {
                localStorage.setItem('token', response.data.jwt);
                login();
                console.log("gebruiker is ingelogd")
                navigate("/Profile")
            }
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
    }

    return (
        <div className="outer-box">
            <div className="inner-box">
                <h1 className="title">Inloggen</h1>
                <p className="text-box">Vul de onderstaande velden in en klik op Log in.</p>
                <form className="form">
                    <section>
                        <label className="label" htmlFor="user-field">Gebruikersnaam</label>
                        <input
                            name="username"
                            id="user-field"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </section>
                    <section>
                        <label className="label" htmlFor="password-field-field">Wachtwoord</label>
                        <input
                            name="password"
                            id="password-field"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                    <Button
                        styling="button"
                        toBeDisabled={!username || !password || isAuthenticated === true}
                        functionCall={loginUser}
                        buttonText="Log in"
                    />
                </form>
                <p className="bottom-text" >Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
            </div>
        </div>
    );
}
export default Login;
