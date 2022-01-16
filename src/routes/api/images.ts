import express, { Request, Response } from 'express';
import path from 'path';
import utilities from '../../utilities';

const images = express.Router();

images.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const newFileName = utilities.convertFileName(
    filename as string,
    parseInt(width),
    parseInt(height)
  );
  const fileExsist = utilities.isFileAvailable(newFileName);

  if (fileExsist) {
    res.sendFile(path.resolve('assets/images/thumbnail', newFileName));
  } else {
    const response = await utilities.getImage(
      filename as string,
      parseInt(width),
      parseInt(height)
    );
    if (newFileName.includes(response)) {
      res.sendFile(path.resolve('assets/images/thumbnail', newFileName));
    } else {
      res.send(response);
    }
  }
});

export default images;
