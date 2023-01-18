import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/context/AuthContext";
import {useNavigate} from "react-router-dom";
import "./Profile.css"
import profielfoto from "./../../assets/profielfotoExample.jpg"
import MyProjectTile from "../../components/projectTile/MyProjectTile";
import AcceptedProjectTile from "../../components/projectTile/AcceptedProjectTile";





function Profile() {
    const [client, setClient] = useState([]);
    const [myProjects, setMyProjects] = useState([])
    const [activeProjects, setActiveProjects] = useState([])
    const [picture, setPicture] = useState("")
    const { username, authAxios, status, setStatus} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(username)




    useEffect( () => {
    const fetchClient = async () => {

        try {
            const response = await authAxios.get( `/clients/${username}`, {});
            console.log(response.data)
            setClient(response.data);
            setMyProjects(response.data.assignments)
            setActiveProjects(response.data.executor.assignments)
            setPicture(response.data.file.url)


        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)

            }
        }


    }
    
        void fetchClient()

    }, [username] )
     



    return(
        <>
            <div className="outer-box">
                <div className="inner-box">
                   <div className="profile-container">
                       <h1 className="profile-title">Welkom {client.username}</h1>
                       <span className="image-box">
                            <img className="profile-img" src={picture} alt="profielfoto"/>
                       </span>
                   </div>
                    <div className="profile-container">
                        <span>
                            <h4 className="profile-head">Gebruikers info</h4>
                            <ul className="profile-list">
                                <li>voornaam: {client.firstname}</li>
                                <li>achternaam: {client.lastname}</li>
                                <li>Mobiel: {client.mobile}</li>
                                <li>Adres: {client.adres}</li>
                                <li>Plaats: {client.place}</li>
                                <li>Postcode: {client.zipcode}</li>
                                <li>Email: {client.email}</li>
                            </ul>
                        </span>
                        <button className="button profile-button" type="button" onClick={() => navigate('/assignments')} >Maak een project</button>
                    </div>
                    <div className="profile-container">
                        <span>
                            <h4 className="profile-head">Mijn Verhaal</h4>
                            <p className="profile-list">{client.story}</p>
                        </span>
                        <button className="button profile-button" type="button" onClick={() => navigate('/projects')} >Help met een project</button>
                    </div>
                    <div className="bottom-box">
                        <div className="project-container">
                            <div>
                                <h4 className="projects profile-head">Mijn projecten</h4>
                            </div>
                            <div>
                                <h4 className="projects profile-head">Mijn opdrachten</h4>
                            </div>
                        </div>

                        <div className="project-container">
                            <div className="projects">
                                {Object.keys(myProjects).length === 0 &&
                                    <p className="profile-list">U heeft nog geen projecten gemaakt</p>}
                                {Object.keys(myProjects).length > 0 &&
                                    <ul className="tile-container">
                                        {myProjects.map((assignment)=>{
                                            return(
                                                <MyProjectTile key={assignment.id} assignment={assignment}/>
                                            )
                                        })
                                        }
                                    </ul>
                                }
                            </div>
                            <div className="projects">
                                {Object.keys(activeProjects).length === 0 &&
                                    <p className="profile-list">U voert nog geen opdrachten uit</p>}
                                {Object.keys(activeProjects).length > 0 &&
                                    <ul className="tile-container">
                                        {activeProjects.map((assignment)=>{
                                            return(
                                                <AcceptedProjectTile key={assignment.title} assignment={assignment}/>
                                            )
                                        })
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}
export default Profile;