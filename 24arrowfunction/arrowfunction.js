// statement syntax
var square = (x)=>{
  var result = x * x;
  return result;
}

// expression syntax
var sq = (x) => x * x;

console.log(square(9));

console.log(sq(9));

// arrow function does not work with this keyword inside an object
// but there is another way to use this keyword in ES6 syntax as shown in sayhello function inside user object
// we can also get the argument varibale printed in sayhello but not in sayHi
var user = {
  name: 'Andrew',
  sayHi: ()=>{
    console.log(arguments);
    console.log(`hi i am ${this.name}`);
  },
  sayhello (){
    console.log(arguments);
    console.log(`hello i am ${this.name}`)
  }
}

user.sayHi(1,2);
user.sayhello(1,2,3);
