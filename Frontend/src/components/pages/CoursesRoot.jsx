import React, { useState, useEffect, Fragment } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastSuccess } from "../../services/toasts";

import { createCourse, getCourses, deleteCourse, editCourse, getModules } from "../../services/api";

import CourseForm from "./Courses/CourseForm";
import CourseTable from "./Courses/CourseTable";
import GLOBALS from "../../Globals";
import Error from "../render-components/Error";

function Courses({ userRole, userId }) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchModules();
    }, []);

    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    };
    const fetchModules = async () => {
        let modules = await getModules();
        setModules(modules);
    };
    // Perform join operation to match course's ID with module information
    const data = courses.map((course) => {
        const courseModules = modules.filter((module) => {
            const modulesCourseIds = module.courses.map((course) => course.id);
            return modulesCourseIds.includes(course.id);
        });

        const modulesNames = courseModules.map((module) => module.title);
        return { ...course, modules: modulesNames };
    });
    const addCourses = async (course) => {
        createCourse(course.title, course.leadTeacher, course.otherTeachers).then(() => {
            toastSuccess("Course successfully created");
            redirectToTable();
        });
    };

    const removeCourse = async (courseId) => {
        deleteCourse(courseId).then(() => {
            toastSuccess("Course successfully deleted");
            fetchCourses();
        });
    };

    const modifyCourses = async (course, courseId) => {
        editCourse(courseId, course.title, course.leadTeacher, course.otherTeachers).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    const redirectToTable = () => {
        fetchCourses();
        navigate("/courses");
    };

    if (![GLOBALS.USER_ROLES.AD, GLOBALS.USER_ROLES.AR].includes(userRole)) return <Error />;
    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Courses</h1>
                            <div className="mb-3">
                                <Link to="/courses/create">
                                    <Button variant="success">Create course</Button>
                                </Link>
                            </div>
                            <CourseTable data={data} removeCourse={removeCourse} />
                        </Fragment>
                    }
                />

                <Route
                    path="/:id"
                    element={<CourseForm title="Edit course" handleSubmitCourse={modifyCourses} />}
                />
                <Route
                    path="/create"
                    element={<CourseForm title="Create course" handleSubmitCourse={addCourses} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Courses;
