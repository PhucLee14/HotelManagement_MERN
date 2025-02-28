import jwt from "jsonwebtoken";
import User from "../../../../../../../../../HongPhuc/MyProjects/SocialMedia_Express/backend/src/models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized, invalid token" });
    }
};
