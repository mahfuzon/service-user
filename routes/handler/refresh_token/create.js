const Validator = require("fastest-validator");
const Model = require('../../../models')
const v = new Validator();

module.exports = async (req, res) => {
    const userId = req.body.user_id;

    const schema = {
        user_id: {
            type: "number",
            positive: true,
            integer: true
        },
        token: {
            type: "string",
        },
    };

    const check = v.compile(schema);
    const validate = check(req.body);

    if (validate !== true) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    const user = await Model.User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found"
        });
    }

    createdRefreshToken = await Model.Refresh_Tokens.create(req.body);

    return res.json({
        status: "success",
        data: createdRefreshToken
    });
}