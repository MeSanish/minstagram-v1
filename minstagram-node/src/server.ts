import mongoose from 'mongoose';

import app from './app';
import config from './config';

const { dbUrl } = config.mongo;

const server = app.listen(app.get('port'), function(error: Error){
  try {
    if(error) {
      console.log('Failed to start')
      console.log(error)
    } else {
      initMongo();
      console.log(`minstagram is chill at ${app.get('port')} 😍`)
    }
  } catch (error) {
    server.close();
  }
})

function initMongo() {
  mongoose.connect(`${dbUrl}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    user: config.mongo.mongoUsername,
    pass: config.mongo.mongoPassword,
  });
  const db = mongoose.connection;
  db.once('open', () => {
    console.log(`Connected to DB ${dbUrl}`);
  });
  
  db.on('error', (error: Error) => {
    console.log(error);
    throw error;
  });
}
export default server;