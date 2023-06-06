import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import Loader from "../../render-components/Loader";
import { FormControl, FormSelect } from "../../render-components/Form";

import { getUsersByRole } from "../../../services/api/users";
import { getCourse } from "../../../services/api";
import { Util } from "../../../services/Util";

function CourseForm({ title, handleSubmitCourse }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [courseData, setCourseData] = useState({
        title: null,
        leadTeacher: null,
        otherTeachers: [],
    });
    const [teachersOptions, setTeachersOptions] = useState(null);

    useEffect(() => {
        if (id) fetchCourse();
        fetchTeachers();
    }, [id]);

    const fetchCourse = async () => {
        let course = await getCourse(id);
        course.leadTeacher = course.leadTeacher.id;
        course.otherTeachers = course.otherTeachers.map(({ id }) => id);
        setCourseData(course);
    };

    const fetchTeachers = async () => {
        let users = await getUsersByRole("TE");
        setTeachersOptions(users.map((aTeachers) => makeTeacherOption(aTeachers)));
    };

    const makeTeacherOption = (teacher) => {
        return {
            label: Util.formatUserName(teacher),
            value: teacher.id,
        };
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setCourseData({ ...courseData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitCourse(courseData, id);
        }
        setFormValidated(true);
    };

    if (!teachersOptions) return <Loader />;
    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormControl
                    label="Title"
                    name="title"
                    placeholder="Python"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label="Lead Teacher"
                    name="leadTeacher"
                    placeholder="Select a lead teacher..."
                    options={teachersOptions}
                    value={courseData.leadTeacher}
                    onChange={(value) => setCourseData({ ...courseData, leadTeacher: value })}
                    required
                />
                <FormSelect
                    label="Other Teachers"
                    name="otherTeachers"
                    placeholder="Select other teachers..."
                    options={teachersOptions.filter(
                        (teacher) => teacher.value !== courseData.leadTeacher,
                    )}
                    value={courseData.otherTeachers}
                    onChange={(value) => setCourseData({ ...courseData, otherTeachers: value })}
                    required
                    isMulti
                    isClearable
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button variant="btn btn-outline-success me-md-2" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
}

export default CourseForm;
