import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import "./Navigation.css"

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
                {!isAuthenticated && <button
                    className="nav-button"
                    type="button"
                    onClick={() => navigate('/login')}
                >
                    Inloggen
                </button>}
                {isAuthenticated && <button
                    className="nav-button"
                    type="button"
                    onClick={() => navigate('/profile')}
                >
                    Profiel
                </button>}
                {isAuthenticated && <button
                    className="nav-button"
                    type="button"
                    onClick={() => navigate('/projects')}
                >
                    projecten
                </button>}
                {isAuthenticated && <button
                    className="nav-button"
                    type="button"
                    onClick={logout}
                >
                    Uitloggen
                </button>}
            </div>
        </nav>
    );
}

export default NavBar;