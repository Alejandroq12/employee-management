import fs from 'node:fs/promises';

// Loading and writing data to the filesystem -----------------------------
export const loadData = async () => {
    console.log("Loading data...");
    try {
      const fileData = await fs.readFile('./data.json',);
      return JSON.parse(fileData);
    } catch(err) {
      console.error("Cannot load in employess");
      throw err;
    }
  }
  
  export const writeData = async (employees) => {
    console.log("Writing data...");
    try {
      await fs.writeFile('./data.json', JSON.stringify(employees, null, 2));
    } catch(err) {
      console.error("Cannot write employees data.");
      throw err;
    }
  }