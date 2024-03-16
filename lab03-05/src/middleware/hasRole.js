
// Require authorization middleware
const hasRole = (roleName) => {
    return async (req, res, next) => {
        if(!req.user){
            throw Error("Authentication required");
        }

        // this is demo version of what there can be

        /*
        if(user.isInRole(roleName)){
            next();
        }
        else{
            throw Error("User don't have this role.");
        }
         */

        next();
    }
}


module.exports = hasRole;