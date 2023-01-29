import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/context/AuthContext";
import { useParams} from "react-router-dom";
import "./ExecuteProject.css"
import Button from "../../helpers/button/Button";

function ExecuteProject() {

    const { id } = useParams();
    const [assignment, setAssignment] = useState([]);
    const {navigate, authAxios} = useContext(AuthContext);

    useEffect( () => {
        const fetchAssignment = async () => {

            try {
                const response = await authAxios.get( `/assignments/${id}`, {});
                setAssignment(response.data);
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


    const FinishProject = async () => {

        try {
            await authAxios.put( `/executors/${assignment.executor.name}/finishAssignments/${assignment.title}`, {});
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
        navigate("/profile")
    }
    const CancelProject = async () => {

        try {
            await authAxios.put( `/executors/${assignment.executor.name}/cancelAssignments/${assignment.title}`, {});
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
        navigate("/projects")
    }

    return(
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <div className="box">
                        <div className="box-left">
                            <h1 className="project-title">De Opdracht</h1>
                            <h4 className="profile-head">Bedankt voor het kiezen van deze opdracht</h4>
                            <p className="profile-list">U kunt nu contact op nemen met de opdrachtgever. Hieronder ziet u de contact gegevens. De opdracht blijft op uw naam staan tot u hem zelf afsluit.</p>
                            <span className="project-span">
                                <h4 className="profile-head">Gegevens van de opdrachtgever</h4>
                                    {assignment.client &&
                                        <ul className="profile-list">
                                            <li className="list">voornaam: {assignment.client.firstname}</li>
                                            <li className="list">achternaam: {assignment.client.lastname}</li>
                                            <li className="list">Mobiel: {assignment.client.mobile}</li>
                                            <li className="list">Adres: {assignment.client.adres}</li>
                                            <li className="list">Plaats: {assignment.client.place}</li>
                                            <li className="list">Postcode: {assignment.client.zipcode}</li>
                                            <li className="list">Email: {assignment.client.email}</li>
                                        </ul>
                                    }
                            </span>
                        </div>
                        <div className="box-right">
                            {assignment &&
                                <div className="tile" key={assignment.id}>
                                    <h2 className="tile-h2">{assignment.title}</h2>
                                    <p className="tile-text">{assignment.description}</p>
                                    <h4 className="tile-h4">Benodigdheden:</h4>
                                    <p className="tile-p">{assignment.essentials}</p>
                                    <h4 className="tile-h4">Eisen:</h4>
                                    <p className="tile-p">{assignment.demands}</p>
                                    <h4 className="tile-h4">Beloning:</h4>
                                    <p className="tile-p">{assignment.reward}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-left">
                            <p>Gaat het hem na overleg toch niet worden? Je kunt de opdracht cancelen met de knop project cancelen.</p>
                            <p>Wanneer het uitvoeren van de opdracht gelukt is kunt u hier rechts op project afsluiten klikken.</p>
                        </div>
                        <div className="box-right">
                            <Button
                                styling="button project-button"
                                functionCall={CancelProject}
                                buttonText="Project cancelen"
                            />
                            <Button
                                styling="button project-button"
                                functionCall={FinishProject}
                                buttonText="Project afsluiten"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ExecuteProject