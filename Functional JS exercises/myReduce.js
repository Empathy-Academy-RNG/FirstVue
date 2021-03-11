//  REDUCE IMPLEMENTATION
Array.prototype.myReduce = function(reduceFunction, accumulator) {
  for (let item of this) {
    accumulator = reduceFunction(accumulator, item);
  }
  return accumulator;
};

//  TEST
const reduceTestArray = ["a,", "b", "c"];
const concatReduce = reduceTestArray.myReduce((acc, item) => acc + item, "");
console.log(concatReduce);

//  TESTS
const reduceTestArray2 = [1, 2, 3, 4, 5];
const sumReduce = reduceTestArray2.myReduce((acc, item) => acc + item, 0);
console.log(sumReduce);
