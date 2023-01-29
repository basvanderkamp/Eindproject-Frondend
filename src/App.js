import './App.css';
import NavBar from "./components/navigation/Navigation";
import React, {useContext} from "react";
import {AuthContext} from "./components/context/AuthContext";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Profile from "./pages/profilepage/Profile";
import Login from "./pages/loginpage/Login";
import Register from "./pages/registerpage/Register";
import Footer from "./components/footer/Footer";
import Projects from "./pages/projectspage/Projects";
import Assignment from "./pages/assignment/Assignment";
import ExecuteProject from "./pages/executeProject/ExecuteProject";
import ChangeAssignment from "./pages/assignment/ChangeAssignment";

function App() {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <>
            <NavBar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/"/>} />
                    <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/"/>} />
                    <Route path="/projects" element={isAuthenticated ? <Projects/> : <Navigate to="/"/>} />
                    <Route path="/assignments" element={isAuthenticated ? <Assignment/> : <Navigate to="/"/>} />
                    <Route path="/project/:id" element={isAuthenticated ? <ExecuteProject/>: <Navigate to="/"/>} />
                    <Route path="/changeAssignment/:id" element={isAuthenticated ? <ChangeAssignment/>: <Navigate to="/"/>} />
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
