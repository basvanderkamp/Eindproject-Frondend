import React, {useContext, useEffect, useState} from 'react';
import "./Assignment.css"
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import {useParams} from "react-router-dom";



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
                            <label className="label" htmlFor="description-field">Omschrijving:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                cols={40}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="essentials-field">Benodigdheden:</label>
                            <input
                                size={40}
                                type="text"
                                value={essentials}
                                onChange={(e) => setEssentials(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="demands-field">Eisen:</label>
                            <input
                                size={40}
                                type="text"
                                value={demands}
                                onChange={(e) => setDemands(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="reward-field">Beloning:</label>
                            <input
                                size={40}
                                type="text"
                                value={reward}
                                onChange={(e) => setReward(e.target.value)}
                            />
                        </section>

                        <button className="button" type="submit"  onClick={ChangeAssignment}>Wijzigen</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default ChangeAssignment;