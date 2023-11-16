const rootPath = process.env.ROOT_DATA_PATH;
const fs = require('fs');
const fsPromises = fs.promises;

const Filesystem = function () { }

// creates a file at path which includes the filename with the data provided
Filesystem.prototype.createFile = async function (path, data) {
  try {
    await fsPromises.writeFile(`${rootPath}/${path}`, data);
    console.log(`Wrote data to ${path}`);
  } catch (error) {
    console.error(`Got an error trying to write the file: ${error.message}`);
    throw error;
  }
}

// reads the file at path which includes the filename and returns the data as a string
Filesystem.prototype.readFile = async function (path) {
  try {
    const data = await fsPromises.readFile(`${rootPath}/${path}`, 'utf8');
    return data;
  } catch (error) {
    console.error(`Got an error trying to write the file: ${error.message}`);
    throw error;
  }
}

// overwrites the file at path which includes the filename with the data provided
Filesystem.prototype.updateFile = async function (path, data) {
  try {
    // check if file exists
    try {
      const file = await fsPromises.open(`${rootPath}/${path}`)
      await file.close();
    } catch (error) {
      throw new Error("Given file doesn't exist");
    }
    // overwrite the data as of now, later better update methods can be implmented
    await fsPromises.writeFile(`${rootPath}/${path}`, data);
    console.log(`Wrote data to ${path}`);
  } catch (error) {
    console.error(`Got an error trying to update the file: ${error.message}`);
    throw error;
  }
}

// deletes the file at path which includes the filename
Filesystem.prototype.deleteFile = async function (path) {
  try {
    await fsPromises.unlink(`${rootPath}/${path}`);
    console.log("Deleted file " + path + " successfully");
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
    throw error;
  }
}

// renames the file at oldPath with newPath
Filesystem.prototype.renameFile = async function (oldPath, newPath) {
  try {
    await fsPromises.rename(oldPath, newPath);
    console.log(`Renamed file at ${oldPath} to ${newPath}`);
  } catch (error) {
    console.error(`Got an error trying to rename the file: ${error.message}`);
    throw error;
  }
}

// returns the file names of all files matching with the given pattern
Filesystem.prototype.getMatchingFiles = async function (path, pattern) {
  try {
    const files = await fsPromises.readdir(`${rootPath}/${path}`);
    const matchingFiles = files.filter(file => file.match(pattern));
    return matchingFiles;
  } catch (error) {
    console.error(`Got an error trying to read the dir: ${error.message}`);
    throw error;
  }
}

// returns the count of all file names matching with the given pattern
Filesystem.prototype.getMatchingFilesCount = async function (path, pattern) {
  try {
    const files = await fsPromises.readdir(`${rootPath}/${path}`);
    let count = 0;

    for (let file of files)
      if (file.match(pattern))
        count++;

    return count;
  } catch (error) {
    console.error(`Got an error trying to read the dir: ${error.message}`);
    throw error;
  }
}

// creates a directory of dirname in the given path
Filesystem.prototype.mkdir = async function (dirname) {
  try {
    // check if directory already exists, if it exists
    // then below await will resolve
    await fsPromises.access(`${rootPath}/${dirname}`);

    // since it exists, raise and exception
    let err = new Error("Directory already exists");
    err.name = "AlreadyExistsException";
    throw err;

  } catch (err) {
    // err could be of two reasons
    // 1. dir doesn't exist
    // 2. dir exists and custom raised exception
    if (err.name === "AlreadyExistsException")
      throw err;

    // else if dir doesn't exist, create a directory  
    try {
      await fsPromises.mkdir(`${rootPath}/${dirname}`, { recursive: true });
      return `${dirname} created successfully`
    } catch (err) {
      throw new Error(`${dirname} creation failed due to error:\n` + err.message);
    }
  }
}

// deletes the directory at given path
Filesystem.prototype.rmdir = async function (path) {
  try {
    await fsPromises.rmdir(`${rootPath}/${path}`);
    console.log("Deleted file " + path + " successfully");
  } catch (error) {
    console.error(`Got an error trying to remove the dir: ${error.message}`);
    throw error;
  }
}


module.exports = Filesystem