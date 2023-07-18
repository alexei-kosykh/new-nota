import express from 'express';

import { registerValidation } from './validations/auth';
import { connectToDb, getDb } from './db';

import checkAuth from './middleware/checkAuth.js';
import * as UserService from './services/UserService';

const app = express();
let db: any;
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/auth/login', UserService.login);

app.post('/auth/register', registerValidation, UserService.register);

app.get('/auth/me', checkAuth, UserService.safelyGetMe);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);

  await connectToDb();
});
