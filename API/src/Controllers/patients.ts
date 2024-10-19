import { Request, RequestHandler, Response } from "express";
import Connection from "../Helpers/database";

const db = new Connection();

export const createPatient = async (req: Request, res: Response) => {

    const { name, resident_area, room_admitted, admission_no, id_no, email } = req.body;

    try {

        await db.exec('addPatient', { name, resident_area, room_admitted, admission_no, id_no, email });
        res.status(201).json({ message: "Patient admitted Sucessfully!" })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong." })
    }

}

export const deletetePatient: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {

        await db.exec('deletePatient', { id });
        res.status(201).json({ message: "Patient deleted sucessfully!" })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong." })
    }
}

export const getPatients = async (req: Request, res: Response) => {

    try {

        const patients = (await db.exec('getAllPatients')).recordset
        res.status(200).json(patients)

    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const updatePatient: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {

        //HE did with id and status in the await
        await db.exec('updatePatient', { id });
        res.status(200).json({ message: "Patient updated sucessfully!" })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong." })
    }

}