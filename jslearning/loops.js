
const a  = 1;
/* It will exeute infanite loop 
while(a){
    console.log('infanite loop');
    
} */

let b =2;
while(b<10){
    console.log(`Value of B :${b}`);
    b++;
}
console.log(b);

do
{
    console.log('Do while loop woth b value:', b)
    b++;
}while(b<30);

for(let a = 0; a<=10; ++a){
    console.log(a)
}