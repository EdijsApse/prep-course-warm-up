const path = require("path");
const fs = require("fs").promises;

const renameFiles = async (folderName) => {
  const files = await fs.readdir(folderName);
  let previousFileNumber = 0;
  for (const file of files) {
    const oldPath = path.join(__dirname, folderName, file);
    const fileNumber = file.match(/^\d+/);
    const newFileNumber =
      previousFileNumber < 10 ? `0${previousFileNumber}` : previousFileNumber;
    let newFileName = `${previousFileNumber}${file};`;
    if (fileNumber) {
      newFileName = file.replace(fileNumber[0], newFileNumber);
    }
    const newPath = path.join(__dirname, folderName, newFileName);
    await fs.rename(oldPath, newPath);
    console.log(`${file} renamed to ${newFileName}`);
    previousFileNumber += 1;
  }
};

renameFiles("src");
