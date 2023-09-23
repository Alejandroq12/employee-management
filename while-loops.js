import employees from './data.json' assert { type: 'json' };

let i = 0;
while (employees[i]) {
  console.log(`Name: ${employees[i].firstName} ${employees[i].lastName}`);
  i++;
}

console.log('-----');

// Do while loop
i = 0;
do {
  console.log(`Name: ${employees[i].firstName} ${employees[i].lastName}`);
  i++;
} while (employees[i]);
