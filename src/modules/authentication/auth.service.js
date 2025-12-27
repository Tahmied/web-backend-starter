import { ApiError } from "../../utils/ApiError.js";
import { User } from "./user.model.js";

class AuthService {
  async register(data) {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw new ApiError(409, "Email already registered");
    }

    const user = await User.create(data);

    return {
      user: this._sanitizeUser(user),
      accessToken: user.generateAccessToken(),
      refreshToken: user.generateRefreshToken()
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is disabled");
    }

    const isMatch = await user.isPassCorrect(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    return {
      user: this._sanitizeUser(user),
      accessToken: user.generateAccessToken(),
      refreshToken: user.generateRefreshToken()
    };
  }

  _sanitizeUser(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      isVerified: user.isVerified
    };
  }
}

export const authService = new AuthService();