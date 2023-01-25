import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import "./Navigation.css"
import Button from "../../helpers/button/Button";

function NavBar() {

    const {navigate, isAuthenticated, logout} = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">
                <span className="nav-box">
                    <h1 className="h1">
                        HomeProjects
                    </h1>
                </span>
            </Link>

            <div className="nav-box">
                {!isAuthenticated &&
                    <Button
                        styling="nav-button"
                        functionCall={() => navigate('/login')}
                        buttonText="Inloggen"
                    />
                }
                {isAuthenticated &&
                    <Button
                    styling="nav-button"
                    functionCall={() => navigate('/profile')}
                    buttonText="Profiel"
                    />
                }
                {isAuthenticated &&
                    <Button
                        styling="nav-button"
                        functionCall={() => navigate('/projects')}
                        buttonText="Projecten"
                    />
                }
                {isAuthenticated &&
                    <Button
                        styling="nav-button"
                        functionCall={logout}
                        buttonText="Uitloggen"
                    />
                }
            </div>
        </nav>
    );
}
export default NavBar;