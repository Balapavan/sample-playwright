let score = [6, 3,0, 2, 0, 1];

//assending order >
//Decending order <
function sorting_arrayvalues(arr){
    let lengthofArray = arr.length;
    for(i=0; i< lengthofArray ; i++){
        for(j = 0; j>lengthofArray -1 - i; j++){
            //console.log('----', arr);
            if(arr[j] < arr[j +1]){
                let temp = arr[j];
                arr[j] =  arr[j + 1];
                arr[j + 1] = temp;
                
            }
            console.log(j, '----', arr);   
        }
        console.log(arr);
    }
    return arr;


}

//console.log(sorting_arrayvalues(score));

/* Sort the array based on length of string */
let fruits = ['apple', 'bananna', 'coca', 'mango', 'bbbbb', 'pineapple']
/*
apple 5
bananna 7
coca 4
mango 5
pineapple 9
*/
for( fruit of fruits){
    console.log(fruit, fruit.length);
}

function findLongestWaordInArray(arr){
    let arrlength = arr.length;
    for(i = 0; i< arrlength; i++){
        for(j =0; j<arrlength -1 -i; j++){
            if(arr[j].length > arr[j+1].length){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp
            }
            else if(arr[j].length  == arr[j+1].length){
                let sortedtemp = [arr[j], arr[j+1]];
                sortedtemp.sort();
                arr[j] = sortedtemp[0];
                arr[j+1] = sortedtemp[1];   
        }
        
    }
}
    return arr
}

//console.log(findLongestWaordInArray(fruits));


let str1 = 'hi my dear collegue good morning';
var reversed_word = ''
for(word of str1.split(' ')){
    reversed_word += (word.split('').reverse()).join('') + ' ';
    console.log(reversed_word)
}
console.log(reversed_word)
