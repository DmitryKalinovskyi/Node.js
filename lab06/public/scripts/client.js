const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams)

const name = urlParams.get("name");
const room = urlParams.get("room");

export {name, room};