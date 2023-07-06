import express, { Request, Response } from 'express';
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('client');
});

app.get('/dashboard', (req: Request, res: Response) => {
  res.json({ services: ['one', 'two', 'three'] });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
