const { Users } = require("./typedData");
const {TypedValues} = require("ydb-sdk");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

const authUser = async (req, res) => {
    try {
        const query =
            `
        DECLARE $login AS Utf8;
        DECLARE $password AS Utf8;
        SELECT id, login, password, FullName
        FROM admin_users
        WHERE login = $login`
            ;

        const preparedQuery = await req.ydbSession.prepareQuery(query);

        const {resultSets} = await req.ydbSession.executeQuery(preparedQuery, {
            "$login": TypedValues.utf8(req.body.login),
        });

        const userData = Users.createNativeObjects(resultSets[0])

        const areSame = await bcrypt.compare(req.body.password, userData[0].password)

        if (areSame) {
            const token = jwt.sign({ id: userData[0].id }, tokenKey)
            
            return res.status(200).json({
                id: userData[0].id,
                login: userData[0].login,
                FullName: userData[0].FullName,
                token: token,
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    authUser
}