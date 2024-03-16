const jwt = require('jsonwebtoken')
const UserModel = require('../../models/user')

const auth = async (req, res, next) => {
    try{
        const rawToken = req.header('Authorization');

        const token = rawToken.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await UserModel.findOne({_id: decoded._id, 'tokens.token': token});
        if(!user){
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    }
    catch(e){
        res.status(401).send({error: "Please authenticate!"});
    }
}

module.exports = auth;