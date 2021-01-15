import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import "../App.css";

interface Step8Props {
    data_columns: string[],
    setGraduatingCallback: (value: number) => void;
    disableButtonCallback: () => void;
}

const Step8 = ({data_columns, setGraduatingCallback, disableButtonCallback}: Step8Props) => {
    const [selectedColumn, setSelectedColumn] = useState('');

    const handleChange = (event: any) => {
        let value = event.target.value;
        setSelectedColumn(value);

        if (value !== '') {
            setGraduatingCallback(value);
        } else {
            disableButtonCallback();
        }
    };

    return (
        <>
            <h2>Choose the "Are you graduating this semester" Column</h2>
            <p>
                Please select the column from your file that is an equivalent to "Are you graduating this semester" or holds applicants'
                graduating status in the file.
            </p>
            <p>
                If you can't find the column, please look back at the spreadsheet and find where the applicants' graduation status
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
export default Step8;