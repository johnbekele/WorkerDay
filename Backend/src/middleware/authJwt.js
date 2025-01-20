import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateJWT = (req, res, next) => { 
    const authHeader = req.headers.authorization;
    
    if (!authHeader || authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden" });
        }
        req.user = user;
        next();
    });
};

export default authenticateJWT;