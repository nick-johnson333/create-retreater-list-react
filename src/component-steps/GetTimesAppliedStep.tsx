import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import "../App.css";

interface GetTimesAppliedStepProps {
    data_columns: string[],
    setTimesAppliedCallback: (value: number) => void;
    disableButtonCallback: () => void;
}

const GetTimesAppliedStep = ({data_columns, setTimesAppliedCallback, disableButtonCallback}: GetTimesAppliedStepProps) => {
    const [selectedColumn, setSelectedColumn] = useState('');

    const handleChange = (event: any) => {
        let value = event.target.value;
        setSelectedColumn(value);

        if (value !== '') {
            setTimesAppliedCallback(value);
        } else {
            disableButtonCallback();
        }
    };

    return (
        <>
            <h2>Choose the "How many Times have you Applied" Column</h2>
            <p>
                Please select the column from your file that is an equivalent to "How many times have you applied" or holds applicants'
                number of times applied in the file.
            </p>
            <p>
                If you can't find the column, please look back at the spreadsheet and find where the applicants' times applied
                are located.
            </p>
            <div className="select-box">
                <Select
                    native
                    value={selectedColumn}
                    onChange={handleChange}
                >
                    <option aria-label="None" value="" />
                    {data_columns.map((item, index) => {
                        return (<option key={index} value={index}>{item}</option>)
                    })}
                </Select>
            </div>
            <h3>
                Once you've chosen the correct column, please press next.
            </h3>
        </>
    )
};
export default GetTimesAppliedStep;