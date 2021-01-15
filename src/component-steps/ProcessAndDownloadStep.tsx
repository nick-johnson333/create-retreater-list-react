import React from 'react';
import {process_list_from_array} from '../process-list/process_list';
import {CSVLink} from 'react-csv';

interface ProcessAndDownloadStepProps {
    data: string[][],
    first_name_index: number,
    last_name_index: number,
    gender_index: number,
    times_applied_index: number,
    is_graduating_index: number,
    class_year_index: number,
};

const ProcessAndDownloadStep = ({
    data,
    first_name_index,
    last_name_index,
    gender_index,
    times_applied_index,
    is_graduating_index,
    class_year_index,
}: ProcessAndDownloadStepProps) => {

    const both_lists: string[][][] = process_list_from_array(data,first_name_index,last_name_index,gender_index,times_applied_index,is_graduating_index,class_year_index);

    const column_names = data[0];
    var mens_list: string[][] = both_lists[0];
    var womens_list: string[][] = both_lists[1];
    mens_list.unshift(column_names);
    womens_list.unshift(column_names);
    return (
        <>
            <h2>Awakening List Download</h2>
            <p>
                The Mens and Womens lists should be available to download through the below links.
                On my honor as an Aggie Catholic, it's not a virus.
            </p>
            <p><b>***Important: You have to click both separately to download both lists***</b></p>
            <CSVLink data={mens_list} filename="mens_list.csv" target="_blank">Click to Download Men's List</CSVLink>
            <div/>
            <CSVLink data={womens_list} filename="womens_list.csv" target="_blank">Click to Download Women's List</CSVLink>
            <p>
                I hope this was an easy thing to do and I hope you have a great Awakening!
            </p>
            <h3>
                Press Reset if you want to redo the process for whatever reason. Otherwise, feel free to close the website if the downloads are complete.
            </h3>
        </>
    );
}

export default ProcessAndDownloadStep;
