const Validator = require("fastest-validator");
const bcrypt = require('bcrypt');
const v = new Validator();
const {
    User
} = require('../../../models');

module.exports = async (req, res) => {
    const schema = {
        name: {
            type: "string",
            min: 3,
        },
        email: {
            type: "email"
        },
        password: {
            type: "string",
            min: 6
        },
        profession: {
            type: "string",
            optional: true
        }
    }

    const check = v.validate(req.body, schema);

    if (check.length) {
        return res.status(400).json({
            status: "error",
            message: check
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) {
        return res.status(409).json({
            status: "error",
            message: "email already exist"
        });
    }

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(400).json({
                status: "error",
                message: err.message
            });
        }
        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            profession: req.body.profession
        });

        return res.json({
            status: "success",
            data: data
        });
    });
}