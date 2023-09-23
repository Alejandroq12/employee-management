import employees from './data.json' assert { type: 'json'}

let i = 0;
while(employess[i]) {
    console.log(`Name: ${employess[i].firstName} ${employess[i].lastName}`);
    i++;
}