const jwt = require('jsonwebtoken')

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

const updateUserToken = async (req, res) => {
    const { refreshToken } = req.body
    try {

        if (!refreshToken) {
            return res.status(400).send('Missing refresh token');
        }

        const decodedRefreshToken = jwt.verify(refreshToken, tokenKey);
        if (!decodedRefreshToken || Date.now() > decodedRefreshToken.exp * 1000) {
            return res.status(401).send('Refresh token is invalid or expired');
        }

        const id = jwt.decode(refreshToken).id;
        const expiresIn = 60 * 15

        if (jwt.verify(refreshToken, tokenKey)) {
            const accessToken = jwt.sign({ id: id }, tokenKey, { expiresIn: expiresIn })
            return res.status(200).json({
                accessToken: accessToken,
            });
        }

    } catch (e) {
        console.error(e, 'refresh-token')
    }

    res.status(400).send('Wrong token')
}

module.exports = {
    updateUserToken,
}