const {
    User
} = require('../../../models');
module.exports = async (req, res) => {
    const ids = req.query.user_ids || [];

    if (ids.length) {
        const users = await User.findAll({
            attributes: ['id', 'email', 'profession', 'avatar', 'role'],
            where: {
                id: ids
            }
        });

        return res.json({
            status: "success",
            data: users
        });
    }

    const users = await User.findAll({
        attributes: ['id', 'email', 'profession', 'avatar', 'role']
    })

    return res.json({
        status: "success",
        data: users
    });
}