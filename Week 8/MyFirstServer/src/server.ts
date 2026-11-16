import express, { type Request, type Response } from 'express';
const app = express();

const PORT = 3000;
interface Server {

}
app.get('/', (req: Request, res: Response) => {
    res.send('Hello! My Express server is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



