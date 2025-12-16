const jwt = require('jsonwebtoken');
var response = require('../utilities/responseManager.js');
require('dotenv').config();

function isAdmin(req, res, next) {
    const authHeader = req.header('Authorization');

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                const decode = jwt.verify(token, process.env.JSON_SECRET);

                if (decode.role == 'admin') {
                    req.user = decode;
                    next();
                } else {
                    response.onError(res, 'Admin access required');
                }
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    response.onError(res, 'Token is expired, please re-login');
                }

                if (error.name === 'JsonWebTokenError') {
                    response.onError(res, 'Token is not valid');
                }
            }
        } else {
            response.onError(res, 'Token is missing');
        }
    } else {
        response.onError(res, 'Admin not login');
    }

};

module.exports = { isAdmin };
