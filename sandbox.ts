const cls = {
	colors: ['red', 'blue', 'green', 'yellow'],
	pop() {
		return this.colors.pop();
	},
	shift() {
		return this.colors.shift();
	},
	push(c: string) {
		this.colors = [...this.colors, c];
	},
	unshift(c: string) {
		this.colors = [c, ...this.colors];
	},
	show() {
		console.log(this.colors);
	},
};

console.log(cls.pop());
console.log(cls.shift());
cls.show();
