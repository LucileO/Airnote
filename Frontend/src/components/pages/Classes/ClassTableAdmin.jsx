import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import GLOBALS from "../../../Globals";
import { SelectColumnFilter } from "../../render-components/TableFilters";
import { Util } from "../../../services/Util";

function ClassesTable({ groups, removeClass, userId, darkmode }) {
    const [active, setActive] = useState(false);
    const handleClick = () => {
        setActive(!active);
    };
    const defaultColumns = React.useMemo(
        () => [
            {
                accessor: "id",
                isVisible: false,
            },
            {
                Header: "Level",
                accessor: "level",
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Class",
                accessor: "name",
                Cell: ({ row, value }) => (
                    <Link to={"/classes/" + row.original.id}>
                        <button className={"btn btn-outline-secondary"}>{value}</button>
                    </Link>
                ),
            },
            {
                Header: "Year",
                accessor: "year",
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Status",
                accessor: ({ isActive }) => GLOBALS.isActive[isActive],
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Edit",
                Cell: ({ row, value }) => (
                    <Link to={"/classes/edit/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row, value }) => (
                    <Button variant="danger" onClick={() => removeClass(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );
    const columns = active
        ? [
            ...defaultColumns.slice(0, 3),
            {
                Header: "Modules",
                accessor: "modules",
                Cell: ({ value }) => (
                    <div>
                        {value?.map((module, i) => (
                            <tr key={"row" + i}>
                                <td>{Util.moduleToStr(module)}</td>
                            </tr>
                        ))}
                    </div>
                ),
            },
            ...defaultColumns.slice(3),
        ]
        : defaultColumns;

    return (
        <>
            <button onClick={handleClick}>{active ? "Hide modules" : "Show modules"}</button>
            <ReactTable data={groups} columns={columns} />
        </>
    );
}

export default ClassesTable;
