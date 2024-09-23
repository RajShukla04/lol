import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJwtTokecn = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next(new ApiError(401, "Unauthorized request"));
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return next(new ApiError(401, "invalid Access token"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, error?.message || "invalid access token"));
  }
};
