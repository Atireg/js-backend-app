import { AUTH_COOKIE_NAME } from "../constants.js"
import jwt from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token){
        return next();
    };

    try {
        const decodedToken = await jwt.verify(token, process.env.JTW_SECRET);
        
        req.user = decodedToken;
        req.isAuthenticated = true;
        
        next();
    } catch (error) {
        res.clearCookie(AUTH_COOKIE_NAME);

        return res.redirect('/auth/login')
    };
};

export const isAuth = (req, res, next) => {
    if (!req.user){
        res.redirect('/auth/login')
    }

    next();
}