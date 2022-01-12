import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { resolve } from 'path/posix';
import { rejects } from 'assert';


const images = express.Router();

let name: string;


images.get("/", async (req, res) => {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;

    const imgName = await getImage(filename as string);
    console.log(imgName);
    res.sendFile(path.resolve("assets/images/thumbnail", (imgName as string)))

    
});

 function processImage(filename: string): Promise<String>{
    return new Promise((resolve, reject) => {
        let filepath: string = path.resolve("assets/images/full", (filename as string));
        let outputFile = filename.slice(0, filename.length - 4);
        try{
            sharp(filepath)
            .resize(500, 200)
            .toFile(`assets/images/thumbnail/${outputFile}.jpg`);
            resolve(`${outputFile}.jpg`);
        } catch(e){
            reject(e);
        }
    });
}

async function getImage(filename: string){
    try{
        const response = await processImage(filename);
        return response;
    } catch(err){
        return err;
    }
}



export default images;