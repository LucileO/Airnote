import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormControl } from "../../render-components/Form";
import { login } from "../../../services/api/log";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password).then(() => setIsLoggedIn(true));
        navigate("/");
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                <FormControl
                    label="Email"
                    type="text"
                    placeholder="firstname.lastname@airnote.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center">
                    <Button type="submit">Login</Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
