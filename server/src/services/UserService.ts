import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator/src/validation-result';
import { getDb } from '../db';

import UserModel from '../models/User';
import { GetUserAuth } from '../interface/request';
import { errorHandlerWrapper } from '../handlers/errorHandler';

let db: any;

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey1313',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    return res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey1313',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Failed to login',
    });
  }
};

const getMe = async (req: GetUserAuth, res: Response) => {
  db = await getDb();

  const { passwordHash, ...userData } = await db
    .collection('users')
    .findOne({ _id: new ObjectId(req.userId) });

  return res.json(userData);
};

export const safelyGetMe = errorHandlerWrapper(getMe);
