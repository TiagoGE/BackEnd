import { Router } from "express";
import { singUp, singIn, getUsers, deleteUser } from "../Controllers/users";

const router = Router();

router.post('/signup', singUp);
router.post('/signin', singIn);
router.get('/', getUsers);
router.delete('/:id', deleteUser);


export default router;