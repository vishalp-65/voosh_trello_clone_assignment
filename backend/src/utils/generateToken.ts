import jwt from "jsonwebtoken";
import serverConfig from "../config/server-config";

const generateToken = (id: string) => {
    return jwt.sign({ id }, serverConfig.JWT_SECRET_KEY as string, {
        expiresIn: "7d",
    });
};

export default generateToken;
