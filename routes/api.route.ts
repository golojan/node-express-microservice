import * as express from "express";
import lang from "../utils/localization";

const router = express.Router();

router.get("/api/v1/", (req, res) => {
    res.status(200).json({
        message: lang("WELCOME")
    });
}
);

export default router;
