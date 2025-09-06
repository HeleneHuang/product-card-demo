import express from 'express';
import cors from 'cors';
import router from './routes/product';

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use('/products', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});