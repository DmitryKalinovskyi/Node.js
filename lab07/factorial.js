module.exports = function factorial(n){
    if(n < 0)
        return null;

    if(n === 0)
        return 1;

    let counter = 1;

    for(let i = 1; i <= n; i++)
        counter *= i;

    return counter;
}