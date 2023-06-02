import React from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";
import { Badge } from "react-bootstrap";

function StudentTable({ grades }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Course",
                accessor: "title",
                disableFilters: true,
            },
            {
                Header: "Lead Teacher",
                accessor: ({ leadTeacher }) => Util.formatUserName(leadTeacher),
                disableFilters: true,
            },
            {
                Header: "Other Teachers",
                accessor: "otherTeachers",
                disableFilters: true,
                Cell: ({ value }) => (
                    <div>
                        {value?.map((otherTeacher, i) => (
                            <tr key={"row" + i}>
                                <td key={"td" + i}>{Util.formatUserName(otherTeacher)}</td>
                            </tr>
                        ))}
                    </div>
                ),
            },
            {
                Header: "Grade",
                accessor: "number",
                disableFilters: true,
                Cell: ({ value }) => (
                    <Badge bg={value > 10 ? "success" : "danger"}>{value}</Badge>
                    // <div style={{ color: value > 10 ? "green" : "red" }}>{value}</div>
                ),
            },
            {
                Header: "Comment",
                accessor: "comment",
                disableFilters: true,
            },
        ],
        [],
    );

    return <ReactTable data={grades} columns={columns} />;
}

export default StudentTable;
