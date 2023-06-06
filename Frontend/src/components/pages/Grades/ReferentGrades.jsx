import React, { useEffect, useState } from "react";

import { getClass, getClassesByReferent } from "../../../services/api";
import { FormSelect } from "../../render-components/Form";
import { Util } from "../../../services/Util";
import TeacherTable from "./TeacherTable";

function ReferentGrades({ userId }) {
    const [tableKey, setTableKey] = useState(0);
    const [courses, setCourses] = useState(null);
    const [groups, setGroups] = useState(null);
    const [coursesOptions, setCoursesOptions] = useState([]);
    const [classesOptions, setClassesOptions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        fetchGroups();
    }, []);
    useEffect(() => {
        if (selectedGroup) {
            fetchCourses();
        }
    }, [selectedGroup]);

    const fetchCourses = async () => {
        let group = await getClass(selectedGroup);
        console.log(group);
        let courses = group.modules.map((module) => module.courses.map((course) => course)).flat();
        let coursesIds = group.modules
            .map((module) => module.courses.map((course) => course.id))
            .flat();
        setCourses(coursesIds);
        setCoursesOptions(courses.map((course) => makeCourseOption(course)));
        console.log(courses);
    };

    const fetchGroups = async () => {
        let groups = await getClassesByReferent(userId);
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

            {selectedGroup && (
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
            )}
            {selectedCourse && selectedGroup ? (
                <TeacherTable key={tableKey} course={selectedCourse} group={selectedGroup} />
            ) : null}
        </>
    );
}

export default ReferentGrades;
