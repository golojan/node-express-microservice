import * as jwt from "jsonwebtoken";
import constants from "./constants";

const verify = (token: string): Object => {
    try {
        return jwt.verify(
            token,
            constants.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );
    } catch (err: any) {
        throw new Error(err.message);
    }
};

const generate = (data: object) => {
    try {
        return jwt.sign(
            {
                timestamp: new Date().getTime(),
                ...data,
            },
            constants.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: constants.JWT_EXPIRY,
            }
        );
    } catch (err:any) {
        throw new Error(err.message);
    }
};

export default {
    verify,
    generate,
};
