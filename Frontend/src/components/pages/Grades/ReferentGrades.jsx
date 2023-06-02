import React, { useEffect, useState } from "react";

import { getCourses } from "../../../services/api";

function ReferentGrades(userId) {
    const [courses, setCourses] = useState(null);
    const [groups, setGroups] = useState(null);

    useEffect(() => {
        fetchCourses();
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        let groups = getClassesByReferent(userId);
        setGroups(groups);
        setClassesOptions(groups.map((group) => makeClassOption(group)));
    };

    const fetchCourses = async () => {
        let courses = getCourses();
        setCourses(courses);
        setCoursesOptions(courses.map((course) => makeCourseOption(course)));
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

export default ReferentGrades;
