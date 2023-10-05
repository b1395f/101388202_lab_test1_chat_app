var fs = require('fs');
var path = require('path');

const logsDirectory = './Logs';

//create a Logs directory, if it does not exist
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
};
//change the current process to the new Logs directory
process.chdir(logsDirectory);


//create 10 log files and write some text into the file
for (let i = 0; i < 10; i++) {
    const fileName = `log${i}.txt`;
    const fileContent = `This is log file ${i} content.`;
    try {
        fs.writeFileSync(`${fileName}`, fileContent);
        //output the files names to console
        console.log(`${fileName}`);
    } catch (error) {
        console.error(`Error writing to file ${filePath}:`, error);
    };
};
