import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import light from "/airnote_light.png";
import dark from "/airnote_dark.png";

import Menu from "./Menu";
import { logout } from "../../services/api/log";

function Header({ setDarkmode, setIsLoggedIn, darkmode, isLoggedIn, userRole }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const logOut = () => {
        logout();
        setIsLoggedIn(false);
        navigate("/");
    };

    const logIn = () => {
        navigate("/login");
    };
    console.log(userRole);
    return (
        <Fragment>
            <div className="d-flex justify-content-between header">
                <div className="menu">
                    <div
                        className="logo"
                        onMouseOver={() => setShowMenu(true)}
                        onMouseOut={() => setShowMenu(false)}
                    >
                        <Menu
                            darkmode={darkmode}
                            setDarkmode={setDarkmode}
                            isLoggedIn={isLoggedIn}
                            userRole={userRole}
                        />
                        {darkmode ? (
                            <img src={dark} width="150" height="50" alt="Airnote" />
                        ) : (
                            <img src={light} width="150" height="50" alt="Airnote" />
                        )}
                    </div>

                    {/*  */}
                </div>
                {/* Show the user role only if already connected */}
                <p>{isLoggedIn ? userRole : null}</p>

                <div>
                    {/* Show the button of login/logout depending on the user status */}
                    {isLoggedIn ? (
                        <Button variant="dark" onClick={logOut}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="dark" onClick={logIn}>
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Header;
