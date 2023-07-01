const User = require("../models/user.model");
const { Op } = require("sequelize");
const { ROLES } = require("../constants/constant");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // check if a user already exists with the same username, email or password
    User.findOne({
        where: {
            [Op.or]: [
                { username: req.body.username },
                { email: req.body.email },
                { phone: req.body.phone },
            ]
        }
    }).then(user => {
        if(user) {
            let duplicateField = "Username";
            if(user.email === req.body.email){
                duplicateField = "Email";
            }
            if(user.phone === req.body.phone){
                duplicateField = "Phone Number";
            }
            if(user.email === req.body.email){
                errMsg = "Failed!"
            }
            return res.status(400).send({
                message: `Failed! ${duplicateField} already exists.`,
                status: 0,
            });
        }
        next();
    }).catch(error => {
        return res.status(400).send({
            message: `Failed! Something went wrong. ${error.message}`,
            status: 0
        });
    })
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i< req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i],
                    status: 0
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;