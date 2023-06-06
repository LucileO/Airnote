import React, { useEffect, useState } from "react";

import { getClassesByCourses, getCoursesByTeacher } from "../../../services/api";
import TeacherTable from "./TeacherTable";
import { Util } from "../../../services/Util";
import { FormSelect } from "../../render-components/Form";

function TeacherGrades({ userId }) {
    const [tableKey, setTableKey] = useState(0);
    const [courses, setCourses] = useState(null);
    const [groups, setGroups] = useState(null);
    const [coursesOptions, setCoursesOptions] = useState([]);
    const [classesOptions, setClassesOptions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);
    useEffect(() => {
        if (selectedCourse) {
            fetchGroups();
        }
    }, [selectedCourse]);

    const fetchCourses = async () => {
        let courses = await getCoursesByTeacher(userId);
        setCourses(courses);
        setCoursesOptions(courses.map((course) => makeCourseOption(course)));
    };

    const fetchGroups = async () => {
        let groups = await getClassesByCourses(selectedCourse);
        setGroups(groups);
        setClassesOptions(groups.map((group) => makeClassOption(group)));
    };
    const makeClassOption = (group) => {
        return {
            label: Util.groupToStr(group),
            value: group.id,
        };
    };

    const makeCourseOption = (course) => {
        return {
            label: course.title,
            value: course.id,
        };
    };
    return (
        <>
            <FormSelect
                label="Courses"
                name="courses"
                placeholder="Select a course..."
                options={coursesOptions}
                onChange={(value) => {
                    setSelectedCourse(value);
                    setTableKey((prevKey) => prevKey + 1);
                }}
                value={selectedCourse}
                isClearable
            />
            {selectedCourse && (
                <FormSelect
                    label="Classes"
                    name="groups"
                    placeholder="Select a class..."
                    options={classesOptions}
                    onChange={(value) => {
                        setSelectedGroup(value);
                        setTableKey((prevKey) => prevKey + 1); // Increment the key to trigger a re-render of the table
                    }}
                    value={selectedGroup}
                    isClearable
                />
            )}
            {selectedCourse && selectedGroup ? (
                <TeacherTable key={tableKey} course={selectedCourse} group={selectedGroup} />
            ) : null}
        </>
    );
}

export default TeacherGrades;
