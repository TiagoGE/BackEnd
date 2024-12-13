import { Router } from "express";
import { createDiagnosis, getDiagnosisForUser, updateDiagnosis } from "../Controllers/diagnosis";
import { VerifyToken } from "../Middlewares/verifyToken";

const router = Router();

router.post('/', VerifyToken, createDiagnosis);
router.put('/:id', VerifyToken, updateDiagnosis);
router.post('/user', VerifyToken, getDiagnosisForUser);

export default router;