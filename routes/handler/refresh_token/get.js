const Model = require('../../../models');
module.exports = async (req, res) => {
    const refresh_token = req.query.refresh_token;
    const token = await Model.Refresh_Tokens.findOne({
        where: {
            token: refresh_token
        }
    });

    if(!token){
        return res.status(400).json({
            status: "error",
            message: "invalid token"
        });
    }

    return res.json({
        status: "success",
        data: token
    });
}