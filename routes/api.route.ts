import * as express from "express";
import lang from "../utils/localization";

const router = express.Router();

router.get("/api/v1/",async (req, res) => {
    const prisma = req["prisma"];
    const users = await  prisma.user.findMany();
    res.status(200).json({
        message: lang("WELCOME"),
        data: users
    });
}
);

export default router;
