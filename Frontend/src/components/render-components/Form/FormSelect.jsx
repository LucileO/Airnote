import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

function FormSelect({
    label,
    name,
    options,
    value,
    disabled = false,
    required = false,
    isMulti = false,
    isClearable = false,
    placeholder,
    onChange,
    ...args
}) {
    const getSelectedOption = (value) => {
        return isMulti
            ? options.filter((option) => value?.includes(option.value))
            : options.find((option) => option.value === value) ?? null;
    };

    const handleChange = (options, meta) => {
        onChange(
            isMulti ? options.map((option) => option.value) ?? [] : options?.value ?? null,
            meta.name,
        );
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <div>
                <Form.Control
                    hidden //Control only for feedbacks
                    onChange={() => null} //Avoid console warning about non being listened (readonly deactivate the invalid)
                    value={value == null ? "" : "ok"}
                    required={required}
                />
                <Select
                    isMulti={isMulti}
                    isClearable={isClearable}
                    placeholder={placeholder}
                    options={options}
                    value={getSelectedOption(value)}
                    onChange={handleChange}
                    {...args}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Please choose a {label.toLowerCase()}.
                </Form.Control.Feedback>
            </div>
        </Form.Group>
    );
}

export default FormSelect;
