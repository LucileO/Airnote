import React, { Fragment, useEffect, useState } from "react";

function Home({ isLoggedIn }) {
    const [quote, setQuote] = useState({});

    useEffect(() => {
        fetch("https://zenquotes.io/api/random")
            .then((response) => response.json())
            .then((data) => setQuote(data[0]))
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            {isLoggedIn ? (
                <Fragment>
                    <div>
                        <p>
                            <i>{quote.q}</i>, <b>{quote.a}</b>
                        </p>
                    </div>
                    <div>
                        <h1>App Context</h1>
                        <center>
                            <p>
                                Currently an excel file is used to share grades with the students.
                                In order to modernize this process this web application has been
                                created. Single Sign On for students / teachers / the administration
                                is implemented to log in to the app and is redundant in terms of
                                failures.
                            </p>
                        </center>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <h1>Goal of the App</h1>
                    <center>
                        <p>
                            This app has been designed in order to help the administration of a
                            school to share grades with students and teacher.
                        </p>
                    </center>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
