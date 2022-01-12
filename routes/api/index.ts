import express from 'express';
import images from './images';

const routes = express.Router();

routes.get("/", (req, res)=>{
    res.send("Hello Jordan! From routes api");
  });

routes.use("/images", images);

export default routes;