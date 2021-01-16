import React from 'react';
import "../App.css";

interface CSVVerificationStepProps {
    data_columns: string[]
};

const CSVVerificationStep = ({data_columns}: CSVVerificationStepProps) => {
    return (
        <>
            <h2>Verification of Data</h2>
            <ul id="verification-list">
                {data_columns.map((item, index) => {
                    return (<li key={index}>{item}</li>);
                })}
            </ul>
            <p>These are the column names I was able to read from the file from your csv file.
            </p>
            <p>
                If these are not correct, make sure the column names of your file are in the top row.
                You can check and fix this issue in Excel or Google Sheets and start over if there is an issue.
            </p>
            <h3>If these are correct, feel free to click next.</h3>
        </>
    )
};
export default CSVVerificationStep;