import { Router } from "express";
import { createPatient, deletetePatient, getPatients, updatePatient } from "../Controllers/patients";

const router = Router();


router.get('/', getPatients);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletetePatient);


export default router;
