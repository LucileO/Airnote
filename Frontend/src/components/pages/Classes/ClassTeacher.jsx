import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "react-bootstrap";

import ClassView from "./ClassView";

function Teacher(props) {
    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Groups</h1>

                            <div className="d-flex flex-column justify-content-around ">
                                {props.groups.map((group) => {
                                    if (group.isActive) {
                                        return (
                                            <Link to={`/classes/${group.id}`} key={group.id}>
                                                <Button
                                                    type="button"
                                                    class="btn btn-outline-dark btn-block"
                                                >
                                                    {group.level} ({group.year})
                                                </Button>
                                            </Link>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </Fragment>
                    }
                />
                <Route path="/:id" element={<ClassView />} />
            </Routes>
        </Fragment>
    );
}

export default Teacher;
