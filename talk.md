#ES6/ES2015 Easy Wins.

The news iteration of the Javascript language is just around the corner. As of June 2015 the spec for ES6/ES2015 is planned to be finished. Because of that there will be a lot more features and syntax coming to the language!

Lets break down some of the Easy Wins from the new version. When I say Easy Wins I mean things that require a large amount of research to get a solid understanding of what they will do. We will not be talking about Generators or Symbols for example. 

Some of the things thing we will go over are: 
- `let`
- `const`
- Template Strings
- Classes
- Arrow Functions
- Promises

##Lets talk about `let`
In JS currently have function scope. Meaning if a variable is created in a function using the `var` keyword it is bound to that function. It is not available outside of that function. It is however available inside of any functions created inside of the original function in which it was created.

In some other languages there is also the idea of block scope. Meaning anything declared between the `{}` characters would only be scoped to that block.

In JS it is common to write a `for` loop like such:
```
for(var i = 0; i < 10; i++) {
  console.log(i);
}
// 10
console.log('After:', i);
```

With the initial thinking that the `var i = 0` is creating a variable called `i` that is scoped only for this statement. However that is not true, if you `console.log` i after the for loop you will see that it is now available to you. 

In ES6 there is a new keyword called `let` and let will give you the ability to create a variable that will be scoped to the block statement in which it was created.

```
for(let i = 0; i < 15; i++) {
  console.log(i);
}
// i undefined
console.log('After:', i);
```
Using the let keyword and then trying to `console.log` the value later will now give you an `undefined`.


##Const
Currently inside JS we are not able to create any variables that can not be changed. We have a convention where a variable that is in ALL CAPS is supposed to be a value that should not be altered.

ES6 offers us the new `const` keyword which allows us to create a read-only value.

```
const CONFIG = 'Configure'
CONFIG = 'New String' //Silent error
console.log(CONFIG); //Configure
```
The `const` value is also block scoped like the `let` keyword.

##Template Strings or String interpolation
Dislike concatenating strings together? In ES6 we can now use template strings. The syntax is very straight forward, instead of using quotes `''` you use the `` ` `` characters. Also known as a back tick. Typing something like `` `Hey there` `` will just create a string that says "Hey there".

You might be thinking, "Oh cool....". BUT WAIT! There is a new syntax that looks like this `${variable}` that we can use in place of the verbose concatenation syntax. Consider this, if we have a variable `var name = "Ryan"` and we want to concatenate it into a string it might look like this:

```
var name = "Ryan";
var string = "Hi my name is " + name + " and I live in Toronto";
```

With the new ES6 template string syntax we can use the back ticks and the `${}` expression to concat a string together.

```
var name = "Ryan";
var string = `Hi my name is ${name} and I live in Toronto`;
```

This works great when you maybe have an object, or a lot of information that you need to concatenate together. 

```
var data = {
	name: "Ryan Christiani",
	age: 29,
	location: 'Toronto, ON'
}
var string = 'Hi my name is ' + data.name + ' and I am ' + data.age + ' and I live in ' + data.location;
console.log(string);
//Hi my name is Ryan Christiani and I am 29 and I live in Toronto, ON
```

```
var data = {
	name: "Ryan Christiani",
	age: 29,
	location: 'Toronto, ON'
}
var string = `Hi my name is ${data.name} and I am ${data.age} and I live in ${data.location}`;
console.log(string);
// Hi my name is Ryan Christiani and I am 29 and I live in Toronto, ON
```
##Classes
In most programming languages there is this idea of a Class. A class is some structure that is used as a blue print for creating an object oriented structure.

Before classes in ES6 there were a couple ways to get up a this structure. One was would be using a function as a constructor.

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
Here we use a function and the `this` keyword to apply properties to it. However by default inside this function the `this` keyword will be bound to the `window` object. In order to get to be bound to our `Warrior` we need to use the `new` keyword when we create it. In this case we are instantiating a new object. 

If you want to use our Warrior as the base object great more from, we have to use the `.prototype` property.

```
var Fighter = function() {
	this.weapons = ['sword','shield'];	
};
Fighter.prototype = new Warrior();

var myFighter = new Fighter();
```
Here we use the `.prototype` property on out `Fighter` to make it inherit the properties from the `Warrior` object. So our `Fighter` has access to properties like the method `.attack()`;

Now lets look at the new Class type in ES6. A new keyword has been introduced called `class`.

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

In the class there is a method called `constructor()` that is run once you instantiate a new version of the Class. Inside here you can  

With the Class type if you want to make something inherit from another class we can use the `extends` keyword.

```
class Fighter extends Warrior {
	constructor() {
		this.weapons = ['sword','sheild'];
	}
}
```

##Arrow Functions
With ES6 we get a new function syntax, the Arrow Function! The syntax is as follows.

```
() => {
	//statements
}
```

We no longer need the function keyword, and we use the `=>` before the `{}` syntax.

If you have a function that will accept a single paramater you can actually leave the parenths out.

```
x => { x * 2 }
```

Notice there is no `return` statment here. This is because simple expressions will create an implicit return as opposed to an explicit return. 
```
//implicit return
var add = (a,b) => {
	return a+b
}
//explicit return
var add = (a,b) => a + b;
```
Notice in my explicit return example there is no `{}`, there is a lot more syntax availble for us that you can find [HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). I could write about it, but I will let MDN tell you!

I do want to go over the lexical scoping of `this` however. When working with functions the `this` keyword and what it is currently scoped to can be confusing.



```

//Scope
var teacher = {
    name: "Ryan",
    location: "Toronto, ON",
    courses: ['Front End bootcamp', 'Intro We Development', 'Advanced Web Development'],
    print: function(){
        this.courses.forEach((course,index) => {
            console.log(`${this.name} teaches ${course}`)
        });
    }
}
teacher.print();
//Ryan teaches Front End bootcamp
//Ryan teaches Intro We Development
//Ryan teaches Advanced Web Development

```
However if you changed that to be

```
var teacher = {
    name: "Ryan",
    location: "Toronto, ON",
    courses: ['Front End bootcamp', 'Intro We Development', 'Advanced Web Development'],
    print: () => {
        this.courses.forEach((course,index) => {
            console.log(`${this.name} teaches ${course}`)
        });
    }

}
```
The `this` keyword would be seen as the `window`. Or in the case of `use strict` it will be `undefined`.

##Promises 

```
var myPromise = new Promise(function(resolve,reject) {
	
});




```


##Using ES6 in your projects today.
In order to use ES6 in your projects now the safest way to do so is to build it with something like Babel

###gulp-babel
https://www.npmjs.com/package/gulp-babel

