import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const newFileName = convertFileName(
    filename as string,
    parseInt(width),
    parseInt(height)
  );
  const fileExsist = isFileAvailable(newFileName);

  if (fileExsist) {
    res.sendFile(path.resolve('assets/images/thumbnail', newFileName));
  } else {
    try{
      await getImage(
        filename as string,
        parseInt(width),
        parseInt(height)
      );
      res.sendFile(path.resolve('assets/images/thumbnail', newFileName));
    } catch(e){
      res.send("Something Went wrong, please try again later");
    }

  }
});

export async function processImage(filename: string, width: number, height: number) {
    const filepath: string = path.resolve(
      'assets/images/full',
      filename as string
    );
    const outputFile = filename.slice(0, filename.length - 4);
    try {
      await sharp(filepath)
        .resize(width, height)
        .toFile(`assets/images/thumbnail/${outputFile}${width}${height}.jpg`);
      return (`${outputFile}`);
    } catch (e: unknown) {
      return (e as string);
    }
}

export async function getImage(filename: string, width: number, height: number) {
  try {
    const response = await processImage(filename, width, height);
    return response;
  } catch (err) {
    return err;
  }
}

export function convertFileName(filename: string, width: number, height: number) {
  const name = filename.slice(0, filename.length - 4);
  return `${name}${width}${height}.jpg`;
}

export function isFileAvailable(fileName: string) {
  try {
    fs.accessSync(
      path.resolve('assets/images/thumbnail', fileName),
      fs.constants.F_OK
    );
    return true;
  } catch (e) {
    return false;
  }
}

export default {images, processImage, getImage, convertFileName, isFileAvailable};
