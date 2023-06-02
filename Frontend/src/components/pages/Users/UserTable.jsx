import React, { useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { SelectColumnFilter } from "../../render-components/TableFilters";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GLOBALS from "../../../Globals";

function UserTable({ data, removeUser }) {
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
                Header: "First name",
                accessor: "firstname",
            },
            {
                Header: "Last name",
                accessor: "lastname",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Role",
                id: "role",
                accessor: ({ role }) => GLOBALS.USER_ROLES[role],
                Filter: SelectColumnFilter,
            },
            {
                Header: "Edit",
                Cell: ({ row }) => (
                    <Link to={"/users/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row }) => (
                    <Button variant="danger" onClick={() => removeUser(row.original.id)}>
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
                  Header: "Class",
                  accessor: "groups",
                  Cell: ({ value }) => (
                      <div>
                          {value?.map((group, i) => (
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
              ...defaultColumns.slice(3),
          ]
        : defaultColumns;
    return (
        <>
            <button onClick={handleClick}>{active ? "Hide class" : "Show class"}</button>
            <div>
                <ReactTable data={data} columns={columns} />
            </div>
        </>
    );
}

export default UserTable;
