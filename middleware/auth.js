// ./middleware/auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = (requiredPrivilege) => (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (requiredPrivilege) {
            // Adjusting the privilege check
            const isAdmin =
                requiredPrivilege === "admin" && req.user.privilege === "0";
            if (!isAdmin) {
                return res
                    .status(403)
                    .json({ message: "Forbidden: Insufficient privileges" });
            }
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
