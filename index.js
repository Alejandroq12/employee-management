import employees from './data.json' assert { type: 'json' };
import createPrompt from 'prompt-sync';
let prompt = createPrompt();

function getInput(promptText, validator, transformer) {
  let value = prompt(promptText);
  if (validator && !validator(value)) {
    console.error(`--Invalid input`);
    process.exit(1);
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
  for (let emp of employees) {
    for (let property in emp) {
      console.log(`${property}: ${emp[property]}`);
    }
    console.log('');
    prompt('Press enter to continue...');
  }
  console.log(`Employee list completed`);
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
    isBooleanInputValid
  );

  // Output Employee JSON
  const json = JSON.stringify(employee, null, 2);
  console.log(`Employee: ${json}`);
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
  default:
    console.log('Unsupported command. Exiting...');
    process.exit(1);
}
