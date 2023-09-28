import fs from 'node:fs/promises';

// async function loadData() {
//   try {
//     const data = await fs.readFile('./data2.json', 'utf8');
//     console.log('File read 1');
//     await fs.readFile('./data2.json', 'utf8');
//     console.log('File read 2');
//     await fs.readFile('./data2.json', 'utf8');
//     console.log('File read 3');
//     const dataObj = JSON.parse(data);
//     console.log(dataObj);
//     console.log('Complete');
//   } catch(error) {
//     console.log('Could not load and parse file');
//     throw error;
//   }
// }

// loadData().then(() => console.log('Promise completed'));

try {
  const data = await fs.readFile('./data2.json', 'utf8');
  console.log('File read 1');
  await fs.readFile('./data2.json', 'utf8');
  console.log('File read 2');
  await fs.readFile('./data2.json', 'utf8');
  console.log('File read 3');
  const dataObj = JSON.parse(data);
  console.log(dataObj);
  console.log('Complete');
} catch(error) {
  console.log('Could not load and parse file');
  throw error;
}
