import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function processImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const filepath: string = path.resolve(
    'assets/images/full',
    filename as string
  );
  const outputFile = filename.slice(0, filename.length - 4);
  try {
    await sharp(filepath)
      .resize(width, height)
      .toFile(`assets/images/thumbnail/${outputFile}${width}${height}.jpg`);
    return `${outputFile}`;
  } catch (e: unknown) {
    return e as string;
  }
}

export async function getImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  if (width && height) {
    const response = await processImage(filename, width, height);
    console.log('Response from function ' + response);
    return response;
  } else {
    return 'Please enter a numeric width and height!';
  }
}

export function convertFileName(
  filename: string,
  width: number,
  height: number
): string {
  const name = filename.slice(0, filename.length - 4);
  return `${name}${width}${height}.jpg`;
}

export function isFileAvailable(fileName: string): boolean {
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

export default { processImage, getImage, convertFileName, isFileAvailable };
