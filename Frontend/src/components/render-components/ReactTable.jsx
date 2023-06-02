import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import { DefaultColumnFilter, GlobalFilter } from "./TableFilters";

/* eslint-disable react/jsx-key */

function ReactTable({ columns, data, updateMyData, globalFilter = false }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                hiddenColumns: columns
                    .filter((col) => col.isVisible === false)
                    .map((col) => col.accessor),
            },
            updateMyData,
            defaultColumn, // Be sure to pass the defaultColumn option
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
    );

    return (
        <Fragment>
            {globalFilter ? (
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            ) : null}
            <Table {...getTableProps()}>
                <thead>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <tr key="table-header" {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column, j) => (
                                        // Apply the header cell props
                                        <th
                                            key={"table-header-col-" + j}
                                            {...column.getSortByToggleProps()}
                                        >
                                            {column.render("Header")}
                                            {/* Add a sort direction indicator */}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " 🔽"
                                                        : " 🔼"
                                                    : ""}
                                            </span>
                                            <div
                                                onClick={(e) => e.stopPropagation()} //Prevent click from triggering sorting
                                            >
                                                {column.canFilter ? column.render("Filter") : null}
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row, i) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <tr key={"react-table-row-" + i} {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell, j) => {
                                            // Apply the cell props
                                            return (
                                                <td
                                                    key={"react-table-row-" + i + "-col-" + j}
                                                    {...cell.getCellProps()}
                                                >
                                                    {
                                                        // Render the cell contents
                                                        cell.render("Cell")
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Fragment>
    );
}

export default ReactTable;
