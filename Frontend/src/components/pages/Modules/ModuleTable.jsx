import React from "react";
import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Util } from "../../../services/Util";

function ModuleTable({ modules, removeModule }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Class",
                accessor: "groups",
                Cell: ({ value }) => (
                    <div>
                        {value
                            ?.slice()
                            .sort((a, b) => b.title.localeCompare(a.title))
                            .map((group, i) => (
                                <tr key={"row" + i}>
                                    <td
                                        key={"td" + i}
                                        className={`badge rounded-pill ${
                                            group.state ? "text-bg-success" : "text-bg-danger"
                                        }`}
                                    >
                                        {group.title}
                                    </td>
                                </tr>
                            ))}
                    </div>
                ),
            },
            {
                Header: "Courses contained",
                accessor: ({ courses }) => courses.map((course) => Util.courseToStr(course)),
                Cell: ({ value }) => (
                    <div>
                        {value.map((course, i) => (
                            <tr key={"row" + i}>
                                <td key={"td" + i}>{course}</td>
                            </tr>
                        ))}
                    </div>
                ),
            },
            {
                Header: "Edit",
                Cell: ({ row }) => (
                    <Link to={"/modules/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row }) => (
                    <Button variant="danger" onClick={() => removeModule(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );

    return <ReactTable data={modules} columns={columns} />;
}

export default ModuleTable;
