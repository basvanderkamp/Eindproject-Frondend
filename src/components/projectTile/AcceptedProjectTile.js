import "./ProjectTiles.css"
import React from "react";




const AcceptedProjectTile = ({assignment}) => {

    return(
        <>
            <a className="tile-link" href={"/project/" + assignment.title}>
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