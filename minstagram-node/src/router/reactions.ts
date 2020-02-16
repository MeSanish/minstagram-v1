import { Router } from 'express'
import ReactionModel from '../models/reaction';
import { reactionListDTO } from '../dto/reactions';

const reactionRouter = Router();

reactionRouter.get('/', async (req, res) => {
  try {
    const reactions = await ReactionModel.find()
    return res.json(reactionListDTO(reactions))
  } catch (error) {
    throw error
  }
});

export default reactionRouter;