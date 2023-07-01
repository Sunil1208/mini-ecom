const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message: "No token provided",
            status: 0,
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Unauthorized!",
                status: 0
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        const { roles } = user;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin"){
                next();
                return;
            }
        }

        res.status(403).send({
            message: "Require Admin Role!",
            status: 0
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        const { roles } = user;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator"){
                next();
                return;
            }
        }

        res.status(403).send({
            message: "Require Moderator Role!",
            status: 0
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        const { roles } = user;
        for (let i = 0; i< roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }

            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
        res.status(403).send({
            message: "Require Moderator or Admin Role!",
            status: 0
        });
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
};

module.exports = authJwt;