const rootPath = process.env.ROOT_DATA_PATH;
const fs = require('fs');
const fsPromises = fs.promises;

const mkdir = async (dirname) => {
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
    if(err.name === "AlreadyExistsException")  
      throw err;

    // else if dir doesn't exist, create a directory  
    try {            
      await fsPromises.mkdir(`${rootPath}/${dirname}`);            
      return `${dirname} created successfully`
    } catch (err) {            
      throw new Error(`${dirname} creation failed due to error:\n` + err.message);
    }
  }
}

module.exports = { mkdir }