import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
  let filename = req.query.filename;
  let width = req.query.width as string;
  let height = req.query.height as string;
  let newFileName = convertFileName(
    filename as string,
    parseInt(width),
    parseInt(height)
  );
  let fileExsist = isFileAvailable(newFileName);

  if (fileExsist) {
    res.sendFile(path.resolve('assets/images/thumbnail', newFileName));
  } else {
    try{
      const imgName = await getImage(
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

export function processImage(
  filename: string,
  width: number,
  height: number
): Promise<String> {
  return new Promise(async (resolve, reject) => {
    let filepath: string = path.resolve(
      'assets/images/full',
      filename as string
    );
    let outputFile = filename.slice(0, filename.length - 4);
    try {
      await sharp(filepath)
        .resize(width, height)
        .toFile(`assets/images/thumbnail/${outputFile}${width}${height}.jpg`);
      resolve(`${outputFile}`);
    } catch (e) {
      reject(e);
    }
  });
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
  let name = filename.slice(0, filename.length - 4);
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
