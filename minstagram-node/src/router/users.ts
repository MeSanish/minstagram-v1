import { Router } from 'express';
import crypto from 'crypto';

import user from '../models/user';
import { profileDTO } from '../dto/users';

const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const userFound = await user.findOne({ email: req.body.email })
    if(userFound) {
      throw new Error('User exists')
    } else {
      const passwordHash = crypto.pbkdf2Sync(req.body.password, 'salt', 20, 256, 'sha256');

      const createdUser = await user.create({
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
    const userFound = await user.findOne({ email: req.body.email})
    if(userFound) {
      const passwordHash = crypto.pbkdf2Sync(req.body.password, 'salt', 20, 256, 'sha256');
      
      if(passwordHash.toString('hex') === userFound.password) { 
        res.json({
          message: 'You guessed it right'
        })
      } else {
        throw new Error('You got it wrong bruh')
      }
    }
  } catch (error) {
    next(error) 
  }
})

userRouter.get('/:id', async (req, res, next) => {
  try {
    const userFound = await user.findById(req.params.id).populate('profile')
    if(userFound) {
      res.json(profileDTO(userFound))
    } else {
      throw new Error('Not Found')
    }
  } catch (error) {
    next(error)
  }
})

export default userRouter;