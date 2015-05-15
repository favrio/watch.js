# watch.js
watch.js 是一个用于对象监控的组件。无意中看到了当耐特写的一个关于对象监控的小组件，翻看了源码感觉不是我想要的，借用大神的思想自己实现的这个小玩意。[observejs](https://github.com/kmdjs/observejs)。

watch.js在observejs（2015年5月15日的版本）的基础上新增了部分功能，弥补部分缺失。
新增：
1.对象属性的新增和删除。


### 主要功能介绍
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