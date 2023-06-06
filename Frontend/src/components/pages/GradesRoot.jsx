import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import ReferentGrades from "./Grades/ReferentGrades";

import TeacherGrades from "./Grades/TeacherGrades";
import StudentGrades from "./Grades/StudentGrades";

import GLOBALS from "../../Globals";
import Error from "../render-components/Error";

function Grades({ userId, userRole }) {
    const getGradesView = () => {
        switch (userRole) {
            case "Administrator Referent":
                return <ReferentGrades userRole={userRole} userId={userId} />;
            case "Teacher":
                return <TeacherGrades userRole={userRole} userId={userId} />;
            case "Student":
                console.log("là");
                return <StudentGrades userId={userId} userRole={userRole} />;
            default:
                return null;
        }
    };

    if (![GLOBALS.USER_ROLES.ST, GLOBALS.USER_ROLES.AR, GLOBALS.USER_ROLES.TE].includes(userRole))
        return <Error />;
    return (
        <Fragment>
            {getGradesView()}
            <Routes>
                <Route path="/:id" element={<StudentGrades userRole={userRole} />} />
            </Routes>
        </Fragment>
    );
}

export default Grades;
