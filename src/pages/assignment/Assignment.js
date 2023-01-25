import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import Button from "../../helpers/button/Button";



function Assignment() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [essentials, setEssentials] = useState('');
    const [demands, setDemands] = useState('');
    const [reward, setReward] = useState('');
    const [file, setFile] =useState();
    const {navigate, username, authAxios} = useContext(AuthContext);

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
                                size={40}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </section>
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
                        <section>
                            <label className="label" htmlFor="story-field">Bestand Kiezen:</label>
                            <input
                                size={40}
                                type="file"
                                value={file}
                                onChange={(e) => setFile(e.target.value)}

                            />
                        </section>
                        <Button
                            styling="button"
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