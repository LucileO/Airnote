import React, { useEffect, useState } from "react";

import Loader from "../../render-components/Loader";
import {
    getGrades,
    getClassFromUser,
    getUser,
    editComment,
    getComment,
    addComment,
} from "../../../services/api";

import StudentTable from "./StudentTable";
import { Util } from "../../../services/Util";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function StudentGrades({ userId, userRole }) {
    const [grades, setGrades] = useState(null);
    const [group, setGroup] = useState(null);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState(null);
    if (userId == null) {
        const { id } = useParams();
        userId = id;
    }
    const isAdmin = userRole == "Administrator Referent";

    useEffect(() => {
        fetchGroup();
        fetchGrades();
        fetchUser();
    }, []);

    useEffect(() => {
        if (group) fetchComment();
    }, [group?.id]);

    const fetchComment = async () => {
        let comment = await getComment(userId, group.id);
        setComment(comment[0]);
    };

    const fetchUser = async () => {
        let user = await getUser(userId);
        setUser(user);
    };
    const fetchGroup = async () => {
        let group = await getClassFromUser(userId, true);
        setGroup(group[0]);
    };

    const fetchGrades = async () => {
        let grades = await getGrades(userId);
        setGrades(grades);
    };

    const handleSubmit = (event) => {
        if (comment == null) {
            addComment(event.target.value, userId, group.id);
        } else {
            editComment(comment.id, event.target.value, userId, group.id);
        }
    };

    const getTables = () => {
        return group.modules.map((module, i) => {
            let gradesData = module.courses.map((course) => {
                let courseGrade = grades.find(
                    (grade) => grade.course.id === course.id && grade.group.id === group.id,
                ) ?? { number: null, comment: null };
                return {
                    ...course,
                    number: courseGrade.number,
                    comment: courseGrade.comment,
                };
            });
            return (
                <>
                    {isAdmin ? (
                        <Link to={`/classes/${group.id}`}>
                            <Button variant="info">Return</Button>
                        </Link>
                    ) : null}
                    <div className="text-center">
                        <h1>{Util.formatUserName(user)}</h1>
                        <h6>
                            <i>{Util.groupToStr(group)}</i>
                        </h6>
                    </div>
                    <br />
                    <br />
                    <div className="">
                        <h5>General comment :</h5>
                        {isAdmin ? (
                            <Form.Control
                                as="textarea"
                                defaultValue={comment?.comment}
                                onBlur={handleSubmit}
                            />
                        ) : (
                            <p>{grades.comment}</p>
                        )}
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div key={i} className="mb-2 student">
                        <h2>Module: {module.title}</h2>
                        <StudentTable grades={gradesData} />
                    </div>
                </>
            );
        });
    };

    if (!grades || !group) return <Loader />;
    return getTables();
}

export default StudentGrades;
