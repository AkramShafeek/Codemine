const Filesystem = require("../../filesystem/filesystem");

// empty function constructor as of now
function Question(question) {
  this.title = question.title;
  this.desc = question.desc;
  this.inputFormat = question.inputFormat;
  this.outputFormat = question.outputFormat;
  this.constraints = question.constraints;
  // this.sampleTestCases = question.sampleTestCases;
  this.testCases = question.testCases;
}

// inheriting filesystem through prototypal inheritance
Question.prototype = Object.create(Filesystem.prototype);
Question.prototype.constructor = Question;

Question.prototype.save = async function () {
  if (!this.title)
    throw new Error("Question name not provided");
  if (!this.desc)
    throw new Error("Question description not provided");

  // create a directory to store the question files
  await this.mkdir(this.title);
  // create question description file
  await this.createFile(`${this.title}/desc.txt`, this.desc);
  // create input format file
  await this.createFile(`${this.title}/inputFormat.txt`, this.inputFormat);
  // create output format file
  await this.createFile(`${this.title}/outputFormat.txt`, this.outputFormat);
  // create constraints file
  await this.createFile(`${this.title}/constraints.txt`, this.constraints);

  // create all test cases
  for (let i in this.testCases)
    await this.createFile(`${this.title}/test case ${i}.txt`, this.testCases[i]);

  console.log("Question created successfully");
}

Question.prototype.read = async function () {
  if (!this.title)
    throw new Error("Question name not provided");

  const desc = await this.readFile(`${this.title}/desc.txt`);
  const constraints = await this.readFile(`${this.title}/constraints.txt`);

  // init an array to store all test cases
  const testCases = [];
  // get all the file names matching test case
  const matchingFiles = await this.getMatchingFiles(this.title, "test case");  
  
  // iterate and read all test case files
  for (let i in matchingFiles)
    testCases[i] = await this.readFile(`${this.title}/${matchingFiles[i]}`);

  // create a question object and return
  const question = {
    title: this.title,
    desc,
    constraints,    
    testCases
  }

  return question;
}

Question.prototype.delete = async function () {
  if (!this.title)
    throw new Error("Question name not provided");

  await this.deleteFile(`${this.title}/desc.txt`);
  await this.deleteFile(`${this.title}/inputFormat.txt`);
  await this.deleteFile(`${this.title}/outputFormat.txt`);
  await this.deleteFile(`${this.title}/constraints.txt`);
    
  // get all the file names matching test case
  const matchingFiles = await this.getMatchingFiles(this.title, "test case");  
  
  // iterate and delete all test case files
  for (let file of matchingFiles)
    await this.deleteFile(`${this.title}/${file}`);

  await this.rmdir(this.title);
}

Question.prototype.update = async function () {
  if (!this.title)
    throw new Error("Question name not provided");
  if (!this.desc)
    throw new Error("Question description not provided");
  
  // if any parameters are given, update it
  if(this.desc)
    await this.updateFile(`${this.title}/desc.txt`, this.desc);
  if(this.inputFormat)
    await this.updateFile(`${this.title}/inputFormat.txt`, this.inputFormat);
  if(this.outputFormat)
    await this.updateFile(`${this.title}/outputFormat.txt`, this.outputFormat);
  if(this.constraints)
    await this.updateFile(`${this.title}/constraints.txt`, this.constraints);
}



// ------------------- TEST CASES RELATED -------------------------

Question.prototype.addTestCases = async function () {  
  const filesCount = await this.getMatchingFilesCount(this.title, "test case");
  
  for(let i in this.testCases)
    await this.createFile(`${this.title}/test case ${Number(i) + Number(filesCount)}.txt`, this.testCases[i]);

  console.log("Test cases added successfully");
}

Question.prototype.updateTestCase = async function(testCaseNo, data) {
  await this.updateFile(`${this.title}/test case ${testCaseNo}.txt`, data);
}

Question.prototype.deleteTestCase = async function(testCaseNos) {
  // expects an array of testCaseNos to be deleted
  
  // delete all the given test case files
  for(let testCaseNo in testCaseNos)
    await this.deleteFile(`${this.title}/${testCaseNo}`);

  // get all the file names matching test case
  const matchingFiles = await this.getMatchingFiles(this.title, "test case");  
    
  // rename all the files matching with test case from 0 to n - 1
  for (let i in matchingFiles)
    await this.renameFile(`${this.title}/${file}`, `${this.title}/test case ${i}.txt`);

}


module.exports = Question;



// the tricky part is to implement deleting test cases
// the expected data format is:
/**
 *  data = {
 *    testCases: [tc0, tc1, tc2 ...],
 *    deletedIndices: [3,5,6];
 *   }
 */
// remove the respective indices and then rename all the files from 0 to n-1