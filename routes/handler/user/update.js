const Validator = require("fastest-validator");
const v = new Validator();
const {
    User
} = require('../../../models');
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    const schema = {
        name: {
            type: "string",
            min: 3,
            max: 255
        },
        email: {
            type: "email"
        },
        profession: {
            type: "string",
            optional: true
        },
        password: {
            type: "string",
            min: 6,
        },
        avatar: {
            type: "string",
            optional: true
        }
    };

    // const check = v.compile(schema);
    const validate = v.validate(req.body, schema);

    if (validate !== true) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found"
        });
    }

    const email = req.body.email;
    if (email) {
        const checkEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (checkEmail && email !== user.email) {
            return res.status(409).json({
                status: "error",
                message: "email already exist"
            });
        }
    }

    const password = req.body.password;

    bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
            return res.status(400).json({
                status: "error",
                message: err.message
            })
        }

        const data = await user.update({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            profession: req.body.profession
        });

        return res.json({
            status: "sucess",
            data: data
        });
    });
}