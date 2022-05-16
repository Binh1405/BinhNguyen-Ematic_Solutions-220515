import "csv-parser";
import "fs";
import "path";

const categories_pool = ["low-fi", "jazz", "string", "bossa", "rock", "r&b"];
const iteration = 5;
const interested_category_size = 2;

function randomSetNumbers({ start = 0, limit = 5 }, rounds) {
  const randomNumbers = [];
  for (let round = 0; round < rounds; round++) {
    let randomNumber = Math.floor(Math.random() * limit) + start; // [1 number from 0 - 4]
    while (randomNumbers.indexOf(randomNumber) !== -1)
      randomNumber = Math.floor(Math.random() * limit) + start;
    randomNumbers.push(randomNumber);
  }
  console.log("randomNumbers", randomNumbers);
  return randomNumbers; //array with random number from 0-4. length of array based on rounds
}

function dumpData(avalableEmails = []) {
  const users = [];
  for (let round = 0; round <= iteration; round++) {
    const randomIndexes = randomSetNumbers(
      { start: 0, limit: categories_pool.length },
      interested_category_size
    ); // array of 2 num from 0-5. ex: [0, 2], [3,5]
    users.push({
      email: avalableEmails[round],
      dataFields: {
        interested: [
          {
            categories: randomIndexes.map((index) => categories_pool[index]),
          },
        ],
      },
    });
  }
  console.log("users", users);
  return { users };
}
dumpData(["user1", "user2", "user3", "user4", "user5", "user6"]);

//Potential result is "userData" object with the number of users equal to availbleEmails array length
//For ex: userData = {
//users: [
//{user1: {email:"user1@..", dataFields: {interested: {categories: ["low-fi", "jazz"]}}}},
//{user2: {email:"user2@.." ,dataFields: {interested: categories: ["string", "bossa"]}}1]},
//..
//{user6: {email:"user6@..", dataFields: {interested: categories: ["bossa", "rock"]}}}}
//]
//}
