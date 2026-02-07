import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";


export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "null") {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // ⭐ Fetch user from DB
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ⭐ AUTO-EXPIRE PREMIUM
    if (user.premiumExpiresAt && user.premiumExpiresAt < new Date()) {
      user.isPremium = false;
      user.premiumActivatedAt = undefined;
      user.premiumExpiresAt = undefined;
      await user.save();
    }

    // attach user info to request
    req.userId = user._id;
    req.user = user;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
