import React, { Fragment } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastError, toastSuccess } from "../../../services/toasts";

import { editClass, createClass, deleteClass, classUser } from "../../../services/api";

import ClassForm from "./ClassForm";
import ClassView from "./ClassView";
import ClassesTable from "./ClassTableAdmin";
import ClassUserForm from "./ClassUserForm";

function Administration({ groups, fetchGroups, isAdmin, userId, darkmode }) {
    const navigate = useNavigate();

    const removeClass = async (groupId) => {
        deleteClass(groupId).then(() => {
            toastSuccess("Class successfully deleted");
            fetchGroups();
        });
    };

    const redirectToTable = () => {
        fetchGroups();
        navigate("/classes");
    };
    const redirectToGroup = (groupId) => {
        navigate(`/classes/${groupId}`);
    };

    const addGroup = (group) => {
        createClass(
            group.level,
            group.name,
            group.year,
            group.modules,
            group.isActive,           
        )
            .then(() => {
                toastSuccess("Class successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };

    const modifyGroups = (group, groupId) => {
        editClass(groupId, group.level, group.name, group.year, group.modules, group.isActive).then(
            () => {
                toastSuccess("Successfully edited");
                redirectToTable();
            },
        );
    };
    const manageGroup = (group, groupId) => {
        //Check if the delegates are still in the group
        group.delegates = group.delegates.filter((student) => group.students.includes(student));
        classUser(
            groupId,
            group.level,
            group.name,
            group.year,
            group.modules,
            group.referent,
            group.delegates,
            group.students,

        ).then(() => {
            toastSuccess("Successfully modified");
            redirectToGroup(groupId);
        });
    };
    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Classes</h1>
                            <div className="mb-3">
                                <Link to="/classes/create">
                                    <Button variant="success">Create class</Button>
                                </Link>
                            </div>
                            <ClassesTable groups={groups} removeClass={removeClass} darkmode={darkmode} userId={userId}/>
                        </Fragment>
                    }
                />
                <Route path="/:id" element={<ClassView isAdmin={isAdmin} userId={userId} />} />
                <Route
                    path="/edit/:id"
                    element={<ClassForm title="Edit class" handleSubmitClass={modifyGroups} />}
                />
                <Route
                    path="/:id/manageclass"
                    element={<ClassUserForm title="Manage class" handleSubmitClass={manageGroup} />}
                />
                <Route
                    path="/create"
                    element={<ClassForm title="Create class" handleSubmitClass={addGroup} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Administration;
