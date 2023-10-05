var fs = require('fs');
var path = require('path');

const logsDirectory = './Logs';

//remove all the files from the Logs directory, if exists
if(fs.existsSync(logsDirectory)) {
    const filesToDelete = fs.readdirSync(logsDirectory);
    filesToDelete.forEach((file) => {
        //output the file names to delete
        console.log(`deletes files... ${file}`);
    });
    filesToDelete.forEach((file) => {
        const filePath = path.join(logsDirectory, file);
        fs.unlinkSync(filePath);
    });
    //remove the Logs directory
    fs.rmdirSync(logsDirectory);
    console.log(`Removed directory: ${logsDirectory}`);
};