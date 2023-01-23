import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import "./ExecuteProject.css"

function ExecuteProject() {

    const { id } = useParams();
    const [assignment, setAssignment] = useState([]);
    const {navigate, authAxios} = useContext(AuthContext);

    useEffect( () => {
        const fetchAssignment = async () => {

            try {
                const response = await authAxios.get( `/assignments/${id}`, {});
                setAssignment(response.data);
                console.log(response.data)
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
            await authAxios.put( `/executors/${assignment.executor.name}/assignments/${assignment.title}`, {});
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }navigate("/profile")
    }

    return(
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <div className="box">
                        <div className="box-left">
                            <h1 className="project-title">De Opdracht</h1>
                                <span>
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
                            <h4 className="profile-head">Gegevens van de opdrachtgever</h4>
                            <p className="profile-list">Neem contact op met de opdrachtgever, de gegevens zie je hier boven. Wanneer de opdracht is uitgevoerd en je de beloning ontvangen hebt kun je de opdracht hier afsluiten. Dit doe je door op de knop hiernaast te klikken. </p>
                        </div>
                        <div className="box-right">
                            <button className="button project-button" type="button" onClick={FinishProject} >Project afsluiten</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default ExecuteProject