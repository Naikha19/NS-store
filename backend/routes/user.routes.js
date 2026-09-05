import express from "express"
import {authMiddleware} from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/authorization.middleware.js"
const router =  express.Router()

import { getUsers, getProfileById, createUser, login,  adminDashboard, getProducts } from "../controllers/user.controller.js"

router.get("/users", authMiddleware, authorize("admin"), getUsers)
router.post("/signup", createUser)
router.post("/login", login)
router.get("/profile", authMiddleware, getProfileById)
router.get("/dashboard", authMiddleware, authorize("admin"), adminDashboard )
router.get("/products", authMiddleware, getProducts)

export default router