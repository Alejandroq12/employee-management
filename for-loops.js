// Array of Data
const names = ['Julio', 'Alejandro', 'Roberto', 'Artero'];

for (let i = 0; i < names.length; i++) {
  console.log(`Name: ${names[i]}`);
}

console.log('-----');

// Using a for...of loop
for (let name of names) {
  console.log(`Names: ${name}`);
}

// Array o complex objects
import employees from './data.json' assert { type: 'json' };

const employee = employee[0];
