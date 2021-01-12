interface Applicant {
    id: number,
    first_name: string;
    last_name: string;
    gender: string;
    times_applied: number;
    is_graduating: boolean;
};

function pause(): void {
    const prompt = require('prompt-sync')();

    prompt('Press enter to continue');
}

function normalizeString(str: string): string {
    return str.toUpperCase().trim();
}

function CSVToArray( strData: string): string[][] {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    let strDelimiter: string  = ",";

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData: string[][] = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }


        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

function parseNumberOfTimesApplied(number_of_times_applied_string: string): number {
    let parsed = parseInt(number_of_times_applied_string);
    if (parsed === NaN) {
        alert('An answer in the "How many times have you applied" question was not a number. Please fix this.');
        return 1;
    }
    return parsed + 1;
}

function getCurrentYear(): number {
    return new Date().getFullYear();
}

function parseClassYear(class_year_string: string): number {
    let parsed = parseInt(class_year_string);
    if (parsed === NaN) {
        alert('An answer to the "What is your class year" question was not a number. Please fix this.');
        return getCurrentYear() + 10;
        // I return the current year plus 10 so if there is an error, the return won't affect an applicant's chances of being chosen.
    }
    return parsed;
}

function isApplicantGraduating(is_graduating_string: string, class_year_string: string): boolean {
    if (is_graduating_string.length === 0) {
        return false;
    }
    let first_letter = is_graduating_string.toUpperCase()[0];
    if ((first_letter === 'Y')||(first_letter === 'T')) {
        let class_year: number = parseClassYear(class_year_string);
        if (class_year <= (getCurrentYear() + 1)) { // If the applicant says they're graduating but their class year is not the current or next year, then they aren't really graduating.
            return true;
        } else {
            return false;
        }
    }
    if ((first_letter === 'N')||(first_letter === 'F')) {
        return false;
    }
    alert('You must make sure the "Are you graduating this semester" question has answers including ONLY "Yes" or "No"');
    return false;
}

function isApplicantInArray(applicant: Applicant, applicant_array:Applicant[]) {
    //console.log(applicant);
    //console.log(applicant_array);
    
    //if(applicant_array.length > 0) {
        //console.log(applicant.first_name === applicant_array[applicant_array.length - 1].first_name, applicant.last_name === applicant_array[applicant_array.length - 1].last_name);
        //console.log(applicant_array[applicant_array.length - 1].last_name, applicant.id);
    //}
    let return_value: boolean = false;
    applicant_array.forEach(existing_applicant => {
        if ((applicant.first_name === existing_applicant.first_name)&&(applicant.last_name === existing_applicant.last_name)) {
            return_value = true;
            //console.log(applicant.last_name);
        }
    });
    return return_value;
}

function CSVDataToListOfApplicants(data: string[][], 
                                    first_name_index:number,
                                    last_name_index: number, 
                                    gender_index: number, 
                                    times_applied_index: number, 
                                    graduating_index: number, 
                                    class_year_index: number): Applicant[] 
{
    var applicant_data: Applicant[] = [];
    let first_line: boolean = true;
    let csv_line_number: number = 0;
    data.forEach(applicant_array => {
        if (first_line) {
            first_line = false;
        } else {
            var applicant: Applicant = {
                id: csv_line_number,
                first_name: normalizeString(applicant_array[first_name_index]),
                last_name: normalizeString(applicant_array[last_name_index]),
                gender: normalizeString(applicant_array[gender_index]),
                times_applied: parseNumberOfTimesApplied(applicant_array[times_applied_index]),
                is_graduating: isApplicantGraduating(applicant_array[graduating_index], applicant_array[class_year_index]),
            }
            if (!isApplicantInArray(applicant, applicant_data)){
                applicant_data.push(applicant);
                //console.log('Added');
            }   
            //pause();
        }
        csv_line_number++;
    });
    return applicant_data;
}

function copyApplicant(applicant: Applicant): Applicant {
    var new_applicant: Applicant = {
        id: applicant.id,
        first_name: applicant.first_name,
        last_name: applicant.last_name,
        gender: applicant.gender,
        times_applied: applicant.times_applied,
        is_graduating: applicant.is_graduating
    };
    return new_applicant;
}

function duplicateApplicantsBasedOnTimesApplied(unduplicated_applicants: Applicant[]): Applicant[] {
    var duplicated_applicants: Applicant[] = [];
    unduplicated_applicants.forEach(applicant => {
        for(let i = 0; i < applicant.times_applied; i++) {
            duplicated_applicants.push(copyApplicant(applicant));
        }
    });
    return duplicated_applicants;
}

interface TwoArraysOfApplicants {
    mens_list: Applicant[],
    womens_list: Applicant[]
};

