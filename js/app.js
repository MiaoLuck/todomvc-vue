(function (window, Vue) {
	/*1.准备数组
	  2，把数据添加到页面上
	  3,section和footer有两个区域是显示或不显示的
	  4,根据数组渲染列表
	  5，每一个li里面的input和lable不联动
		6,自定义属性
		directive获取光标
		7，添加一个todo
		只要向数组中添加一个数据就可以了
		content：input输入的内容
	  */
	// var arr = [
	// 	{
	// 		id: 1,
	// 		content:'a',
	// 		isFinish: true
	// 	},
	// 	{
	// 		id: 2,
	// 		content:'b',
	// 		isFinish: false
	// 	},
	// 	{
	// 		id: 3,
	// 		content:'c',
	// 		isFinish: true
	// 	},
	// 	{
	// 		id: 4,
	// 		content:'d',
	// 		isFinish: false
	// 	},
	// ]

	new Vue({
		el:'#app',
		data:{
			dataList: JSON.parse(window.localStorage.getItem('dataList')) || [],
			newTodo:''
		},
		methods: {
			//添加一条 todo
			addTodo() {
				//非空验证
				if (!this.newTodo.trim()) return
				// 组装一个对象出来
				this.dataList.push({
					content: this.newTodo.trim(),
					isFinish: false,
					id: this.dataList.length ? this.dataList.sort((a, b) => a.id - b.id)[this.dataList.length - 1]['id'] + 1 : 1
				})

				


				//清空文本框
				this.newTodo = ''
			},
			//删除一条todo
			delTodo(index) {
				this.dataList.splice(index,1)
			},
			//删除所有
			delAll() {
			this.dataList = this.dataList.filter(item => !item.isFinish)	
			}
		},
		//自定义属性
		directives: {
			focus: {
				inserted(el) {
					el.focus();
				}
			}
		},
		//监听
		watch: {
			dataList: {
				handler(newArr) {
					window.localStorage.setItem('dataList',JSON.stringify(newArr))
				},
				deep: true
			}
		},
		//计算属性
		computed: {
			activeNum() {
				return this.dataList.filter(item => !item.isFinish).length
			},
			toggleAll: {
				get() {
					return this.dataList.every(item => item.isFinish)
				},
				set(val) {
					this.dataList.forEach(item => item.isFinish = val)
				}
			}
		}
	});
})(window,Vue);
