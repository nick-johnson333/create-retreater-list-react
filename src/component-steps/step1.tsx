import React from 'react';
import DownloadImage0 from './csv-download-images/download-0.png';
import DownloadImage1 from './csv-download-images/download-1.png';
import "../App.css";


const Step1 = () => {
    
    return (
        <>
            <h2>How to download the applicant data onto your computer</h2>
            <p>***Note: The below directions are only to download the applications from Google sheets.
                If the sign up form goes somewhere else, you'll have to figure out how to get the information
                into CSV form, as this is required for the program.
            </p>
            <h3>First, open the google sheets file of the applicant responses</h3>
            <img src={DownloadImage0} alt="CSV Download Instruction 1" className="image"></img>

            <h3>Then, navigate to File -{'>'} Download -{'>'} Comma-separated values (.csv) and download the spreadsheet.</h3>
            <img src={DownloadImage1} alt="CSV Download Instruction 2" className="image"></img>

            <h3>If you have the spreadsheet downloaded on your computer as as CSV file, press Next to continue</h3>
        </>
    )
};
export default Step1;