function parseGender(gender_string: string): string {
    // returns 'M' if a male, 'F' if a female, or '' if it can't be determined
    if (gender_string.length === 0) {
        return '';
    }
    let first_letter: string = gender_string.toUpperCase()[0];
    if (first_letter === 'M') {
        return 'M';
    }
    if (first_letter === 'F') {
        return 'F';
    }
    alert('An answer in the "Gender" question was not "Male" or "Female". Please fix this.');
    return '';
}

function splitListByGender(unsplit_list: Applicant[]): TwoArraysOfApplicants {
    var mens_list: Applicant[] = [];
    var womens_list: Applicant[] = [];

    unsplit_list.forEach(applicant => {
        let gender: string = parseGender(applicant.gender);

        if (gender === 'M') {
            mens_list.push(applicant);
        } else if (gender === 'F') {
            womens_list.push(applicant);
        }
    });
    return {
        mens_list: mens_list,
        womens_list: womens_list
    };
}

function randInt(min_inclusive: number, max_exclusive: number) {
    return Math.floor(Math.random() * (max_exclusive - min_inclusive)) + min_inclusive;
}

function removeApplicantById(id: number, applicants: Applicant[]): Applicant[] {
    var remaining_applicants: Applicant[] = [];

    applicants.forEach(applicant => {
        if (applicant.id !== id) {
            remaining_applicants.push(applicant);
        }
    });

    return remaining_applicants;
}

function createOrderedListOfApplicants(applicants: Applicant[], csv_data: string[][]): string[][] {
    var ordered_applicants: string[][] = [];
    
    while (applicants.length > 0) {
        // choose the next person to be added to the list
        let index: number = randInt(0,applicants.length);
        let selected_id: number = applicants[index].id;

        // add their csv data to the ordered list
        ordered_applicants.push(csv_data[selected_id]);

        //remove them from the list
        applicants = removeApplicantById(selected_id, applicants);
    }

    return ordered_applicants;
} 

const get_column_names = (csv_string: string): string[] => {
    return CSVToArray(csv_string)[0];

}

const process_list = (applicant_data_csv: string, // should be the full text of the csv
                        first_name_index: number, 
                        last_name_index: number, 
                        gender_index: number, 
                        times_applied_index: number, 
                        graduating_index: number, 
                        class_year_index: number): string[][][] => 
{
    // Split the applicant data into an array of array of strings
    var applicant_data: string[][] = CSVToArray(applicant_data_csv);
    
    // parse the csv array data into a list of Applicant objects
    var applicants: Applicant[] = CSVDataToListOfApplicants(applicant_data,
                                                            first_name_index,
                                                            last_name_index,
                                                            gender_index,
                                                            times_applied_index,
                                                            graduating_index,
                                                            class_year_index);

    // split the applicant between men and women
    var {mens_list, womens_list} = splitListByGender(applicants);

    // duplicate the applicants in the list based on the number of times applied
    var men_with_duplicates: Applicant[] = duplicateApplicantsBasedOnTimesApplied(mens_list);
    var women_with_duplicates: Applicant[] = duplicateApplicantsBasedOnTimesApplied(womens_list);

    men_with_duplicates.forEach(man => {
        console.log(man.first_name, man.last_name,man.times_applied);
    })

    var final_mens_list: string[][] = createOrderedListOfApplicants(men_with_duplicates, applicant_data);
    var final_womens_list: string[][] = createOrderedListOfApplicants(women_with_duplicates,applicant_data);

    return [final_mens_list, final_womens_list];
}

function print_selected(list: string[][]): void {
    const dividing_line: string = '=============================';

    console.log(dividing_line);
    list.forEach(item => {
        console.log(item[1] + ' ' + item[2]);
    });
    console.log('NUMBER: ' + list.length.toString());
    console.log(dividing_line);
}

function test_process_list(): void {
    var fs = require('fs');

    try {
        var data = fs.readFileSync('sample_applicants.csv', 'utf8');
        var [mens_list, womens_list] = process_list(data,1,2,3,14,13,12);
        print_selected(mens_list);
        print_selected(womens_list);
        console.log(mens_list);
    } catch(e) {
        console.log('Error:',e.stack);
    }
}

function test_get_column_names(): void {
    var fs = require('fs');

    try {
        var data = fs.readFileSync('sample_applicants.csv', 'utf8');
        var columns: string[] = get_column_names(data);
        console.log(columns);
    } catch(e) {
        console.log('Error:',e.stack);
    }
}

//test_process_list(); // comment this when done testing
//test_get_column_names(); // uncomment this to test
export default {process_list, get_column_names}; // uncomment this when done testing