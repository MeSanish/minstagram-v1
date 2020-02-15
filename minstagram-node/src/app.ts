import express from 'express';
import bodyParser from 'body-parser';

import reactionRouter from './router/reactions';
import resourceRouter from './router/resource';
import userRouter from './router/users';
import { errorHandler } from './middleware/error';
import verification from './middleware/verification';
import PostRouter from './router/posts';

const app = express();

app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('minstagram apis running..')
});

app.use('/v1/reactions', verification, reactionRouter);
app.use('/v1/users', userRouter);
app.use('/v1/upload', verification, resourceRouter);
app.use('/v1/posts', verification, PostRouter);

app.use('/static', express.static('post-uploads'))

app.use(errorHandler)

export default app;