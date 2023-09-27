import fs from 'node:fs/promises';
import fsc from 'node:fs';

fs.readFile('./data2.json', 'utf8')
  .then((data) => {
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log('Complete');
  })
  .then(() => readFile('data2.json'))
  .then((data) => console.log(data))
  .catch((err) => {
    console.log('Could not complete loading and parsing');
    throw err;
  });

// Create a custom promise with the callback API
const readFile = async (filename) => {
  return new Promise((resolve, reject) => {
    fsc.readFile('data2.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
