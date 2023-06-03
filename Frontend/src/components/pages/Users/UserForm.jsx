import React, { Fragment, useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { FormControl, FormSelect } from "../../render-components/Form";

import { getUser } from "../../../services/api";
import { Util } from "../../../services/Util";

function UserForm({ title, handleSubmitUser, isEditing = false }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [userData, setUserData] = useState({
        firstname: null,
        lastname: null,
        role: null,
        email: null,
        password: null,
    });

    useEffect(() => {
        if (id) fetchUser();
    }, [id]);

    const fetchUser = async () => {
        let user = await getUser(id);
        setUserData(user);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUserData({ ...userData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitUser(userData, id);
        }
        setFormValidated(true);
    };

    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormControl
                    label="First name"
                    name="firstname"
                    placeholder="John"
                    value={userData.firstname}
                    onChange={handleChange}
                    required
                />
                <FormControl
                    label="Last name"
                    name="lastname"
                    placeholder="John"
                    value={userData.lastname}
                    onChange={handleChange}
                    required
                />
                <FormControl
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="firstname.lastname@airnote.com"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label="Role"
                    name="role"
                    placeholder="Select a role..."
                    options={Util.getRoleOptions()}
                    value={userData.role}
                    onChange={(value) => setUserData({ ...userData, role: value })}
                    required
                />
                {isEditing ? null : (
                    <FormControl
                        label="Password"
                        name="password"
                        placeholder="Create a password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
}

export default UserForm;
