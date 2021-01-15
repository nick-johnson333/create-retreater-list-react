import React from 'react';
import CSVReader from 'react-csv-reader';

interface Step2Props {
    functionLoadedCallback: (data: string[][]) => void;
};

const objectToStringArrayOfArrays = (original_data: any): string[][] => {
    var new_data: string[][] = [];
    original_data.forEach((row: any) => {
        var new_row: string[] = [];
        row.forEach((item: string) => {
            new_row.push(item);
        });
        new_data.push(new_row);
    })
    return new_data;
};

const Step2 = ({functionLoadedCallback}: Step2Props) => {

    const onCSVLoaded = (data: any, _: object) => {
        var retyped_data: string[][] = objectToStringArrayOfArrays(data);
        functionLoadedCallback(retyped_data);
    }
    return (
        <>
            <h2>CSV file upload</h2>
            <p>Please select the CSV file downloaded in the previous step that holds the Awakening applicant information.</p>
            <CSVReader onFileLoaded={onCSVLoaded} />
            <p>You will be able to continue once the file is uploaded.</p>
        </>
    )
};
//<input type="file" name="file" onChange={onFileChange}/>

export default Step2;