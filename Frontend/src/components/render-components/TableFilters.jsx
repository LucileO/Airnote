import React from "react";
import { useAsyncDebounce } from "react-table";

// Define a default UI for filtering
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{" "}
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: "1.1rem",
                    border: "0",
                }}
            />
        </span>
    );
}

// Define a default UI for filtering
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
    const [min, max] = React.useMemo(() => {
        let min = 0;
        let max = 25;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <input
                value={filterValue[0] || ""}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: "70px",
                    marginRight: "0.5rem",
                }}
            />
            to
            <input
                value={filterValue[1] || ""}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined]);
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: "70px",
                    marginLeft: "0.5rem",
                }}
            />
        </div>
    );
}

function MultiSelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    //TODO
}

export { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, NumberRangeColumnFilter };
