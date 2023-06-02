import React from "react";

import { ReactComponent as Light } from "../../assets/images/light.svg";
import { ReactComponent as Dark } from "../../assets/images/dark.svg";

function Darkmode({ darkmode, setDarkmode }) {
    return (
        <div className="d-flex my-switch">
            <div className="form-text text-1">
                <Light />
            </div>
            <div className="form-check form-switch form-check-inline">
                <input
                    id="revenue"
                    className="form-check-input form-check-inline"
                    type="checkbox"
                    onClick={() => {
                        setDarkmode(!darkmode);
                    }}
                ></input>
            </div>
            <div className="form-text text-2">
                <Dark />
            </div>
        </div>
    );
}

export default Darkmode;
