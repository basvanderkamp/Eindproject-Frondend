import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Assignment.css"
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";



function Assignment() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [essentials, setEssentials] = useState('');
    const [demands, setDemands] = useState('');
    const [reward, setReward] = useState('');
    const [file, setFile] =useState();
    const {isAuthenticated, login, username, noAuthAxios, authAxios} = useContext(AuthContext);
    const navigate = useNavigate();

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
        AssignAssignmentToClient();

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

                        <section>
                            <label className="label" htmlFor="title-field">Titel:</label>
                            <input
                                name="title"
                                id="title-field"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="description-field">Omschrijving:</label>
                            <textarea
                                name="description"
                                id="description-field"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                cols={40}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="essentials-field">Benodigdheden:</label>
                            <input
                                name="essentials"
                                id="essentials-field"
                                type="text"
                                value={essentials}
                                onChange={(e) => setEssentials(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="demands-field">Eisen:</label>
                            <input
                                name="demands"
                                id="ldemands-field"
                                type="text"
                                value={demands}
                                onChange={(e) => setDemands(e.target.value)}
                            />
                        </section>
                        <section>
                            <label className="label" htmlFor="reward-field">Beloning:</label>
                            <input
                                name="reward"
                                id="reward-field"
                                type="text"
                                value={reward}
                                onChange={(e) => setReward(e.target.value)}
                            />
                        </section>

                        <section>
                            <label className="label" htmlFor="story-field">Bestand Kiezen:</label>
                            <input
                                name="file"
                                id="file-field"
                                type="file"
                                value={file}
                                onChange={(e) => setFile(e.target.value)}

                            />
                        </section>

                        <button className="button" type="submit"  onClick={makeAssignment}>Verzend</button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default Assignment;