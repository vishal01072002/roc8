const xlsx = require('xlsx');
const path = require('path');

exports.excelReader = () => {
    // Load Excel file and convert to JSON
    const newPath = path.join(__dirname,"../")
    const filePath =  path.resolve(newPath, 'Assignment_Data.xlsx');
    const workbook =  xlsx.readFile(filePath);
    const sheetName =  workbook.SheetNames[0]; // Get the first sheet
    const jsonData =  xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // console.log();
    return jsonData;
}