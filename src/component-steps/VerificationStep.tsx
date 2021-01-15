import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import "../App.css";

interface VerificationStepProps {
    data_columns: string[],
    first_name_index: number,
    last_name_index: number,
    gender_index: number,
    times_applied_index: number,
    is_graduating_index: number,
    class_year_props: number,
    resetCallback: () => void,
};

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const VerificationTable = ({data_columns, 
                            first_name_index, 
                            last_name_index, 
                            gender_index, 
                            times_applied_index, 
                            is_graduating_index, 
                            class_year_props}: VerificationStepProps) => {
    
    const classes = useStyles();
    
    return (
        <TableContainer component={Paper} id="column-verification-table">
            <Table className={classes.table} aria-label="column verification table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Column I Need</b></TableCell>
                        <TableCell><b>Column You Chose</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="first-name-row">
                        <TableCell>First Name</TableCell>
                        <TableCell>{data_columns[first_name_index]}</TableCell>
                    </TableRow>
                    <TableRow key="last-name-row">
                        <TableCell>Last Name</TableCell>
                        <TableCell>{data_columns[last_name_index]}</TableCell>
                    </TableRow>
                    <TableRow key="gender-row">
                        <TableCell>Gender</TableCell>
                        <TableCell>{data_columns[gender_index]}</TableCell>
                    </TableRow>
                    <TableRow key="times-applied-row">
                        <TableCell>Number of Times Applied</TableCell>
                        <TableCell>{data_columns[times_applied_index]}</TableCell>
                    </TableRow>
                    <TableRow key="graduating-row">
                        <TableCell>Is the Applicant Graduating</TableCell>
                        <TableCell>{data_columns[is_graduating_index]}</TableCell>
                    </TableRow>
                    <TableRow key="class-year-row">
                        <TableCell>Class Year</TableCell>
                        <TableCell>{data_columns[class_year_props]}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
    
}

const VerificationStep = (props: VerificationStepProps) => {

    const [openAlert, setOpenAlert] = useState(false);

    const handleReset = props.resetCallback;
    if ((props.first_name_index === -1) ||
        (props.last_name_index === -1) ||
        (props.gender_index === -1) ||
        (props.times_applied_index === -1) ||
        (props.is_graduating_index === -1) ||
        (props.class_year_props === -1)) {
            setOpenAlert(true);
        }
    return (
        <>
            <Modal
                open={openAlert}
                onClose={() => {handleReset();}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <>
                        <h3>Alert</h3>
                        <p>
                            Some error occured and you have to restart the process
                            If the issue continues, feel free to contact Nick Johnson (hi, I made this) at nickmj1999@gmail.com.
                        </p>
                    </>
            </Modal>
            <h2>Verification of Chosen Columns</h2>
            <p>
                These are the desired columns I need as well as the name of the columns you said hold this info.
            </p>
            <p>
                If these are not correct, please restart and choose the correct columns.
            </p>
            <VerificationTable {...props}/>
            <h3>If these are correct, feel free to click Finish.</h3>
        </>
    )
};
export default VerificationStep;