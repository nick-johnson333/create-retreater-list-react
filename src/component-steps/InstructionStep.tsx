import React from 'react';
import "../App.css";

const InstructionStep = () => {

    return (
        <>
            <h2>Instructions</h2>
            <p><b>***Important: Please read these instructions thoroughly as they will tell
                you exactly what to do throughout this process and why.***</b></p>
            <p>
                This program will allow you to input Aggie Awakening applications and you will be given 
                the mens and womens list of those selected to go on the retreat. The retreaters will be
                chosen semi-randomly with an influence from how many times an applicant has applied and 
                whether they are graduating.
            </p>
            <ol id="instruction-list">
                <li>
                    You will first be asked to download and then upload to this website the spreadsheet containing
                    the applications, in CSV form (the next step will show you how).
                </li>
                <li>
                    Then, in order to be able to read the spreadsheet, the program will need to know which column holds
                    various pieces of information. The program can't automatically know which column contains the first name, last name, gender,
                    or any other. Thus, you will be asked to tell the program which column name corresponds to that piece of 
                    information. This may seem redundant, but is necessary in order to make sure the program knows which column holds
                    which data. Please make sure to choose the correct columns.
                </li>
                <li>
                    From there, you should make sure the information inputted throughout is correct and you will then be given
                    two CSV files to download that hold the mens and womens retreater lists.
                </li>

            </ol>
            <p>
                 
                </p>
            <h3>
                Press the Next button if you understand.
            </h3>
        </>
    );
}

export default InstructionStep;
