var _ = require('underscore')._;
//first,last,initial,rest: 数组的元素操作。
var nums = [5, 4, 3, 2, 1];
console.log(_.first(nums));
console.log(_.last(nums));
console.log(_.initial(nums,1));
console.log(_.rest(nums,1));

//indexOf,lastIndexOf,sortedIndex：取索引位置
console.log(_.indexOf([4, 2, 3, 4, 2], 4));
console.log(_.lastIndexOf([4, 2, 3, 4, 2], 4));
console.log(_.sortedIndex([10, 20, 30, 40, 50], 35));

console.log( ['127.0.0.1', '2015-10-14', 'info'].join('-'));