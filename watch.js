/****************************************************************
 * 		 对象监控
 * 		 @by raince
 *
 *
 *****************************************************************/
(function(window) {
	function watch(target, callback) {
		return new _watch(target, callback);
	}

	function _watch(target, callback) {
		this.target = target;
		this.callback = callback;
		this.observe(target);
	}
	_watch.prototype = {
		guard: function(target, prop) {
			var self = this;
			if (prop.substr(0, 2) == "__" || watch.isFunction(target[prop])) {
				return;
			}
			var currentValue = target["__" + prop] = target[prop];
			Object.defineProperty(target, prop, {
				get: function() {
					return this["__" + prop];
				},
				set: function(value) {
					self.onPropChangeHandle(prop, this["__" + prop], value);
					this["__" + prop] = value;


				},
				configurable: true
			});
			if (watch.isObject(target)) {
				this.addSet(target);
				this.addDel(target);
			}
			if (watch.isObject(target[prop]) || watch.isArray(target[prop])) {
				this.observe(target[prop]);
			}
			// if(watch.isArray(target[prop])) {
			// 	this.arrMock(target[prop]);
			// }
		},
		observe: function(target) {
			for (var prop in target) {
				if (target.hasOwnProperty(prop)) {
					this.guard(target, prop);
				}
			}
			if (watch.isArray(target)) {
				this.arrMock(target);
			}
		},
		arrMock: function(target) {
			var self = this;
			arrMethods.forEach(function(name) {
				target[name] = function() {
					Array.prototype[name].apply(this, arguments);
					self.observe(target);
					self.onPropChangeHandle(name, undefined, arguments.length ? arguments: undefined);
				}
			});
		},
		addSet: function(target) {
			var self = this;
			target["$add"] = function(key, value) {
				self.guard(target, key);
				target[key] = value;
			}
		},
		addDel: function(target) {
			var self = this;
			target["$del"] = function(key) {
				self.onPropChangeHandle(key, target[key]);
				delete(target[key]);
				delete(target["__" + key]);
			}
		},
		onPropChangeHandle: function(prop, oldValue, newValue) {
			this.callback(prop, oldValue, newValue);
		}
	}

	/**
	 * 工具函数
	 */
	function is(name) {
		var toString = Object.prototype.toString;
		return function(obj) {
			return toString.call(obj) === "[object " + name + "]";
		}
	}

	var isArr = ["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Array", "Object"];
	isArr.forEach(function(name) {
		watch["is" + name] = is(name);
	});

	var arrMethods = ["push", "unshift", "splice", "pop", "shift"];



	// 对外暴露为全局下的watch方法
	window.watch = watch;
})(this)