import { Router } from 'express'
import ReactionModel from '../models/reaction';

const reactionRouter = Router();

reactionRouter.get('/', async (req, res) => {
  try {
    const reactions = await ReactionModel.find()
    return res.json(reactions)
  } catch (error) {
    throw error
  }
});

export default reactionRouter;