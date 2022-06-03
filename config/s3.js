const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");


const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
});

const getFile = (filename) => {
    const downloadParams = {
        Key: filename,
        Bucket: process.env.S3_AWS_BUCKET_NAME
    }

    return s3.getObject(downloadParams).createReadStream()
}

const upload = (bucketName) =>
    multer({
        storage: multerS3({
            s3,
            bucket: bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `image-${Date.now()}${Math.floor(Math.random() * 100)}-${file.originalname}`);
            },
        }),
    });

const deleteFile = (filename) => {
        return s3.deleteObject({
            Key: filename,
            Bucket: process.env.S3_AWS_BUCKET_NAME
        }).promise()
    }

const uploadMultiple = upload(process.env.S3_AWS_BUCKET_NAME).array('images', 10);
const uploadSingle = upload(process.env.S3_AWS_BUCKET_NAME).single("imageCover");

module.exports = {
    getFile,
    upload,
    deleteFile,
    uploadMultiple,
    uploadSingle
}