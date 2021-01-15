import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import "../App.css";

interface Step5Props {
    data_columns: string[],
    setLastNameCallback: (value: number) => void;
    disableButtonCallback: () => void;
}

const Step5 = ({data_columns, setLastNameCallback, disableButtonCallback}: Step5Props) => {
    const [selectedColumn, setSelectedColumn] = useState('');

    const handleChange = (event: any) => {
        let value = event.target.value;
        setSelectedColumn(value);

        if (value !== '') {
            setLastNameCallback(value);
        } else {
            disableButtonCallback();
        }
    };

    return (
        <>
            <h2>Choose the "Last Name" Column</h2>
            <p>
                Please select the column from your file that is an equivalent to "Last Name" or holds applicants'
                last names in the file.
            </p>
            <p>
                If you can't find the column, please look back at the spreadsheet and find where the applicants' last
                names are located.
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
export default Step5;