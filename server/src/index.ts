import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator/src/validation-result';

import { registerValidation } from './validations/auth';

mongoose
  .connect(
    'mongodb+srv://alexeikosykh97:M9T4NmrDGcl5vtPi@cluster0.ul5wlao.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log('DB error', err));

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('client');
// });

app.post(
  '/auth/register',
  registerValidation,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    res.json({
      success: true,
    });
  }
);

// app.get('/auth', (req: Request, res: Response) => {
//   console.log(req.body);
//   res.json({ success: true });
// });

// app.get('/dashboard', (req: Request, res: Response) => {
//   res.json({ services: ['one', 'two', 'three'] });
// });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
