const fs = require('fs');
let content = fs.readFileSync("./2162/input.txt").toString();

content = content.replaceAll(/\s/g, '');

function isPalindrome(a){
    let l = a.length;

    for(let i = 0; i * 2 < l; i++){

        if(a[i] !== a[l - i - 1]){
            return false;
        }
    }

    return true;
}

if(isPalindrome(content)){
    console.log("YES");
}
else{
    console.log("NO");
}