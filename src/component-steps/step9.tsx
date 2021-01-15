import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import "../App.css";

interface Step9Props {
    data_columns: string[],
    setClassYearCallback: (value: number) => void;
    disableButtonCallback: () => void;
}

const Step9 = ({data_columns, setClassYearCallback, disableButtonCallback}: Step9Props) => {
    const [selectedColumn, setSelectedColumn] = useState('');

    const handleChange = (event: any) => {
        let value = event.target.value;
        setSelectedColumn(value);

        if (value !== '') {
            setClassYearCallback(value);
        } else {
            disableButtonCallback();
        }
    };

    return (
        <>
            <h2>Choose the "What is your class year" Column</h2>
            <p>
                Please select the column from your file that is an equivalent to "What is your class year" or holds applicants'
                class year in the file.
            </p>
            <p>
                If you can't find the column, please look back at the spreadsheet and find where the applicants' class year
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
export default Step9;