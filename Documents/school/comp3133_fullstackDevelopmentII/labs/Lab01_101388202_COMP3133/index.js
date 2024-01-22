const { promisify } = require('util');

console.log('Week02 - FS and Streams Examples');
const fs = require('fs');
const csv = require('csv-parser');

console.log("Delete canada.txt and us.txt if existing...");
const fileDelete = ['canada.txt', 'usa.txt'];

const unlinkAsync = promisify(fs.unlink);

async function deleteFiles(filesArr) {
    for (const fileNm of filesArr) {
        console.log(`Checking ${fileNm} existence...`);
        try {
            if (await fs.existsSync(fileNm)) {
                await unlinkAsync(fileNm);
                console.log(`File ${fileNm} deleted.`);
            } else {
                console.log(`${fileNm} does not exist`);
            }
        } catch (err) {
            console.error(`Error deleting file ${fileNm}: ${err}`);
        }
    }
}

deleteFiles(fileDelete);


const filterCanada = (row) => {
    return row.country === 'Canada';
};

const filterUsa = (row) => {
    return row.country === 'United States';
};

const input_countries = fs.createReadStream('input_countries.csv', 'utf8');
const canadaTXT = fs.createWriteStream('canada.txt', { flags: 'w' }); // Change flags to 'w' if you want to overwrite
const usaTXT = fs.createWriteStream('usa.txt', { flags: 'w' }); // Change flags to 'w' if you want to overwrite

const csvStream = csv();
csvStream.on('data', (row) => {
    if (filterCanada(row)) {
        canadaTXT.write(`${row.country},${row.year},${row.population}\n`);
    }

    if (filterUsa(row)) {
        usaTXT.write(`${row.country},${row.year},${row.population}\n`);
    }
});

csvStream.on('end', () => {
    console.log('Filtering complete. Filtered data written to canada.txt and us.txt');
    canadaTXT.end();
    usaTXT.end();
});

input_countries.pipe(csvStream);