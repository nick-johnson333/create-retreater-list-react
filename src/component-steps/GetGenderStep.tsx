import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import "../App.css";

interface GetGenderStepProps {
    data_columns: string[],
    setGenderCallback: (value: number) => void;
    disableButtonCallback: () => void;
}

const GetGenderStep = ({data_columns, setGenderCallback, disableButtonCallback}: GetGenderStepProps) => {
    const [selectedColumn, setSelectedColumn] = useState('');

    const handleChange = (event: any) => {
        let value = event.target.value;
        setSelectedColumn(value);

        if (value !== '') {
            setGenderCallback(value);
        } else {
            disableButtonCallback();
        }
    };

    return (
        <>
            <h2>Choose the "Gender" Column</h2>
            <p>
                Please select the column from your file that is an equivalent to "Gender" or holds applicants'
                genders in the file.
            </p>
            <p>
                If you can't find the column, please look back at the spreadsheet and find where the applicants' genders
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
export default GetGenderStep;