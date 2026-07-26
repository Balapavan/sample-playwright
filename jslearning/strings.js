let s1 = 'Sun day';
console.log(s1.slice(1,5));

let s2 = 'ad sad 124abc';
console.log(Number(s2));
console.log(parseInt(s2, 10));

console.log(s2.match(/\d+/g)[0]); // Extract numbers from string
console.log(s2.replace(/\d+/g, ''));


let s3 = 'Identify the name of person is given';
const charoccurence = {};

for (char of s3){
    charoccurence[char] = (charoccurence[char] || 0) +1
}
console.log(charoccurence)

let s4 = 'aabc deff ghh'

const consiquitive = {};
var previous_character = ''
for(i = 0 ; i<s4.length; i++){
    if(previous_character == s4[i]){
        consiquitive[s4[i]] = (consiquitive[s4[i]] || 1) + 1;
    }
    else{
        previous_character = s4[i]
    }
}
console.log(consiquitive)
const set1 = new Set(s4.split(''));
const result = [...set1].join('');
console.log(result);
console.log(s4.indexOf('a'))
