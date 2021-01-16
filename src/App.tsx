import './App.css'
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  IntroductionStep,
  InstructionStep,
  CSVDownloadStep,
  CSVUploadStep,
  CSVVerificationStep,
  GetFirstNameStep,
  GetLastNameStep,
  GetGenderStep,
  GetTimesAppliedStep,
  GetGraduatingStep,
  GetClassYearStep,
  SelectionVerificationStep,
  ProcessAndDownloadStep,
} from './component-steps';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: any) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [  'Introduction', 
            'Instructions',
            'Download Applicant CSV file to your computer', 
            'Upload CSV File', 
            'Verify Information', 
            'Choose "First Name" Column', 
            'Choose "Last Name" Column', 
            'Choose "Gender" Column', 
            'Choose "Number of Times Applied" Column', 
            'Choose "Are You Graduating" Column', 
            'Choose "Class Year" Column',
            'Verification',
        ];
}





export default function App() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [CSVData, setCSVData] = useState([]);
    const [CSVColumns, setCSVColumns] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [firstNameIndex, setFirstNameIndex] = useState(-1);
    const [lastNameIndex, setLastNameIndex] = useState(-1);
    const [genderIndex, setGenderIndex] = useState(-1);
    const [timesAppliedIndex, setTimesAppliedIndex] = useState(-1);
    const [isGraduatingIndex, setIsGraduatingIndex] = useState(-1);
    const [classYearIndex, setClassYearIndex] = useState(-1);

    const handleNext = () => {
        const disableButtonSteps: number[] = [2,4,5,6,7,8,9];
        if (disableButtonSteps.includes(activeStep)) {
            setButtonDisabled(true);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    };

    const handleBack = () => {
        switch (activeStep) {
            case 4:
                if (CSVData.length === 0) {
                    setButtonDisabled(true);
                }
                break;
            case 6:
                if(firstNameIndex === -1) {
                    setButtonDisabled(true);
                }
                break;
            case 7:
                if(lastNameIndex === -1) {
                    setButtonDisabled(true);
                }
                break;
            case 8:
                if(genderIndex === -1) {
                    setButtonDisabled(true);
                }
                break;
            case 9:
                if(timesAppliedIndex === -1) {
                    setButtonDisabled(true);
                }
                break;
            case 10:
                if(isGraduatingIndex === -1) {
                    setButtonDisabled(true);
                }
                break;
            case 11:
                if(classYearIndex === -1) {
                    setButtonDisabled(true);
                }
                break;
            default:
                break;
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const loadCSVData = (data: string[][]): void => {
        setCSVData(data);
        setCSVColumns(data[0]);
        setButtonDisabled(false);
    };

    const setFirstNameIndexCallback = (first_name_index: number) => {
        setFirstNameIndex(first_name_index);
        setButtonDisabled(false);
    }

    const setLastNameIndexCallback = (last_name_index: number) => {
        setLastNameIndex(last_name_index);
        setButtonDisabled(false);
    } 

    const setGenderIndexCallback = (gender_index: number) => {
        setGenderIndex(gender_index);
        setButtonDisabled(false);
    } 

    const setTimesAppliedIndexCallback = (times_applied_index: number) => {
        setTimesAppliedIndex(times_applied_index);
        setButtonDisabled(false);
    } 

    const setGraduatingIndexCallback = (graduating_index: number) => {
      setIsGraduatingIndex(graduating_index);
      setButtonDisabled(false);
    } 

    const setClassYearIndexCallback = (class_year_index: number) => {
        setClassYearIndex(class_year_index);
        setButtonDisabled(false);
    } 

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <IntroductionStep/>;
            case 1:
                return <InstructionStep/>;
            case 2:
                return <CSVDownloadStep/>;
            case 3:
                return <CSVUploadStep functionLoadedCallback={loadCSVData}/>;
            case 4:
                return <CSVVerificationStep data_columns={CSVColumns}/>;
            case 5:
                return <GetFirstNameStep data_columns={CSVColumns} setFirstNameCallback={setFirstNameIndexCallback} disableButtonCallback={() => {setButtonDisabled(true);}}/>;
            case 6:
                return <GetLastNameStep data_columns={CSVColumns} setLastNameCallback={setLastNameIndexCallback} disableButtonCallback={() => {setButtonDisabled(true);}}/>;
            case 7:
                return <GetGenderStep data_columns={CSVColumns} setGenderCallback={setGenderIndexCallback} disableButtonCallback={() => {setButtonDisabled(true);}}/>;
            case 8:
                return <GetTimesAppliedStep data_columns={CSVColumns} setTimesAppliedCallback={setTimesAppliedIndexCallback} disableButtonCallback={() => {setButtonDisabled(true);}}/>;
            case 9:
                return <GetGraduatingStep data_columns={CSVColumns} setGraduatingCallback={setGraduatingIndexCallback} disableButtonCallback={() => {setButtonDisabled(true);}}/>;
            case 10:
                return <GetClassYearStep data_columns={CSVColumns} setClassYearCallback={setClassYearIndexCallback} disableButtonCallback={() => {setButtonDisabled(true);}}/>;
            case 11:
                return <SelectionVerificationStep resetCallback={handleReset} data_columns={CSVColumns} first_name_index={firstNameIndex} last_name_index={lastNameIndex} gender_index={genderIndex} times_applied_index={timesAppliedIndex} is_graduating_index={isGraduatingIndex} class_year_props={classYearIndex}/>;
            default:
                return 'Unknown step';
        }
    }

  return (
    <div className="App">
        <div className={classes.root}>
          <h1>Aggie Awakening List Creator</h1>
          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <ProcessAndDownloadStep data={CSVData} first_name_index={firstNameIndex} last_name_index={lastNameIndex} gender_index={genderIndex} times_applied_index={timesAppliedIndex} is_graduating_index={isGraduatingIndex} class_year_index={classYearIndex}/>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={buttonDisabled}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="source-code-link">
            <a href="https://github.com/nick-johnson333/create-retreater-list-react" >Source Code for App</a>
        </div>
    </div>
  );
}
