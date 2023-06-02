import React from "react";

// Custom component to render Badges
export const Badges = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
        <>
            {values.map((value, idx) => {
                return (
                    <span key={idx} className="badge">
                        {value}
                    </span>
                );
            })}
        </>
    );
};
