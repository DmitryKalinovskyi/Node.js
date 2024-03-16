const ObjectID = require("mongoose").Types.ObjectId;
function getObjectId(id){
    try{
        return new ObjectID(id);
    }
    catch{
        return "0".repeat(24);
    }
}

module.exports = {
    getObjectId
}