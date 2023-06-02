import React, { Fragment, useEffect, useRef, useState } from "react";

import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/headers/Header";
import Footer from "./components/headers/Footer";
import Home from "./components/pages/Home";
import Classes from "./components/pages/ClassesRoot";
import Grades from "./components/pages/GradesRoot";
import UsersRoot from "./components/pages/UsersRoot";
import Modules from "./components/pages/ModulesRoot";
import Courses from "./components/pages/CoursesRoot";
import LoginForm from "./components/pages/Authentication/LoginForm";
import { getConnectedUser, getUser } from "./services/api";
import GLOBALS from "./Globals";

function App() {
    const appRef = useRef();
    //Verify if the user is log or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState(null);
    const [darkmode, setDarkmode] = useState(false);

    const onSetDarkMode = () => {
        appRef.current.classList.toggle("dark");
        setDarkmode(!darkmode);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) setIsLoggedIn(true);
    }, []);

    useEffect(() => {
        if (isLoggedIn) getSelf();
    }, [isLoggedIn]);

    const getSelf = async () => {
        let user = await getConnectedUser();
        setUserRole(GLOBALS.USER_ROLES[user.role]);
        setUserId(user.id);
    };

    return (
        <Fragment>
            <div ref={appRef} className="app">
                <ToastContainer theme={darkmode ? "dark" : "light"} />
                <header>
                    <Header
                        darkmode={darkmode}
                        setDarkmode={onSetDarkMode}
                        isLoggedIn={isLoggedIn}
                        userRole={userRole}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                </header>

                <main>
                    <Container className="h-100">
                        <Routes>
                            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                            <Route
                                path="/login"
                                element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
                            />
                            <Route
                                path="classes/*"
                                element={<Classes userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="users/*"
                                element={<UsersRoot userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="modules/*"
                                element={<Modules userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="courses/*"
                                element={<Courses userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="grades/*"
                                element={<Grades userId={userId} userRole={userRole} />}
                            />
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </Fragment>
    );
}

export default App;
