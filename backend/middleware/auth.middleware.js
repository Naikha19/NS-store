import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: "Access denied: Please log in" });
  }


  //verify token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        error_code: "TOKEN_EXPIRED",
        message: "Your session has expired, please log in again",
      });
    }

    return res
      .status(401)
      .json({ message: "Invalid token" });
  }
};
