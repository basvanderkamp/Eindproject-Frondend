import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../components/context/AuthContext"
import axios from "axios";
import Button from "../../helpers/button/Button";
import Section from "../../helpers/formSections/FormSection";


function Login() {

    const {navigate, isAuthenticated, noAuthAxios, login, username, setUsername} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');


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
                    <Section
                        labelText="Gebruikersnaam:"
                        value={username}
                        setValue={setUsername}
                    />
                    <section>
                        <label className="label">Wachtwoord:</label>
                        <input
                            size={40}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                    <section>
                        <label className="label">Wachtwoord herhalen:</label>
                        <input
                            size={40}
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                    </section>

                    <div className="error-box">
                        {password !== passwordRepeat && <p className="error-text">Wachtwoorden komen niet overeen!</p>}
                    </div>

                    <Button
                        styling="button"
                        toBeDisabled={!username || !password || password !== passwordRepeat}
                        functionCall={loginUser}
                        buttonText="Log in"
                    />
                </form>
                <p className="bottom-text" >Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
            </div>
        </div>
    )
}
export default Login;
