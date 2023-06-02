import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate();
    return (
        <div className="text-center">
            <Alert variant="danger">You do not have permission to access this resource</Alert>
            <Button onClick={() => navigate("/")}>Return to main view</Button>
        </div>
    );
}

export default Error;
