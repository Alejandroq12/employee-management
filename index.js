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
    process.exit(1);
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
const isStartYearValid = function (input) {
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1990 || numValue > 2023) {
    return false;
  }
  return true;
};

const isStartMonthValid = function (input) {
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1 || numValue > 12) {
    return false;
  }
  return true;
};

const isStartDayValid = function (input) {
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1 || numValue > 31) {
    return false;
  }
  return true;
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
    isStartYearValid
  );
  let startDateMonth = getInput('Start date month (1-12): ', isStartMonthValid);
  let startDateDay = getInput(
    'Employee start date day (1-31): ',
    isStartDayValid
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
