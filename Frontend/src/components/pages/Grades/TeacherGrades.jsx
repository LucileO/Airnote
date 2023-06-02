import React, { useEffect, useState } from "react";

import {
    addGrade,
    editGrade,
    getClassesByCourses,
    getCoursesByTeacher,
} from "../../../services/api";
import TeacherTable from "./TeacherTable";
import { Util } from "../../../services/Util";
import { FormSelect } from "../../render-components/Form";

function TeacherGrades({ userRole, userId }) {
    const [courses, setCourses] = useState(null);
    const [groups, setGroups] = useState(null);
    const [coursesOptions, setCoursesOptions] = useState(null);
    const [classesOptions, setClassesOptions] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);
    useEffect(() => {
        fetchGroups();
    }, [courses?.id]);

    const fetchCourses = async () => {
        let courses = await getCoursesByTeacher(userId);
        setCourses(courses);
        setCoursesOptions(courses.map((course) => makeCourseOption(course)));
    };

    console.log(courses);

    const fetchGroups = async () => {
        const coursesIds = courses.map((course) => course.id);
        let groups = await getClassesByCourses(coursesIds);
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
    console.log(groups);
    console.log(courses);

    return (
        <>
            <FormSelect
                label="Classes"
                name="groups"
                placeholder="Select a class..."
                options={classesOptions}
                onChange={(value) => setSelectedGroup(value)}
                value={selectedGroup}
                isClearable
            />
            <FormSelect
                label="Courses"
                name="courses"
                placeholder="Select a course..."
                options={coursesOptions}
                onChange={(value) => setSelectedCourse(value)}
                value={selectedCourse}
                isClearable
            />
            <TeacherTable course={selectedCourse} group={selectedGroup} />
        </>
    );
}

export default TeacherGrades;
