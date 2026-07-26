console.log('staring print')

// Data types in java script
/*
 data type desclarion is not requried 
*/
// const can't be modified
const a = 10;
const b = 'abc';
const c = true;
const d = 10.56;
const e = 12345678909876543211234567890978675645;
console.log(`value of a ${a} and type : ${typeof(a)}`);
console.log(`value of b ${b} and type : ${typeof(b)}`);
console.log(`value of c ${c} and type : ${typeof(c)}`);
console.log(`value of d ${d} and type : ${typeof(d)}`);
console.log(`value of e ${e} and type : ${typeof(e)}`);
//e = 2345 thoruws an error ypeError: Assignment to constant variable.
console.log(e);

//let block scope and can be modified withing the block {}
let l1 = 1234;
l1 = 567;
console.log(l1)
let s1 = 'abc';
s1 = 'def';
console.log(s1);
function aaa(){
if(l1){
    l1 = 55;
    var v = 'greeting';
    console.log(`Block scope modification :${l1}`);
    v = 'abcdef';
}
}
// Vard global if we define in global level or function level
console.log(v)
v = 'hhhhhhbala pavanh';
console.log(v)



