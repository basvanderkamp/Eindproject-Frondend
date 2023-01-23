import "./ProjectTiles.css"
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";



const MyProjectTile = ({assignment}) => {
    const {navigate, authAxios} = useContext(AuthContext);


    const DeleteProject = async () => {

        try {
            await authAxios.delete( `/assignments/${assignment.title}`, {});

        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e)
            }
        }
        setTimeout(refreshPage, 300);
    }
    function refreshPage(){ window.location.href = "/profile"; }

    return(
        <>
            <div className="tile-containter">
                <div className="tile" key={assignment.id}>
                    <div className="tile-top-box">
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
                    <div className="tile-bottom-box">
                        {assignment.assignmentStatus === "AVAILABLE" && <button className="tile-button" type="button" onClick={() => navigate("/changeAssignment/" + assignment.title)} >wijzig</button>}
                        {assignment.assignmentStatus === "FINISHED" && <button className="tile-button" type="button" onClick={() => DeleteProject(assignment.title)} >delete</button>}
                    </div>
                </div>
            </div>

        </>

    )

}
export default MyProjectTile;