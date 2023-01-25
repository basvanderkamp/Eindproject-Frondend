import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Register.css"
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import Button from "../../helpers/button/Button";

function Register() {

    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobile, setMobile] = useState('');
    const [adres, setAdres] = useState('');
    const [place, setPlace] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [email, setEmail] = useState('');
    const [story, setStory] = useState('');
    const [agreeTerms, toggleAgreeTerms] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [file, setFile] = useState('');

    const {navigate, username, setUsername, noAuthAxios} = useContext(AuthContext);

    const RegisterUser = async (e) => {
        e.preventDefault();


        try {
            const response = await noAuthAxios.post(`/users`, {
                    username: username,
                    password: password,
                    enabled : true,
                    apikey: ""
                    })

            if(response.status === 201) {
                void RegisterClient()
            }
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e.response.data.message)
            }
        }


    }
    const RegisterClient = async () => {

        try {
            const response = await noAuthAxios.post(`/clients`, {
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    mobile: mobile,
                    adres: adres,
                    place: place,
                    zipcode: zipcode,
                    email: email,
                    story: story
                    })

            if(response.status === 201){
                void AssignClientToUser()
            }
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }

    }
    const AssignClientToUser = async () => {

        try {
            const response = await noAuthAxios.put(`/users/${username}/clients/${username}`, {
                    })

            if (response.status === 200){
                void UploadProfilePicture()
            }
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }

    }

    const UploadProfilePicture = async () => {

        const formData = new FormData();
        formData.append("file", file)

        try {
            const response = await axios.post(`http://localhost:8080/clients/${username}/upload`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            if (response.status === 200) {
                navigate('/login')
            }

        } catch (e) {
            if (axios.isCancel(e)) {
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
    }

    function HandleFileChange(e) {
        const uploadedFile = e.target.files[0]
        console.log(uploadedFile)
        setFile(uploadedFile)
        setPreviewUrl(URL.createObjectURL(uploadedFile));

    }

    return (
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <h1 className="title">Registreren</h1>
                    <p className="text-box">Vul de onderstaande velden in en klik op registreren.</p>
                    <form className="form">

                        <section>
                            <label className="label" htmlFor="username-field">Gebruikersnaam</label>
                            <input
                                name="username"
                                id="username-field"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="password-field">Wachtwoord</label>
                            <input
                                name="password"
                                id="password-field"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="firstname-field">Voornaam</label>
                            <input
                                name="firstname"
                                id="firstname-field"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="lastname-field">Achternaam</label>
                            <input
                                name="lastname"
                                id="lastname-field"
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="mobile-field">Telefoon nummer</label>
                            <input
                                name="mobile"
                                id="mobile-field"
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="adres-field">Adres</label>
                            <input
                                name="adres"
                                id="adres-field"
                                type="text"
                                value={adres}
                                onChange={(e) => setAdres(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="place-field">Plaats</label>
                            <input
                                name="place"
                                id="place-field"
                                type="text"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="zipcode-field">Postcode</label>
                            <input
                                name="zipcode"
                                id="zipcode-field"
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="email-field">E-mail</label>
                            <input
                                name="email"
                                id="email-field"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="story-field">Mijn Verhaal</label>
                            <textarea
                                name="story"
                                id="story-field"
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                                rows={5}
                                cols={40}
                            />
                        </section>
                        <section>
                            <label className="label" >Kies een profiel foto:</label>
                            <input
                                name="file"
                                type="file"
                                accept="image.*"
                                onChange={HandleFileChange}
                            />
                        </section>
                        {previewUrl &&
                            <label className="preview-box">
                                Preview:
                                <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                            </label>
                        }
                        <section className="terms">
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree-field"
                                value={agreeTerms}
                                onChange={(e) => toggleAgreeTerms(e.target.checked)}
                            />
                            <label className="label" htmlFor="agree-field">Ik ga akkoord met de voorwaarden</label>
                        </section>
                        <Button
                            styling="button"
                            toBeDisabled={!agreeTerms}
                            functionCall={RegisterUser}
                            buttonText="Registreren"
                        />
                    </form>
                    <p className="bottom-text">Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
                </div>
            </div>
        </>
    );
}

export default Register;