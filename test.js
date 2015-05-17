// var obj = {
// 	name: "rose",
// 	age: 18
// };

// watch(obj, function(prop, oldValue, newValue) {
// 	console.log(prop, oldValue, newValue);
// });

// console.log("** 直接修改对象属性 **");
// obj.age = 20;

// console.log(obj);
// console.log("** 新增对象属性 **");
// obj.$add("car", "BMW");

// console.log("** 删除对象属性 **");
// obj.$del("car");



// 纯数组
// var arr = [1, 2, 3, 4, 5];
// watch(arr, function(prop, oldValue, newValue) {
// 	console.log(prop, oldValue, newValue);
// });

// arr[0] = 22;
// arr.splice(1, 1, 12);
// arr.pop();
// arr.push(999);
// console.log(arr);



// 深层对象
// var fObj = {
// 	son: {
// 		name: "jack",
// 		age: 20
// 	},
// 	son2: {
// 		name: "candy",
// 		age: 17,
// 		grandSon: {
// 			name: "just",
// 			age: 2
// 		}
// 	}
// }

// watch(fObj, function(prop, oldValue, newValue) {
// 	console.log(prop, oldValue, newValue);
// });

// fObj.son2.grandSon.name = "newer";
// fObj.son.name = "hi";

// 数组中的对象列表
var objArr = [{
	name: "first",
	age: 1
}, {
	name: "2rd",
	age: 2
}];

watch(objArr, function(prop, oldValue, newValue) {
	console.log(prop, oldValue, newValue);
});

objArr[0].name = "Im big";
objArr[1].age = 3;