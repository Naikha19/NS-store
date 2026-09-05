import * as userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../utils/AppError.js"

//GET ALL USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
   next(error)
  }
};
//GET USER BY ID

//SIGNUP API
export const createUser = async (req, res, next) => {
  const { firstName,lastName,email,phoneNumber, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
     throw new AppError(
      "Invalid email format",
      400
     )
      
    }

    if (password.length < 8) {
     throw new AppError(
      "Password must be 8 characters long",
      400
     )
    }

    const user = await userService.createUser(firstName,lastName,email,phoneNumber, password);
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error)
  }
};

//LOGIN API
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     throw new AppError(
      "Email and password are required",
      400
     )
    }

    const user = await userService.userLogin(email, password);
    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401
      )
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("token", token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //true when using https in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, //1hr
    })
    return res.status(200).json({
      message: "Login successfull",
      user: user
    });
  } catch (error) {
   next(error)
  }
};

//ADMIN DASHBOARD API
export const adminDashboard = async (req, res) => {
  return res.status(200).json({
    message: "Welcome to the admin dashboard",
    user: req.user,
  });
};

//PRODUCTS API *
export const getProducts = async (req, res, next) =>{
  try{
    console.log("controller reached")
    const data = await userService.getProducts();
    console.log("data retrieved", data)
    return res.status(200).json(data)
  }catch(error){
    console.error("Error retrieving products:", error);
    next(error)
  }
  
}

//PROFILE API
export const getProfileById = async (req, res, next) => {
try {
  const user = await userService.getProfileById(req.user.userId)
  if(!user){
    throw new AppError(
      "User not found",
      404
    )
  }
  res.status(200).json({
    message:"Profile retrieved successfully",
    user})
} catch (error) {
  next(error)
}
};
