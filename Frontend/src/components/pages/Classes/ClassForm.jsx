import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getClass } from "../../../services/api/classes";

import { Util } from "../../../services/Util";
import { FormCheck, FormControl, FormSelect } from "../../render-components/Form";
import { getModules } from "../../../services/api";
import Loader from "../../render-components/Loader";

function ClassForm({ title, handleSubmitClass }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [modulesOptions, setModulesOptions] = useState([]);
    const [groupData, setGroupData] = useState({
        level: null,
        name: null,
        year: null,
        isActive: true,
        modules: [],
    });

    useEffect(() => {
        if (id) fetchClass();
        fetchModules();
    }, [id]);

    const fetchClass = async () => {
        let group = await getClass(id);
        group.referent = group.referent?.id;
        setGroupData(group);
    };
    const fetchModules = async () => {
        let modules = await getModules();
        setModulesOptions(modules.map((module) => makeModulesOption(module)));
    };
    const makeModulesOption = (mod) => {
        return {
            label: Util.moduleToStr(mod),
            value: mod.id,
        };
    };
    console.log(modulesOptions);
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setGroupData({ ...groupData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitClass(groupData, id);
        }
        setFormValidated(true);
    };
    if (!modulesOptions) return <Loader />;
    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormSelect
                    label="Class"
                    name="level"
                    placeholder="Select a class..."
                    options={Util.getClassOptions()}
                    value={groupData.level}
                    onChange={(value) => setGroupData({ ...groupData, level: value })}
                    required
                />
                <FormControl
                    label="Name"
                    name="name"
                    placeholder="Concorde..."
                    value={groupData.name}
                    onChange={handleChange}
                    required
                />
                <FormControl
                    label="Year"
                    name="year"
                    placeholder="2022/2023..."
                    value={groupData.year}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label="Modules"
                    name="modules"
                    placeholder="Select modules..."
                    options={modulesOptions}
                    value={groupData.modules}
                    onChange={(value) => setGroupData({ ...groupData, modules: value })}
                    isClearable
                    isMulti
                />
                <FormCheck
                    label="Active"
                    checked={groupData.isActive}
                    onChange={(checked) =>
                        setGroupData({
                            ...groupData,
                            isActive: checked,
                        })
                    }
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
}

export default ClassForm;
