const users = require("../models/user.model");

exports.getUserInfo = (req, res) => {
    users.findOne({
        where: {
            user_id: req.params.user_id
        },
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
        }
    })
        .then((user) => {
            if(!user){
                res.status(400).send({
                message: "No such user found!",
                status: -1,
            });
            } else {
                let authorities = [];
                for (let i = 0; i < user.roles.length; i++){
                    authorities.push("ROLE_" + user.roles[i].toUpperCase());
                };
                user["roles"] = authorities;
                return res.status(200).send({
                    message: "",
                    status: 0,
                    data: user
                });
            }
        }).catch((error) => {
            res.status(400).send(({
                message: "Error trying to find the user!",
                status: -1,
                data: []
            }));
        });
};

exports.updateUser = (req, res) => {
    users.findOne({
        where: {
            user_id: req.params.user_id
        }
    }).then(user => {
        if(!user){
            return res.status(400).send({
                message: "No such user found",
                status: -1,
                data: null
            });
        }

        user.update({
            phone: req.body.phone
        }).then(() => {
            return res.status(200).send({
                message: "User data updated successfully!",
                status: 0,
                data: null
            });
        }).catch((err) => {
            return res.status(400).send({
                message: `Unable to update the user! Error: ${err.message}`,
                status: -1,
                data: null
            })
        });
    }).catch((error) => {
        return res.status(400).send({
            message: `Unable to update the user! Error: ${error.message}`,
            status: -1,
            data: null
        });
    });
};

exports.updateUserRole = (req, res) => {
    users.findOne({
        where: {
            user_id: req.params.user_id
        }
    }).then(user => {
        if(!user){
            return res.status(400).send({
                message: "No such user found",
                status: -1,
                data: null
            });
        };

        user.update({
            roles: req.body.roles
        }).then(() => {
            return res.status(200).send({
                message: "User data updated successfully!",
                status: 0,
                data: null
            });
        }).catch((err) => {
            return res.status(400).send({
                message: `Unable to update the user! Error: ${err.message}`,
                status: -1,
                data: null
            })
        });
    }).catch(error => {
        return res.status(400).send({
            message: `Unable to update the role! Error: ${error.message}`,
            status: -1,
            data: null
        });
    });
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public content")
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content");
};