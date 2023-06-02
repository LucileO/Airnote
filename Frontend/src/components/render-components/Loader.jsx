import React from "react";

import { PacmanLoader } from "react-spinners";

function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <PacmanLoader color="#36d7b7" />
        </div>
    );
}

export default Loader;
