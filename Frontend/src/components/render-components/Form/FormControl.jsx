import React from "react";
import { Form } from "react-bootstrap";

function FormControl({ data, label, name, placeholder, value, onChange, required, ...args }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                placeholder={placeholder}
                value={value ?? ""}
                onChange={onChange}
                required={required}
                {...args}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please choose a {label.toLowerCase()}.
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormControl;
