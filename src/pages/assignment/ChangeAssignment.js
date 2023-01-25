import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import {useParams} from "react-router-dom";
import Button from "../../helpers/button/Button";
import Section from "../../helpers/formSections/FormSection";



function ChangeAssignment() {

    const [description, setDescription] = useState('');
    const [essentials, setEssentials] = useState('');
    const [demands, setDemands] = useState('');
    const [reward, setReward] = useState('');
    const [client, setClient] = useState('')
    const {navigate, username, authAxios} = useContext(AuthContext);
    const { id } = useParams();

    useEffect( () => {
        const fetchAssignment = async () => {

            try {
                const response = await authAxios.get( `/assignments/${id}`, {});
                setDescription(response.data.description)
                setEssentials(response.data.essentials)
                setDemands(response.data.demands)
                setReward(response.data.reward)
                setClient(response.data.client.username)
            } catch ( e ) {
                if(axios.isCancel(e)){
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
        }
        void fetchAssignment()
    }, [id] )


    const ChangeAssignment = async (e) => {
        e.preventDefault();

        if (client === username){

            try {
                await authAxios.patch(`/assignments/${id}`, {
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
            setTimeout(navigate("/profile"), 300);
        } else {
            navigate("/")
            console.log("U bent niet de eigenaar van dit project en kunt hem dus niet wijzigen.")
        }

    }




    return (
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <h1 className="title">Hier kun je jouw opdracht wijzigen.</h1>
                    <p className="text-box">Vul de onderstaande velden in en klik op Wijzigen. Let op de titel is niet te wijzigen.</p>
                    <form className="form" >
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

                        <Button
                            styling="button"
                            functionCall={ChangeAssignment}
                            buttonText="Wijzigen"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
export default ChangeAssignment;