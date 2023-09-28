import fs from 'node:fs/promises';

async function loadData() {
  try {
    const data = await fs.readFile('./data2.json', 'utf8');
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log('Complete');
  } catch {}
}

loadData().then(() => console.log('Promise completed'));
