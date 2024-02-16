const fs = require('fs');

const USERINFO_PATH =   "playground/user.json";

function get_userinfo(){
    const data = fs.readFileSync(USERINFO_PATH);

    return JSON.parse(data.toString());
}

function save_userinfo(info){
    const dataToSerialize = JSON.stringify(info);

    fs.writeFileSync(USERINFO_PATH, dataToSerialize);
}

function add(title, level) {
    const info = get_userinfo();
    info['languages'].push({title, level});
    save_userinfo(info);
}

function add_cmd(obj){
    return add(obj.title, obj.level);
}

function update(title, level){
    throw Error("Not implemented error.");
}

function update_cmd(obj){
    return update(obj.title, obj.level);
}

function remove(title){
    const info = get_userinfo();
    info['languages'] = info['languages'].filter((el) => el['title'] !== title);
    save_userinfo(info);
}

function remove_cmd(obj){
    return remove(obj.title);
}

function list(){
    const info = get_userinfo();
    console.log(info['languages'])
}

function read(title){
    const info = get_userinfo();
    const lang = info['languages'].filter((el) => el['title'] === title);

    console.log(lang);
}

function read_cmd(obj){
    return read(obj.title);
}

module.exports = {
    remove, add, list, update, read,
    read_cmd, add_cmd, update_cmd, remove_cmd
}