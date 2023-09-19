import createPrompt from 'prompt-sync';
let prompt = createPrompt();

let employee = {};

let firstName = prompt('First name: ');

if (!firstName) {
  console.error(`Invalid first name`);
  process.exit(1);
}
employee.firstName = firstName;

let lastName = prompt('Last name: ');
if (!lastName) {
  console.error(`Invalid last name`);
  process.exit(1);
}

employee.lastName = lastName;

let startDateYear = prompt('Employee Start Year (1990-2023): ');
startDateyear = Number(startDateYear);
// Check if it is a valid integer
if (!Number.isInteger(startDateYear)) {
  console.error(`Enter a valid start date year`);
  process.exit(1);
}
// Check if the number is in the range
if (startDateYear < 1990 || startDateYear > 2023) {
  console.error(`Enter a start date year within the correct range`);
  process.exit(1);
}

let startDateMonth = prompt('Employee Start Date Month (1-12): ');
startDateMonth = Number(startDateMonth);
// Check if it is a valid integer
if (!Number.isInteger(startDateMonth)) {
  console.error(`Enter a valid start date month`);
  process.exit(1);
}
