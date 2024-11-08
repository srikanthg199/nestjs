import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {}
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  async uploadToS3(file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET');
    const fileName = file.originalname;
    const fileKey = `uploads/${fileName}`;
    // Upload the file to the public S3 bucket
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Ensure the file is publicly readable
      }),
    );

    // Construct the public URL for the uploaded file
    const fileUrl = `https://${bucketName}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${fileKey}`;

    return fileUrl;
  }
}
