import React, { Fragment, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";

import { createUser, deleteUser, editUser, getUsers } from "../../services/api/users";

import UserTable from "./Users/UserTable";
import UserForm from "./Users/UserForm";
import { getClasses } from "../../services/api";
import { Util } from "../../services/Util";
import GLOBALS from "../../Globals";
import Error from "../render-components/Error";

function Users({ userRole }) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    const fetchUsers = async () => {
        let users = await getUsers();
        setUsers(users);
    };
    const fetchGroups = async () => {
        let groups = await getClasses();
        setGroups(groups);
    };

    // Perform join operation to match user's ID with group information (Name and state)
    const data = users.map((user) => {
        const userGroups = groups.filter((group) => {
            const groupUserIds = group.students.map((user) => user.id);
            return groupUserIds.includes(user.id);
        });
        const groupsinfo = userGroups.map((group) => {
            const groupState = group.isActive;
            const groupString = Util.groupToStr(group);
            return { state: groupState, title: groupString };
        });
        return { ...user, groups: groupsinfo };
    });

    const addUser = async (user) => {
        createUser(user.firstname, user.lastname, user.email, user.role, user.password)
            .then(() => {
                toastSuccess("User successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };
    const removeUser = async (userId) => {
        deleteUser(userId).then(() => {
            toastSuccess("User successfully deleted");
            fetchUsers();
        });
    };

    const modifyUser = async (user, userId) => {
        editUser(userId, user.firstname, user.lastname, user.email, user.role).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    const redirectToTable = () => {
        fetchUsers();
        navigate("/users");
    };

    if (![GLOBALS.USER_ROLES.AD, GLOBALS.USER_ROLES.AR].includes(userRole)) return <Error />;
    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Users</h1>
                            <div className="mb-3">
                                <Link to="/users/create">
                                    <Button variant="success">Create User</Button>
                                </Link>
                            </div>
                            <UserTable data={data} removeUser={removeUser} />
                        </Fragment>
                    }
                />
                <Route
                    path="/:id"
                    element={
                        <UserForm
                            title="Edit user"
                            isEditing={true}
                            handleSubmitUser={modifyUser}
                        />
                    }
                />
                <Route
                    path="/create"
                    element={<UserForm title="Create user" handleSubmitUser={addUser} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Users;
