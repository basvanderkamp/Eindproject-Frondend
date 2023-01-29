import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import Button from "../../helpers/button/Button";
import Section from "../../helpers/formSections/FormSection";


function Assignment() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [essentials, setEssentials] = useState('');
    const [demands, setDemands] = useState('');
    const [reward, setReward] = useState('');
    const {navigate, username, authAxios} = useContext(AuthContext);

    let errorMessage;
    if (description === "" || essentials === "" || demands === "" || reward === "") {
        errorMessage = "U heeft nog niet alle invoervelden ingevuld!"
    } else {
        errorMessage = "";
    }

    const makeAssignment = async (e) => {
        e.preventDefault();

        try {
            await authAxios.post(`/assignments`, {
                title: title,
                description: description,
                essentials : essentials,
                demands: demands,
                reward: reward
            })
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
         void AssignAssignmentToClient();
    }

     const AssignAssignmentToClient = async () => {

         try {
             await authAxios.put(`/clients/${username}/assignments/${title}`, {
             })
         } catch ( e ) {
             if(axios.isCancel(e)){
                 console.log('The axios request was cancelled')
             } else {
                 console.error(e)
             }
         }
         navigate('/profile')
     }


    return (
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <h1 className="title">Hulp nodig?</h1>
                    <p className="text-box">Vul de onderstaande velden in en klik op opdracht aanmaken.</p>
                    <form className="form" >
                        <Section
                            labelText="Titel:"
                            value={title}
                            setValue={setTitle}
                        />
                        <section>
                            <label className="label">Omschrijving:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                cols={40}
                            />
                        </section>
                        <Section
                            labelText="Benodigdheden:"
                            value={essentials}
                            setValue={setEssentials}
                        />
                        <Section
                            labelText="Eisen:"
                            value={demands}
                            setValue={setDemands}
                        />
                        <Section
                            labelText="Beloning:"
                            value={reward}
                            setValue={setReward}
                        />

                        <div className="error-box">
                            <p className="error-text">{errorMessage}</p>
                        </div>

                        <Button
                            styling="button"
                            toBeDisabled={errorMessage === "U heeft nog niet alle invoervelden ingevuld!"}
                            functionCall={makeAssignment}
                            buttonText="Verzend"
                        />
                    </form>

                </div>
            </div>
        </>
    );
}
export default Assignment;