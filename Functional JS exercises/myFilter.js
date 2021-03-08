//  FILTER IMPLEMENTATION
Array.prototype.myFilter = function(callback) {
  const finalArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      finalArray.push(this[i]);
    }
  }
  return finalArray;
};

// TESTS
const filterTestArray = [1, 2, 3, 4];
const onlyEven = filterTestArray.myFilter(e => e % 2 == 0);
console.log(onlyEven);

const filterTestArray2 = ["a", "bbbb", "ccc", "ddddddd"];
const longerThanThreeChars = filterTestArray2.myFilter(e => e.length > 3);
console.log(longerThanThreeChars);
