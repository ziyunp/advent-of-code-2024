const fs = require("fs");
const isNumOrComma = (s) => (s >= "0" && s <= "9") || s === ",";

const getNumsToMultiply = (i, fileContent) => {
  if (
    i >= 3 &&
    fileContent[i - 3] === "m" &&
    fileContent[i - 2] === "u" &&
    fileContent[i - 1] === "l"
  ) {
    // find )
    let ptr = i + 1;
    let isCandidate = true;
    while (fileContent[ptr] !== ")" && ptr < fileContent.length) {
      if (!isNumOrComma(fileContent[ptr])) {
        isCandidate = false;
      }
      ptr++;
    }
    if (fileContent[ptr] === ")" && isCandidate) {
      const str = fileContent.substring(i + 1, ptr);
      const nums = str.split(",");
      const lNum = parseInt(nums[0]);
      const rNum = parseInt(nums[1]);

      // valid
      if (!isNaN(lNum) && !isNaN(rNum)) {
        return { lNum, rNum, end: ptr };
      }
    }
  }
};
function part1(input) {
  fs.readFile(input, (err, data) => {
    if (err) throw err;
    const fileContent = data.toString();
    let sum = 0;

    // if encounter ( and i >= 3 -> check is m, u, l
    // find ) -> get string in between, split at ','
    // if left is num, right is num, multiply

    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i] === "(") {
        const nums = getNumsToMultiply(i, fileContent);
        if (nums !== undefined) {
          const { lNum, rNum, end } = nums;
          sum += lNum * rNum;
          // move from ptr onwards
          i = end + 1;
        }
      }
    }
    console.log(sum);
  });
}

function part2(input) {
  fs.readFile(input, (err, data) => {
    if (err) throw err;
    const fileContent = data.toString();
    let sum = 0;
    let enabled = true;

    // if encounter ( and stack length >= 3 -> check is m, u, l
    // find ) -> get string in between, split at ','
    // if left is num, right is num, multiply

    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i] === "(" && enabled) {
        // [m,u,l]
        const nums = getNumsToMultiply(i, fileContent);
        if (nums !== undefined) {
          const { lNum, rNum, end } = nums;
          sum += lNum * rNum;
          // move from ptr onwards
          i = end + 1;
        }
      }
      if (fileContent[i] === ")") {
        if (
          i >= 3 &&
          fileContent[i - 3] === "d" &&
          fileContent[i - 2] === "o" &&
          fileContent[i - 1] === "("
        ) {
          enabled = true;
        }

        if (
          i >= 6 &&
          fileContent[i - 6] === "d" &&
          fileContent[i - 5] === "o" &&
          fileContent[i - 4] === "n" &&
          fileContent[i - 3] === "'" &&
          fileContent[i - 2] === "t" &&
          fileContent[i - 1] === "("
        ) {
          enabled = false;
        }
      }
    }
    console.log(sum);
  });
}

part2("./advent3-input.txt");
