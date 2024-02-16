const userjs = require('./user');

const DEBUG  = false;

if(DEBUG)console.log(process.argv)

const func_map = {
    "add": userjs.add_cmd,
    "remove": userjs.remove_cmd,
    "list": userjs.list,
    "read": userjs.read_cmd,
    "update": userjs.update_cmd
}

function getParams(dirty_args){
    const bucket = {};

    for(const arg of dirty_args){
        let [param, value] = arg.split('=');

        if(param.startsWith("--")){
            param = param.slice(2);
            bucket[param] = value;
        }
    }

    return bucket;
}


function parseArguments(){
    // first argument is always method, other is method parameters

    try{
        const method = process.argv[2];
        const dirty_args = process.argv.slice(3);
        const m =func_map[method];

        m(getParams(dirty_args));
    }catch (e){
        console.log(e);
    }
}

parseArguments();



