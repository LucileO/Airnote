import React, { useState, useEffect, Fragment } from "react";

import { getClasses } from "../../services/api";

import Administration from "./Classes/ClassAdmin";
import Teacher from "./Classes/ClassTeacher";
import GLOBALS from "../../Globals";
import Error from "../render-components/Error";

function Classes({ userRole, userId, darkmode }) {
    const [groups, setGroups] = useState([]);
    const isAdmin = userRole && userRole.startsWith("Admin");

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        let groups = await getClasses();
        setGroups(groups);
    };

    if (![GLOBALS.USER_ROLES.AD, GLOBALS.USER_ROLES.AR, GLOBALS.USER_ROLES.TE].includes(userRole))
        return <Error />;
    return (
        <Fragment>
            {isAdmin ? (
                <Administration
                    groups={groups}
                    fetchGroups={fetchGroups}
                    isAdmin={isAdmin}
                    userId={userId}
                    darkmode={darkmode}
                />
            ) : (
                <Teacher groups={groups} userId={userId} darkmode={darkmode} />
            )}
        </Fragment>
    );
}

export default Classes;
