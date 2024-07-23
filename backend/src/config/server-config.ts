import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;
const AWS_SECERT_ACCESS_KEY = process.env.AWS_SECERT_ACCESS_KEY;

export default {
    PORT,
    DB_URI,
    JWT_SECRET_KEY,
    AWS_S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_DEFAULT_REGION,
    AWS_SECERT_ACCESS_KEY,
};
