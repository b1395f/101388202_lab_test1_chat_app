const mixedArray = ["PIZZA", 10, true, 25, false, "Wings"];

function lowerCaseWords(mixedArr) {
    // return promise that is resolved or rejected
    return new Promise(function(resolve, reject) {
        //filter for string items in the inputted array and store it in a new array 
        const filterStr = mixedArr.filter((item) => {
            if (typeof item === "string") {
                return true;
            } else {
                return false;
            }
        });
        //check if the new array is empty otherwise change each str in array to lowercase
        if(filterStr.length > 0) {
            const lowerArr = filterStr.map(item => item.toLowerCase());
            resolve(lowerArr);
        } else if (filterStr.length === 0) {
            reject(new Error("No string values in mixed array to return"));
        }
    });
}

lowerCaseWords(mixedArray)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });