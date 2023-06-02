import React from "react";

import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Util } from "../../../services/Util";
import { SelectColumnFilter } from "../../render-components/TableFilters";

function CourseTable({ data, removeCourse }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Lead Teacher",
                accessor: ({ leadTeacher }) => Util.formatUserName(leadTeacher),
            },
            {
                Header: "Other Teachers",
                accessor: "otherTeachers",
                Cell: ({ value }) => (
                    <div>
                        {value?.map((otherTeacher, i) => (
                            <Row key={"row" + i}>
                                <Col key={"td" + i}>{Util.formatUserName(otherTeacher)}</Col>
                            </Row>
                        ))}
                    </div>
                ),
            },
            {
                Header: "In module",
                accessor: "modules",
                Filter: SelectColumnFilter,
            },
            {
                Header: "Edit",
                Cell: ({ row }) => (
                    <Link to={"/courses/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row }) => (
                    <Button variant="danger" onClick={() => removeCourse(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );

    return <ReactTable data={data} columns={columns} />;
}

export default CourseTable;
