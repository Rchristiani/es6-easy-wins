#Talk layout


- let
```
for(var i = 0; i < 10; i++) {
  console.log(i);
}
// 10
console.log('After:', i);
```

```
for(let i = 0; i < 15; i++) {
  console.log(i);
}
// i undefined
console.log('After:', i);
```
- const
```
const config = 'Configure'
config = 'New String' //Silent error
console.log(config); //Configure
```
- Template Strings
```
var data = {
	name: "Ryan Christiani",
	age: 29,
	location: 'Toronto, ON'
}
var string = 'Hi my name is ' + data.name + ' and I am ' + data.age + ' and I live in ' + data.location;
console.log(string);
//"Hi my name is Ryan Christiani and I am 29 and I live in Toronto, ON"  	 		 
```

```
var data = {
	name: "Ryan Christiani",
	age: 29,
	location: 'Toronto, ON'
}
var string = `Hi my name is ${data.name} and I am ${data.age} and I live in ${data.location}`;
console.log(string);
// "Hi my name is Ryan Christiani and I am 29 and I live in Toronto, ON"
```
- Classes
Function constructor
```
var Warrior = function() {
	this.hp = 100;
	this.str = 5;
	this.attack = function(target) {
		target.hp = target.hp -= this.str;
	}	
};
var character = new Warrior();
character.attack(enemy);
```
Class
```
class Warrior {
	constructor() {
		this.hp = 100;
		this.str = 5;
	}
	attack(target) {
		target.hp = target.hp -= this.str;
	}	
};
var character = new Warrior();
character.attack(enemy);
```
- Arrow Functions
```
//implicit return
var add = (a,b) => {
	return a+b
}
//explicit return
var add = (a,b) => a + b;
```
- Promises 




