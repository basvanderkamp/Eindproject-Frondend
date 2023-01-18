import "./ProjectTiles.css"
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";



const AcceptedProjectTile = ({assignment}) => {
    const {username, authAxios} = useContext(AuthContext);
    const navigate = useNavigate();


    return(
        <>
            <a className="tile-link" href="/project">
                <div className="tile" key={assignment.id}>
                    <h2 className="tile-h2">{assignment.title}</h2>
                    <p className="tile-text">{assignment.description}</p>
                    <h4 className="tile-h4">Benodigdheden:</h4>
                    <p className="tile-p">{assignment.essentials}</p>
                    <h4 className="tile-h4">Eisen:</h4>
                    <p className="tile-p">{assignment.demands}</p>
                    <h4 className="tile-h4">Beloning:</h4>
                    <p className="tile-p">{assignment.reward}</p>
                    <h3 className="tile-client">opdracht van: {assignment.client.username}  </h3>
                </div>
            </a>
        </>

    )

}
export default AcceptedProjectTile;