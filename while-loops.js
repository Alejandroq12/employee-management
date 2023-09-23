import employees from './data.json' assert { type: 'json'}

let i = 0;
while(employess[i]) {
    console.log(`Name: ${employees[i].firstName} ${employees[i].lastName}`);
    i++;
}