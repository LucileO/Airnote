import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getClass } from "../../../services/api/classes";
import { getUsersByRole } from "../../../services/api/users";

import { Util } from "../../../services/Util";
import { FormSelect } from "../../render-components/Form";
import Loader from "../../render-components/Loader";

function ClassUserForm({ title, handleSubmitClass }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [groupData, setGroupData] = useState({
        level: null,
        name: null,
        year: null,
        referent: null,
        delegates: [],
        students: [],
    });

    const [referentsOptions, setReferentsOptions] = useState(null);
    const [studentsOptions, setStudentsOptions] = useState(null);

    useEffect(() => {
        if (id) fetchClass();
        fetchReferents();
        fetchStudents();
    }, [id]);
    const fetchClass = async () => {
        let group = await getClass(id);
        group.referent = group.referent?.id;
        group.delegates = group.delegates.map(({ id }) => id);
        group.students = group.students.map(({ id }) => id);
        setGroupData(group);
    };
    const fetchReferents = async () => {
        let users = await getUsersByRole("AR");
        setReferentsOptions(users.map((user) => makeUserOption(user)));
    };

    const fetchStudents = async () => {
        let users = await getUsersByRole("ST");
        setStudentsOptions(users.map((user) => makeUserOption(user)));
    };

    const makeUserOption = (user) => {
        return {
            label: Util.formatUserName(user),
            value: user.id,
        };
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitClass(groupData, id);
        }
        setFormValidated(true);
    };

    if (!referentsOptions || !studentsOptions) return <Loader />;
    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormSelect
                    label="Referent"
                    name="referent"
                    placeholder="Select a referent..."
                    options={referentsOptions}
                    value={groupData.referent}
                    onChange={(value) => setGroupData({ ...groupData, referent: value })}
                    isClearable
                />
                <FormSelect
                    label="Delegates"
                    name="delegates"
                    placeholder="Select delegates..."
                    options={groupData.students.map((student) =>
                        studentsOptions.find(({ value }) => student == value),
                    )}
                    value={groupData.delegates}
                    onChange={(value) => setGroupData({ ...groupData, delegates: value })}
                    isClearable
                    isMulti
                />
                <FormSelect
                    label="Students"
                    name="students"
                    placeholder="Select students..."
                    options={studentsOptions}
                    value={groupData.students}
                    onChange={(value) => setGroupData({ ...groupData, students: value })}
                    isClearable
                    isMulti
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

export default ClassUserForm;
