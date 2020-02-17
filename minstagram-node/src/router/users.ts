import { Router } from 'express';
import crypto from 'crypto';

import User from '../models/user';
import { profileDTO, userListDTO } from '../dto/users';
import config from '../config';
import { generateToken } from '../service/auth';
import verification, { IVerifiedRequest } from '../middleware/verification';

const SALT_ROUNDS = config.auth.saltRounds;

const userRouter = Router();

userRouter.get('/', verification, async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const searchRegx = new RegExp(`${searchTerm}`, 'g');
    const userList = await User.find({ email: searchRegx }, 'email profile').populate('profile')
    const userListWithProfileDetails = userList.map(userListDTO);
    res.json(userListWithProfileDetails)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) {
      throw new Error('User exists')
    } else {
      const passwordHash = crypto.pbkdf2Sync(req.body.password, 'salt',
        Number.parseInt(SALT_ROUNDS), 256, 'sha256');

      const createdUser = await User.create({
        email: req.body.email,
        password: passwordHash.toString('hex'),
        profile: req.body.profileId
      })
      res.json(createdUser);
    }
  } catch (error) {
    next(error)
  }
})

userRouter.post('/authorize', async (req, res, next) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) {
      const passwordHash = crypto.pbkdf2Sync(req.body.password, 'salt', Number.parseInt(SALT_ROUNDS), 256, 'sha256');

      if (passwordHash.toString('hex') === userFound.password) {
        const { accessToken, expiresIn } = generateToken({ id: userFound._id })
        res.json({
          accessToken,
          expiresIn
        })
      } else {
        throw new Error('You got it wrong bruh')
      }
    } else {
      throw new Error('Not found Bruh!')
    }
  } catch (error) {
    next(error)
  }
})

userRouter.get('/me', verification, async (req: IVerifiedRequest, res, next) => {
  try {
    if (req.auth) {
      const userFound = await User.findById(req.auth.userId)
        .populate('profile')
        .populate({ path: 'posts', populate: { path: 'imageId', select: 'path -_id' } })
      if (userFound) {
        res.json(profileDTO(userFound))
      } else {
        throw new Error('Not Found')
      }
    }
  } catch (error) {
    next(error)
  }
});

userRouter.get('/:userId', verification, async (req, res, next) => {
  try {
    const userFound = await User.findById(req.params.userId)
      .populate('profile')
      .populate({ path: 'posts', populate: { path: 'imageId', select: 'path -_id' } })
    if (userFound) {
      res.json(profileDTO(userFound))
    } else {
      throw new Error('Not Found')
    }
  } catch (error) {
    next(error)
  }
})

userRouter.get('/posts', verification, async (req: IVerifiedRequest, res, next) => {
  try {
    if (req.auth) {
      const userFound = await User.findById(req.auth.userId).populate(['posts']);
      if (userFound) {
        res.json(userFound.posts)
      }
    }
  } catch (error) {
    next(error)
  }
})

userRouter.patch('/me', verification, async (req:  IVerifiedRequest, res, next) => {
  try {
    if(req.auth) {
      const userFound = await User.findByIdAndUpdate(req.auth.userId, {
        profile: req.body.profileId
      }, { new: true })
      if(!userFound) {
        throw new Error("Don\'t exist bruh!!")
      } else {
        return res.json(userFound)
      }
    } else {
      throw new Error("No id bruh!!")
    }
  } catch (error) {
    next(error)
  }
})

export default userRouter;