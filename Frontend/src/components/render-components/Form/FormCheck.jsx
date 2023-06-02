import React from "react";
import { Form } from "react-bootstrap";

function FormCheck({ checked, label, name, placeholder, value, onChange, required, ...args }) {
    return (
        <Form.Group className="mb-3">
            <Form.Check
                type="checkbox"
                label={label}
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                {...args}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormCheck;
