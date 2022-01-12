import express from 'express';
import routes from '../routes/api';

const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
