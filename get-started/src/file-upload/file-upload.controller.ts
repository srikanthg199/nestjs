import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { sendResponse } from 'src/utils/response.util';
import { FileUploadService } from './file-upload.service';

@Controller('upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directory for file upload
        filename: (req, file, callback) => {
          // Generate a unique filename
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname); // Extract file extension
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExt}`; // Set new filename
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Call the service method to validate the file type
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }
    return sendResponse(res, file.path, 'File uploaded successfully!');
  }

  @Post('aws')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToAWS(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(/file/, file);
    // Call the service method to upload the file to AWS S3
    const uploadUrl = await this.fileUploadService.uploadToS3(file);
    return sendResponse(
      res,
      uploadUrl,
      'File uploaded to AWS S3 successfully!',
    );
  }
}
