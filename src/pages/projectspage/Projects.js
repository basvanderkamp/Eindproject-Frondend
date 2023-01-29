import axios from "axios";
import "./Projects.css"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/context/AuthContext";
import ProjectTile from "../../components/projectTile/ProjectTile";






function Projects()  {
    const [list, setList] = useState([]);
    const {authAxios} = useContext(AuthContext);

        const fetchAssignments = async () => {

            try {
                const response = await authAxios.get( `/assignments`, {});
                setList(response.data);

            } catch ( e ) {
                if(axios.isCancel(e)){
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
        }
    useEffect( () => {
        void fetchAssignments()

    },[])

    return(
        <div className="outer-box">
            <div className="inner-box">
                <div className="project-text-box">
                    <div className="project-text">
                        <p>Welkom op de projecten pagina. Hier zie je alle projecten die mensen hebben aangemaakt. Kies er 1 uit en klik op uitvoeren.
                            Hierna krijg je de benodigde gegevens en kun jij mensen gaan helpen.</p>
                    </div>
                </div>
                {Object.keys(list).length > 0 &&
                    <ul className="tile-container">
                        {list.map((assignment)=>{
                                return(
                                    <ProjectTile key={assignment.id} assignment={assignment}/>
                                )
                            })
                        }
                    </ul>
                }
            </div>

        </div>
    )
}
export default Projects;

