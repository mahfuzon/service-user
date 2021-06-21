const Validator = require("fastest-validator");
const v = new Validator();
const {
    User
} = require('../../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const schema = {
        email: {
            type: "email"
        },
        password: {
            type: "string"
        },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status('400').json({
            status: "error",
            message: validate
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found"
        });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
        return res.status(400).json({
            status: "error",
            message: "user not found"
        });
    }
    
    return res.json({
        status: "succes",
        data: user
    });
}