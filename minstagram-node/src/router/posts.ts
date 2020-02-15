import { Router } from "express";

import Post from '../models/post';
import { postListDTO } from "../dto/post";
import User from "../models/user";
import Reaction from "../models/reaction";

const PostRouter = Router();

PostRouter.get('/', async (req, res) => {
  try {
    const postList = await Post.find().populate(['author', 'imageId'])
    res.json(postListDTO(postList))
  } catch (error) {

  }
});


PostRouter.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      imageId: req.body.imageId,
      caption: req.body.caption,
      author: req.body.authorId
    })
    res.json(newPost)

  } catch (error) {

  }
});

PostRouter.patch('/:postId/react', async (req, res, next) => {
  try {
    const newReaction = {
      reactedBy: req.body.reactorId,
      reaction: req.body.reactionId
    }
    const [postToUpdate, reactor, reactionType] = await Promise.all([
      Post.findById(req.params.postId), 
      User.findById(newReaction.reactedBy), 
      Reaction.findById(newReaction.reaction)])
    
    if (postToUpdate && reactor && reactionType) {
      const filteredReactions = postToUpdate.reactions.filter(
        ({ reactedBy }) => reactedBy.toString() !== newReaction.reactedBy);
      const updatedReactions = [
        ...filteredReactions,
        newReaction
      ]
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
        reactions: updatedReactions
      }, { new: true })
      res.json(updatedPost)
    } else {
      throw new Error('Params are invalid')
    }
  } catch (error) {
    next(error)
  }
})


export default PostRouter;