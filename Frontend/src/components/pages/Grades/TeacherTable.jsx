import React, { useEffect, useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";
import { NumberRangeColumnFilter, SelectColumnFilter } from "../../render-components/TableFilters";
import { getTeacherGrades } from "../../../services/api";

function TeacherTable({ course, group, handleSubmit, updateMyData }) {
    const [gradeData, setGradeData] = useState({
        studentId: null,
        courseId: course,
        groupId: group,
        number: null,
        comment: null,
    });

    useEffect(() => {
        fetchGrades(course.id, group.id);
    }, []);
    const fetchGrades = async () => {
        let grades = await getTeacherGrades(group.id, course.id);
    };

    const handleChange = (row, event) => {
        let data = row.original;
        let name = event.target.name;
        let value = event.target.value;
        handleSubmit({ ...data, [name]: value });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Student",
                accessor: ({ student }) => Util.formatUserName(student),
                filter: "includes",
                value: group["student.id"],
            },
            {
                Header: "Grade",
                accessor: "grade",
                Filter: NumberRangeColumnFilter,
                filter: "between",
                Cell: ({ row, value }) => (
                    <input
                        name="number"
                        defaultValue={gradeData?.grade}
                        onBlur={(event) => handleChange(row, event)}
                    />
                ),
            },
            {
                Header: "Comment",
                accessor: "comment",
                disableFilters: true,
                Cell: ({ row, value }) => (
                    <input
                        name="comment"
                        defaultValue={gradeData?.comment}
                        onBlur={(event) => handleChange(row, event)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <>
            <ReactTable data={gradeData} columns={columns} />
        </>
    );
}

export default TeacherTable;
