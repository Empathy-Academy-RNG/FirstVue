//  MAP IMPLEMENTATION
Array.prototype.myMap = function(callbackFunction) {
  for (let i = 0; i < this.length; i++) {
    callbackFunction(this[i], i, this);
  }
};

//  TEST
const mapTestArray = [1, 2, 3, 4];
const doubledArray = mapTestArray.myMap(el => el * 2);
console.log(doubledArray);
