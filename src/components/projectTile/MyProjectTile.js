import "./ProjectTiles.css"
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";



const MyProjectTile = ({assignment}) => {
    const {username, authAxios} = useContext(AuthContext);
    const navigate = useNavigate();

    const SetExecutor = async () => {

        try {
            await authAxios.put( `/assignments/${assignment.title}/executors/${username}`, {});

        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
        navigate("/profile")

    }
    console.log(assignment)
    return(
        <>
            <div className="tile-containter">
                <div className="tile" key={assignment.id}>
                    <h2 className="tile-h2">{assignment.title}</h2>
                    <p className="tile-text">{assignment.description}</p>
                    <h4 className="tile-h4">Benodigdheden:</h4>
                    <p className="tile-p">{assignment.essentials}</p>
                    <h4 className="tile-h4">Eisen:</h4>
                    <p className="tile-p">{assignment.demands}</p>
                    <h4 className="tile-h4">Beloning:</h4>
                    <p className="tile-p">{assignment.reward}</p>
                    <h3 className="tile-client">Status: {assignment.assignmentStatus}</h3>
                    {assignment.assignmentStatus === "ACCEPTED" && <h3 className="tile-client">Uitvoerder: {assignment.executor.name}</h3>}
                </div>

            </div>

        </>

    )

}
export default MyProjectTile;