import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import "./Register.css"
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import Button from "../../helpers/button/Button";
import Section from "../../helpers/formSections/FormSection";

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
    const [error, setError] = useState('');
    let errorMessage;

    const {navigate, username, setUsername, noAuthAxios} = useContext(AuthContext);

    if (username === ''|| password === '' || mobile === '' || adres === '' || place === '' || zipcode === '' || email === '' || story === '') {
        errorMessage = "U heeft nog niet alle invoervelden ingevuld!"
    } else {
        errorMessage = ""
    }


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
                setError(e.response.data.message)
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
            const response = await noAuthAxios.put(`/users/${username}/clients/${username}`)

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
                        <Section
                            labelText="Gebruikersnaam:"
                            value={username}
                            setValue={setUsername}
                        />
                        <Section
                            labelText="Wachtwoord:"
                            value={password}
                            setValue={setPassword}
                        />
                        <Section
                            labelText="Voornaam:"
                            value={firstname}
                            setValue={setFirstname}
                        />
                        <Section
                            labelText="Achternaam:"
                            value={lastname}
                            setValue={setLastname}
                        />
                        <Section
                            labelText="Telefoon nummer:"
                            value={mobile}
                            setValue={setMobile}
                        />
                        <Section
                            labelText="Adres met huisnummer:"
                            value={adres}
                            setValue={setAdres}
                        />
                        <Section
                            labelText="Plaats:"
                            value={place}
                            setValue={setPlace}
                        />
                        <Section
                            labelText="Postcode:"
                            value={zipcode}
                            setValue={setZipcode}
                        />
                        <Section
                            labelText="E-mailadres:"
                            value={email}
                            setValue={setEmail}
                        />
                        <section>
                            <label className="label" >Mijn Verhaal:</label>
                            <textarea
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
                            <label className="preview-box" >Preview:
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

                        <div className="error-box">
                            <p className="error-text">{errorMessage}</p>
                            {!file && <p className="error-text">U heeft nog geen profielfoto gekozen</p>}
                            {error && <p className="error-text">Gebruikersnaam is al in gebruik</p>}
                            {!agreeTerms && <p className="error-text">U bent nog niet akkoord gegaan met de voorwaarden</p> }
                        </div>

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