import express from "express"
import {authMiddleware} from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/authorization.middleware.js"
const router =  express.Router()

import { getUsers, createUser, login, getProfile, adminDashboard } from "../controllers/user.controller.js"
import { getProducts } from "../services/user.service.js"

router.get("/users", authMiddleware, authorize("admin"), getUsers)
router.post("/signup", createUser)
router.post("/login", login)
router.get("/profile", authMiddleware, getProfile)
router.get("/dashboard", authMiddleware, authorize("admin"), adminDashboard )
router.get("/products", authMiddleware, getProducts)

export default router