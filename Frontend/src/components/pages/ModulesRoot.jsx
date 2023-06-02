import React, { useState, useEffect, Fragment } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";

import { createModule, deleteModule, editModule, getClasses, getModules } from "../../services/api";

import ModuleTable from "./Modules/ModuleTable";
import ModuleForm from "./Modules/ModuleForm";
import GLOBALS from "../../Globals";
import Error from "../render-components/Error";
import { Util } from "../../services/Util";

function Modules({ userRole }) {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchModules();
        fetchGroups();
    }, []);
    const fetchGroups = async () => {
        let groups = await getClasses();
        setGroups(groups);
    };
    const fetchModules = async () => {
        let modules = await getModules();
        setModules(modules);
    };
    // Perform join operation to match module's ID with group information
    const data = modules.map((module) => {
        const moduleGroups = groups.filter((group) => {
            const groupsModulesIds = group.modules.map((module) => module.id);
            return groupsModulesIds.includes(module.id);
        });

        const groupsNames = moduleGroups.map((group) => Util.groupToStr(group));
        return { ...module, groups: groupsNames };
    });
    const addModules = async (module) => {
        createModule(module.title, module.groups, module.courses)
            .then(() => {
                toastSuccess("Module successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };

    const removeModule = async (courseId) => {
        deleteModule(courseId).then(() => {
            toastSuccess("Module successfully deleted");
            fetchModules();
        });
    };

    const modifyModules = async (module, moduleId) => {
        editModule(moduleId, module.title, module.groups, module.courses).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    const redirectToTable = () => {
        fetchModules();
        navigate("/modules");
    };

    if (![GLOBALS.USER_ROLES.AD, GLOBALS.USER_ROLES.AR, GLOBALS.USER_ROLES.TE].includes(userRole))
        return <Error />;
    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Modules</h1>
                            <div className="mb-3">
                                <Link to="/modules/create">
                                    <Button variant="success">Create module</Button>
                                </Link>
                            </div>
                            <ModuleTable modules={data} removeModule={removeModule} />
                        </Fragment>
                    }
                />

                <Route
                    path="/:id"
                    element={<ModuleForm title="Edit module" handleSubmitModule={modifyModules} />}
                />
                <Route
                    path="/create"
                    element={<ModuleForm title="Create module" handleSubmitModule={addModules} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Modules;
