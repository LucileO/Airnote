import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";
import { getClass } from "../../../services/api";
import { ReactComponent as View } from "../../../assets/images/eye.svg";

import GLOBALS from "../../../Globals";
import Loader from "../../render-components/Loader";
import { Util } from "../../../services/Util";

function SetTable({ students, isRef }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Lastname",
                accessor: "lastname",
            },
            {
                Header: "Firstname",
                accessor: "firstname",
            },
            {
                Header: "View",
                accessor: "id",
                isVisible: isRef,
                disableFilters: true,
                Cell: ({ row }) =>
                    isRef ? (
                        <Link to={`/grades/${row.original.id}`}>
                            <Button variant="info">
                                <View />
                            </Button>
                        </Link>
                    ) : null,
            },
        ],
        [],
    );
    return <ReactTable data={students} columns={columns} />;
}

function ClassView({ isAdmin, userId }) {
    const [group, setGroup] = useState(null);
    const [referent, setReferent] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetchGroup(id);
    }, []);

    const fetchGroup = async () => {
        let group = await getClass(id);
        setGroup(group);
        setReferent(group.referent.id);
    };
    const isRef = userId == referent;

    if (!group) return <Loader />;
    return (
        <Fragment>
            <Link to={"/classes"}>
                <Button variant="info">Return</Button>
            </Link>
            <h1>
                {GLOBALS.GROUPS[group.level]} - {group.name} ({group.year})
            </h1>
            <div>Referent: {Util.formatUserName(group.referent)}</div>
            <div>
                Delegate: {group.delegates.map((student) => Util.formatUserName(student)).join(",")}
            </div>
            {isAdmin ? (
                <div className="mb-3">
                    <Link to="manageclass">
                        <Button variant="success">Manage class</Button>
                    </Link>
                </div>
            ) : null}
            <SetTable students={group?.students} isRef={isRef} />
        </Fragment>
    );
}

export default ClassView;
