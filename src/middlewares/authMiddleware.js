const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid.', error: err.message });
        }

        req.user = decoded;

        next();
    });
};

module.exports = authMiddleware;
