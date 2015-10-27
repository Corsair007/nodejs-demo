var _ = require("underscore")._;
_.each([12,24,36], function(ele, idx){
   console.log(idx + ":" + ele);
});

console.log(
    _.map([3,4,5], function(num){
        return num*3;
    })//对于map集合会产生一个新的数组
);

console.log(
    _.reduce([3,4,5], function(memo, num){
        return memo+num;
    })
);

console.log(
    _.filter([3,4,5,6,7,8,9,10], function(num){
        return num%2==0;
    })
);

console.log(
    _.find([3,4,5,6,7,8,9,10], function(num){
        return num%2==0;
    })
);

console.log(
    _.reject([3,4,5,6,7,8,9,10], function(num){
        return num%2==0;
    })
);

var list = [
    {title:"AAA",year: 1982},
    {title:"BBB",year: 1900},
    {title:"CCC",year: 1982}
];
console.log(
    _.where(list,{year: 1982})
);

console.log(
    _.contains([1,3,4], 3)
);

console.log(
    _.invoke([[5, 1, 7]], 'sort')
);

var users = [
    {name: 'moe', age: 40},
    {name: 'larry', age: 50}
];
console.log(
    _.pluck(users, 'name')
);

console.log(
    _.max(users, function (stooge) {
        return stooge.age;
    })
);
//=> { name: 'larry', age: 50 }

var numbers = [10, 5, 100, 2, 1000];
console.log(
    _.min(numbers)
);
//=> 2

console.log(
    _.sortBy([3, 4, 2, 1 , 6], function (num) {
        return Math.max(num);
    })
);

//groupBy: 把一个集合分组成多个集合

console.log(
    _.groupBy(['one', 'two', 'three'], 'length')
);
//=> { '3': [ 'one', 'two' ], '5': [ 'three' ] }
//countBy: 把一个数据分组后计数

console.log(
    _.countBy([1, 2, 3, 4, 5], function (num) {
        return num % 2 == 0 ? 'even' : 'odd';
    })
);
//=> { odd: 3, even: 2 }
//shuffle: 随机打乱一个数据

console.log(
    _.shuffle([1, 2, 3, 4, 5, 6])
);
//=> [ 1, 5, 2, 3, 6, 4 ]
//toArray: 将list转换成一个数组

console.log(
    (function () {
        return _.toArray(arguments).slice(1);
    })(1, 2, 3, 4)
);
//=> [ 2, 3, 4 ]

//size: 得到list中元素个数

console.log(
    _.size({one: 1, two: 2, three: 3})
);