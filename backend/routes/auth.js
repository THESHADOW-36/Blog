import { Router } from "express";
import { allUser, editUser, deleteUser, getMe, login, register } from "../controllers/auth.js";
import { protecter } from "../middleware/auth.js";

const auth = Router();

auth.post('/register', register)
auth.post('/login', login)
auth.get('/all-user', protecter, allUser)
auth.get('/current-user', protecter, getMe)
auth.put('/edit-user/:id', protecter, editUser)
auth.delete('/delete-user/:id', protecter, deleteUser)

export default auth;