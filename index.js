import employees from './data.json' assert { type: 'json' };
import createPrompt from 'prompt-sync';
let prompt = createPrompt();

const logEmployee = (employee) => {
  Object.entries(employee).forEach((entry) => {
    console.log(`${entry[0]}: ${entry[1]}`);
  });
};

function getInput(promptText, validator, transformer) {
  let value = prompt(promptText);
  if (validator && !validator(value)) {
    console.error(`--Invalid input`);
    return getInput(promptText, validator, transformer);
  }
  if (transformer) {
    value = transformer(value);
  }
  return value;
}

// Validator functions -------------------------
const isStringInputValid = function (input) {
  return input ? true : false;
};
const isBooleanInputValid = function (input) {
  return input === 'yes' || input === 'no';
};

const isIntegerValid = (min, max) => {
  return (input) => {
    let numValue = Number(input);
    if (!Number.isInteger(numValue) || numValue < min || numValue > max) {
      return false;
    }
    return true;
  };
};
// Application commands ------------------------
function listEmployees() {
  console.log('Employee list --------------------');
  console.log('');

  employees.forEach((e) => {
    logEmployee(e);
    prompt('Press enter to continue...');
  });
  console.log('Employee list completed.');
}

function addEmployee() {
  console.log('Add employee ---------------------');
  console.log('');
  let employee = {};
  employee.firstName = getInput('First name: ', isStringInputValid);
  employee.lastName = getInput('Last name: ', isStringInputValid);
  let startDateYear = getInput(
    'Start date year (1990-2023): ',
    isIntegerValid(1990, 2023)
  );
  let startDateMonth = getInput('Start date month (1-12): ', isIntegerValid(1, 12));
  let startDateDay = getInput(
    'Employee start date day (1-31): ',
    isIntegerValid(1, 31)
  );
  employee.startDate = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );
  employee.isActive = getInput(
    'Is employee active (yes or no): ',
    isBooleanInputValid,
    (i) => (i === 'yes' ? true : false)
  );

  // Output Employee JSON
  const json = JSON.stringify(employee, null, 2);
  console.log(`Employee: ${json}`);
}

// Search for employee
function searchById() {
  const id = getInput('Employee ID: ', null, Number);
  const result = employees.find((e) => e.id === id);
  if (result) {
    console.log('');
    logEmployee(result);
  } else {
    console.log('Employee not found');
  }
}

// Search for employees by name
function searchByName() {
  const firstNameSearch = getInput('First name: ').toLowerCase();
  const lastNameSearch = getInput('Last name: ').toLowerCase();
  const results = employees.filter((e) => {
    if (
      firstNameSearch &&
      !e.firstName.toLowerCase().includes(firstNameSearch)
    ) {
      return false;
    }
    if (lastNameSearch && !e.lastName.toLowerCase().includes(lastNameSearch)) {
      return false;
    }
    return true;
  });
  results.forEach((e, index) => {
    console.log('');
    console.log(`Search result ${index + 1}-----------------------`);
    logEmployee(e);
  });
}
// Application execution -----------------------
const command = process.argv[2].toLowerCase();

switch (command) {
  case 'list':
    listEmployees();
    break;
  case 'add':
    addEmployee();
    break;
  case 'search-by-id':
    searchById();
    break;
  case 'search-by-name':
    searchByName();
    break;
  default:
    console.log('Unsupported command. Exiting...');
    process.exit(1);
}
