import React, {useContext} from "react";
import "./HomePage.css"
import {AuthContext} from "../../components/context/AuthContext";



function HomePage() {
    const {navigate} = useContext(AuthContext);

    return(
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <div className="home-container">
                        <div className="home-box1">
                            <h1 className="title">Welkom bij HomeProjects</h1>
                            <span className="text-box">
                                <p>Kunt u wel een extra paar handen gebruiken of kunt u sommige huishoudelijke klusjes niet meer zelf.
                                Hier bij HomeProjects bent u op het juiste adres. laat u helpen door mensen uit uw omgeving.</p>
                            </span>
                            <span>
                                <button
                                    className="button"
                                    type="button"
                                    onClick={() => navigate('/register')}
                                >
                                Registreren
                                </button>
                            </span>
                        </div>
                        <div className="home-box2">
                             <span className="text-box">
                                    <h2>Hoe werkt HomeProjects?</h2>
                                    <p>Na het aanmaken van een account kunt u volledig gratis een opdracht aanmaken.
                                    Hierin geeft u aan wat er moet gebeuren, of u de juiste benodigdheden heeft en of u er een beloning voor geeft.
                                    Hieronder ziet u een aantal voorbeelden.</p>
                             </span>
                        </div>
                    </div>
                    <div className="tile-box">
                            <div className="tile" >
                                <h2 className="tile-h2">AutoWassen</h2>
                                <p className="tile-p">Ik wil graag dat mijn mooie Fiat weer gaat glimmen, kun jij me helpen?</p>
                                <h4 className="tile-h4">Benodigdheden:</h4>
                                <p className="tile-p">Ik heb alle spullen al in huis.</p>
                                <h4 className="tile-h4">Eisen:</h4>
                                <p className="tile-p">wassen met zeep en drogen</p>
                                <h4 className="tile-h4">Beloning:</h4>
                                <p className="tile-p">5 euro per uur</p>
                            </div>
                            <div className="tile" >
                                <h2 className="tile-h2">Badkamer Tegelen</h2>
                                <p className="tile-p">Er moet 3m2 muur betegeld worden rond mijn douch</p>
                                <h4 className="tile-h4">Benodigdheden:</h4>
                                <p className="tile-p">Tegels heb ik al besteld, verder heb ik geen spullen voor deze klus</p>
                                <h4 className="tile-h4">Eisen:</h4>
                                <p className="tile-p">Ik wil ze in een patroon gelegt hebben</p>
                                <h4 className="tile-h4">Beloning:</h4>
                                <p className="tile-p">Vaste prijs in overleg</p>
                            </div>
                            <div className="tile" >
                                <h2 className="tile-h2">Planten verpotten</h2>
                                <p className="tile-p">wie wilt mij helpen met het verpotten van mijn planten?</p>
                                <h4 className="tile-h4">Benodigdheden:</h4>
                                <p className="tile-p">Groene vingers</p>
                                <h4 className="tile-h4">Eisen:</h4>
                                <p className="tile-p">Geen</p>
                                <h4 className="tile-h4">Beloning:</h4>
                                <p className="tile-p">Plezier</p>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;