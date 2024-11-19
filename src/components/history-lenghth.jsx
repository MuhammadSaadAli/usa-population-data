import React from "react";

const HistoryLength = ({ onChange }) => {
    return (
        <div style={{ margin: "20px 0" }}>
            <label htmlFor="history-length" style={{ marginRight: "10px" }}>
                Select History Length:
            </label>
            <select id="history-length" onChange={(e) => onChange(Number(e.target.value))}>
                <option value="3">Previous 3 years</option>
                <option value="5">Previous 5 years</option>
                <option value="10">Previous 10 years</option>
            </select>
        </div>
    );
};

export default HistoryLength;
