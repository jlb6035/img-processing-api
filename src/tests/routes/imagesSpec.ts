import images from "../../../routes/api/images";
import path from 'path';
import app from '../../index';
import supertest from "supertest";

const request = supertest(app);


describe('Test Image Services', () => {
    it('test convert file name',  () => {
        expect(images.convertFileName("fjord.jpg", 100, 200)).toBe("fjord100200.jpg");
    });

    it('test the image proccessing api endpoint', async () => {
        const response = await request.get('/api/images?filename=icelandwaterfall.jpg&width=300&height=400');
        const filepath = path.resolve("assets/images/thumbnail", "icelandwaterfall300400.jpg");
        const filename = path.basename(filepath);
        expect(response.status).toBe(200);
        expect(filename).toBe("icelandwaterfall300400.jpg");
    }
)});