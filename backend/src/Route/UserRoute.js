import express from "express"
import { login, save } from "../controller/UserController.js"
const UserRoute = express.Router()
UserRoute.post("/save",save)
UserRoute.post("/Login",login)


export default UserRoute;