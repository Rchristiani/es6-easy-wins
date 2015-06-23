#ES6/ES2015 Easy Wins.

The newest iteration of the Javascript language is just around the corner. As of June 2015 the spec for ES6/ES2015 is has been [approved](http://www.infoq.com/news/2015/06/ecmascript-2015-es6). Because of that there will be a lot of new features and syntax coming to a browser near you!

Lets break down some of the Easy Wins from the new version. When I say Easy Wins I mean things that do not require a large amount of research to start working with. For example we will not be talking about Generators or Symbols, I think those require a more in depth post. 

Some of the things thing we will go over are: 
- `let`
- `const`
- Template Strings
- Classes
- Arrow Functions
- Promises

##Lets talk about `let`
In JS currently we have function scope. Meaning if a variable is created in a function using the `var` keyword it is bound to that function. It is not available outside of that function. It is however available inside of any functions created inside of the original function in which it was created via a closure.

In some other languages there is also this idea of block scope. Meaning anything declared between the `{}` characters, or a block, would only be scoped to that block.

In JS it is common to write a `for` loop like such:

```
for(var i = 0; i < 10; i++) {
  console.log(i);
}
console.log('After:', i); //10
```

With the initial thinking that the `var i = 0` is creating a variable called `i` that is scoped only for this statement. However that is not true, if you `console.log(i)` after the `for` loop you will see that it is now available to you! This is maybe not the behaviour you are expecting. 

In ES6 there is a new keyword called `let` which will give you the ability to create a variable that will be scoped to the block statement in which it was created.

```
for(let i = 0; i < 15; i++) {
  console.log(i);
}
// i undefined
console.log('After:', i);
```

Use the `let` keyword instead and trying to `console.log(i)` outside of the `for` loop will now give you an `undefined`. This will work in any block statement, so anything in between `{}`. This includes inside of closures.

```
function myFunction() {
	let a = 'Hey';
	return (function() {
		return a;
	})();
}
```

Calling `myFunction();` will return to you `"Hey"`.


##Const
Currently inside JS we are not able to create any variables that can not be changed, or that are immutable. We have a convention where a variable that is in ALL CAPS is supposed to be a value that should not be altered. This should be a constant variable.

ES6 offers us the new `const` keyword which allows us to create a read-only  constant value.

```
const CONFIG = 'Configure'
CONFIG = 'New String' //Silent error
console.log(CONFIG); //Configure
```

After a `const` value is created you can not mutate it, or change it. If you attempt to change the value it will fail silently. The `const` value is also block scoped and works like the `let` keyword.

Example: 

```
const API_KEY = 'h879u3iu1789123';

function apiCall() {
	//Do some ajax call/whatever with API_KEY
	return data;
}
```

This is a pretty trivial example, but hopefully the idea comes across.

##Template Strings or String interpolation
Dislike concatenating strings together? In ES6 we can now use template strings. The syntax is very straight forward, instead of using quotes `''` and the `+`, you use the `` ` `` characters. Also known as a back tick. Typing something like `` `Hey there` `` will just create a string that says "Hey there".

You might be thinking, "Oh cool...but what about the + portion". There is a new syntax that looks like this `${variable}` that we can use in place of the verbose concatenation syntax. Consider this, if we have a variable `let name = "Ryan"` and we want to concatenate it into a string it might look like this:

```
var name = "Ryan";
var string = "Hi my name is " + name + " and I live in Toronto";
```

With the new ES6 template string syntax we can use the back ticks and the `${}` expression to concat a string together with the variable `name`.

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

Using template strings:

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

If you want to use our Warrior as the base object to create more from, we have to use the `prototype` property.

```
var Fighter = function() {
	this.weapons = ['sword','shield'];	
};
Fighter.prototype = new Warrior();

var myFighter = new Fighter();
```
Here we use the `prototype` property on our `Fighter` to make it inherit the properties from the `Warrior` object. So our `Fighter` has access to properties like the method `.attack()`;

Now lets look at the new Class type in ES6. For this new keyword has been introduced, `class`.

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

In the class there is a method called `constructor()` that is run once you instantiate a new version of the Class. Inside here you can run any sort of initialization code that you need. If you need your `class` to accept parameters they are assigned in the in the `constructor()` method.

```
class Warrior {
	constructor(name) {
		this.name = name;
		this.hp = 100;
		this.str = 5;
	}
}
``` 

And when you instantiate the class you would pass in the values as needed.

```
var myWarrior = new Warrior('Ryan');
console.log(myWarrior.name); //"Ryan";
```

With the Class type if you want to make something inherit from another class we can use the `extends` keyword.

```
class Fighter extends Warrior {
	constructor() {
		this.weapons = ['sword','sheild'];
	}
}
```

This is the same as 

```
Fighter.prototype = new Warrior();
```

###Private properties in classes
You might be thinking to your self, well we have the `class` what about private properties? In ES6 there is a new data type called a `symbol`. To make a new symbol we would create it as such.

```
var mySymbol = Symbol();
```

Notice the lack of the `new` keyword. This will create a new symbol for us to use. Because this is a unique identifier we can use this to set private properties on our class.

```
var privateProp = Symbol();
class Warrior {
	constructor() {
		this[privateProp] = ['some', 'data'];
	}
}
```
Now this property is somewhat private, if you need to access it you use the `this[privateProp]` selector. 

##Arrow Functions
With ES6 we get a new function syntax, the Arrow Function! The syntax is as follows.

```
() => {
	//statements
}
```

We no longer need the function keyword here, and we use the `=>` before the `{}` syntax. This will work only for anonymous functions, we can not have a named arrow function.

If you have a function that will accept a single parameter you can actually leave the parenths out.

```
x => { x * 2 }
```

Notice there is no `return` statement here. This is because simple expressions will create an implicit return as opposed to an explicit return.  
```
//implicit return
var add = (a,b) => {
	return a+b
}
```
This is great for simple callbacks. You can also leave out the `{}` all together in a simple expression if you want.
```
//explicit return
var add = (a,b) => a + b;
```
Notice in my explicit return example there is no `{}`, there is a lot more syntax availble for us that you can find [HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). I could write about it, but I will let MDN tell you!

I do want to go over the lexical scoping of `this` however. When working with functions the `this` keyword and its current context can be confusing for some.

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
In the example above the `this` keyword is scoped to the object we are working on, with the arrow function we can actually change this context.

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
In the above example we have changed the `print` method to be an arrow function as well as the callback for the `forEach`. The `this` keyword would be seen now as the `window`. This is actually going too far. I just wanted to point out an example where the arrow function might not be the most appropriate. Lets look at a slightly more realistic example.

```
class Europe {
  constructor() {
    this.count = 1000;
  }
  finalCountdown() {
    var countInterval = setInterval(function() {
		this.count--;
		console.log(this.count);
		if(this.count === 0) {
			clearInterval(countInterval);
		}
    });
  }
}
var gob = new Europe();
gob.finalCountdown();
```

Maybe we have a class called `Europe` and we want to play and intro or something...The one problem here is that when you write `setInterval(function(){...});` the `this` keyword is scoped to the window. Or the global scope. 

```
class Europe {
  constructor() {
    this.count = 1000;
  }
  finalCountdown() {
    var countInterval = setInterval(() => {
		this.count--;
		console.log(this.count);
		if(this.count === 0) {
			clearInterval(countInterval);
		}
    });
  }
}
```


##Promises 
In ES6 we get Promises! 

```
var myPromise = new Promise(function(resolve,reject) {
		
});

```

```
myPromise.then(
	//resolved
	function() {
	
	}, 
	//rejected
	function() {

	}
);

```


##Using ES6 in your projects today.
In order to use ES6 in your projects now the safest way to do so is to build it with something like Babel

https://kangax.github.io/compat-table/es6/ 
###gulp-babel
https://www.npmjs.com/package/gulp-babel

