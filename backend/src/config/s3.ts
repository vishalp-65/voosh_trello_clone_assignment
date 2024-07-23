import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import serverConfig from "./server-config";

const s3Client = new S3Client({
    region: serverConfig.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: serverConfig.AWS_ACCESS_KEY_ID!,
        secretAccessKey: serverConfig.AWS_SECERT_ACCESS_KEY!,
    },
});

export const uploadToS3 = async (
    buffer: Buffer,
    key: string,
    imageType: string
) => {
    const allowedImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (!allowedImageTypes.includes(imageType)) {
        throw new Error("Unsupported Image Type");
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: serverConfig.AWS_S3_BUCKET!,
        ContentType: imageType,
        Key: key,
        Body: buffer,
        ACL: "public-read",
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);

    return signedURL;
};
