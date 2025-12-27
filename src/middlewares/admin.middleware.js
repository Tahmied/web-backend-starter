import { ApiError } from "../utils/ApiError.js";

export const adminMiddleware = (req, _res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required");
  }

  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "Admin access only");
  }

  next();
};