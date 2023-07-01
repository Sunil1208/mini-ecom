const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config");

const users = require("../models/user.model");
const { ROLES } = require("../constants/constant");

exports.signup = (req, res) => {
    const { roles } = req.body;
    if(roles.length > ROLES.length){
        return res.status(400).send({
            message: `Max of ${ROLES.length} is allowed`,
            status: 0,
        })
    }
    // Save user to database
    users.create({
        username: req.body.username,
        email: req.body.email,
        full_name: req.body.full_name,
        phone: req.body.phone,
        roles: roles,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        res.send({
            message: "User was registered successfully!",
            status: 1,
        });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    users.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ message: "User not found."});
        }
        console.log("USER IS ", user)

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        const token = jwt.sign(
            { id: user.user_id },
            config.secret,
            {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            }
        );

        let authorities = [];
        const { roles } = user;
        for(let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].toUpperCase());
        }
        res.status(200).send({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            roles: authorities,
            phone: user.phone,
            full_name: user.full_name,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};