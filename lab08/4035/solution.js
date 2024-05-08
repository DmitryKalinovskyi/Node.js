const fs = require('fs');
let content = fs.readFileSync("./input.txt").toString();

// read input
let [line1, line2] = content.split("\n");

let [n, k] = line1.split(" ").map(num => +num);
let coords = line2.split(' ').map(num => +num);

// idea behind solution, we select some x and check with greedy algorithm,
// can we assign people to shops, where distance between each of them at least x?
// if we can, then check if solution exist for smallest x (x/2)
// can we assign people to some coords?


// greedy algorithm that checks for specific x.
function canBeAssigned(x){
    let prev = -1000_000_000;
    let cnt =  0;
    for(let p of coords){
        if(p - prev >= x){
            prev = p;
            cnt++;
        }
    }

    return cnt >= k;
}

let low = 0;
let height = coords[n - 1];

while(low < height){
    let mid = Math.floor((height - low + 1) / 2 + low);
    if(canBeAssigned(mid)){
        low = mid;
    }
    else{
        height = mid - 1;
    }
}

console.log(low);