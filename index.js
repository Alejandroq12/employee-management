import createPrompt from 'prompt-sync';
let prompt = createPrompt();

let employee = {};

let firstName = prompt('First name: ');

if (!firstName) {
  console.error(`Invalid first name`);
  process.exit(1);
}
employee.firstName = firstName;