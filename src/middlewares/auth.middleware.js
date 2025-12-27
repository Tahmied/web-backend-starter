import jwt from "jsonwebtoken";
import { User } from "../modules/authentication/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const authMiddleware = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    } catch {
      throw new ApiError(401, "Invalid or expired token");
    }

    const user = await User.findById(decoded.userId).select(
      "_id role isActive isVerified"
    );

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is disabled");
    }

    req.user = {
      _id: user._id,
      role: user.role,
      isVerified: user.isVerified
    };

    next();
  } catch (err) {
    next(err);
  }
};