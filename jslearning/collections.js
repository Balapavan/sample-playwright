
//Arrays 
let a1 = new Array(1, 2, 3, 4, 5)
console.log(a1.indexOf(2));

let a2 = ['a', 1, false, 10.56];
a2[2] = 'def';
a2.push(123);
a2.push('a', 'b', false)
a2.unshift('first value');
console.log(a2);
//a2.pop();
console.log(a2);
console.log(a2.indexOf('first value'))
console.log(a2.includes(5678));

let scoreInOver = [6, 4, 5, 2, 0, 4];
//Reduce filter map to sum of all elements from an array
let sceorePerOver = scoreInOver.reduce((TotalScorePerOver, scoreperBall)=> TotalScorePerOver+scoreperBall);
console.log(sceorePerOver);

//get even runs from scorecard by using Filter function
let scoreEven = scoreInOver.filter(perBall => perBall%2 == 0);
console.log(scoreEven);
//multiply all the elements and save in new map
let multipliScoreCard = scoreInOver.map(scorePerBall => scorePerBall * 2);
console.log(multipliScoreCard);
//Sort score from low to high
//If we .sorted function it will modify the orgial array 
//.roSorted function will not modiy the orginal Array 
let sortedScore = scoreInOver.toSorted((a,b)=> a-b);
console.log(sortedScore);
let sortedScoreD = scoreInOver.toSorted((a,b)=> b-a); //Decending Order
console.log(sortedScoreD);


function bubbleSort(arr) {
    let len = arr.length;
    // Outer loop to control the number of passes
    
    for (let i = 0; i < len; i++) {
        // Inner loop to compare adjacent elements
        for (let j = 0; j < len - 1 - i; j++) {
            // Swap if the current element is greater than the next
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort(scoreInOver));


