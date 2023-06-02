import React, { Fragment, useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "../../render-components/Loader";
import { FormControl, FormSelect } from "../../render-components/Form";

import { getCourses, getModules } from "../../../services/api";

function ModuleForm({ title, handleSubmitModule }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [moduleData, setModuleData] = useState({
        title: null,
        courses: [],
    });
    const [coursesOptions, setCoursesOptions] = useState(null);

    useEffect(() => {
        if (id) fetchModule();
        fetchCourses();
    }, [id]);

    const fetchCourses = async () => {
        let courses = await getCourses();
        setCoursesOptions(courses.map((course) => makeCourseOption(course)));
    };

    const makeCourseOption = (course) => {
        return {
            label: course.title,
            value: course.id,
        };
    };
    const fetchModule = async () => {
        let module = await getModules(id);
        module.courses = module.courses.map(({ id }) => id);
        setModuleData(module);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setModuleData({ ...moduleData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitModule(moduleData, id);
        }
        setFormValidated(true);
    };

    if (!coursesOptions) return <Loader />;
    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormControl
                    label="Title"
                    name="title"
                    placeholder="Programmation..."
                    value={moduleData.title}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label="Courses"
                    name="courses"
                    placeholder="Select courses..."
                    options={coursesOptions}
                    value={moduleData.courses}
                    onChange={(value) => setModuleData({ ...moduleData, courses: value })}
                    isMulti
                    isClearable
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
}

export default ModuleForm;
