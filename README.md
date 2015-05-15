# watch.js
watch.js 是一个用于对象监控的组件。无意中看到了当耐特写的一个关于对象监控的小组件，翻看了源码感觉不是我想要的，借用大神的思想自己实现的这个小玩意。[observejs](https://github.com/kmdjs/observejs)。

watch.js在observejs（2015年5月15日的版本）的基础上新增了部分功能，弥补部分缺失。
新增：
1.对象属性的新增和删除。


### 主要功能
能够对对象、数组、复杂对象进行属性变更监控。不过由于为了能监控到对象属性的新增和删除，对象字面量请使用$add和$del方法进行新增和删除。
回调带入三个参数，prop、oldValue、newValue，分别表示变更的属性名、旧值、新值。如果进行特殊操作比如数组的push、对象的删除之类，部分参数会为undefined.

### 简单演示

对象字面量
```javascript
var obj = {
	name: "rose",
	age: 18
};

watch(obj, function(prop, oldValue, newValue) {
	console.log(prop, oldValue, newValue);
});

console.log("** 直接修改对象属性 **");
obj.age = 20;

console.log(obj);
console.log("** 新增对象属性 **");
obj.$add("car", "BMW");

console.log("** 删除对象属性 **");
obj.$del("car");
```


纯数组
```javascript
var arr = [1, 2, 3, 4, 5];
watch(arr, function(prop, oldValue, newValue) {
	console.log(prop, oldValue, newValue);
});

arr[0] = 22;
arr.push(999);
```

深层对象
```javascript
var fObj = {
	son: {
		name: "jack",
		age: 20
	},
	son2: {
		name: "fucker",
		age: 17,
		grandSon: {
			name: "just",
			age: 2
		}
	}
}

watch(fObj, function(prop, oldValue, newValue) {
	console.log(prop, oldValue, newValue);
});

fObj.son2.grandSon.name = "newer";
```