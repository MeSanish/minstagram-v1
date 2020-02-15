import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';

import resource from '../models/resource';

export const FILE_DESTINATION_PATH = './post-uploads/'

const diskStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    if(!fs.existsSync(FILE_DESTINATION_PATH)) {
      fs.mkdirSync(FILE_DESTINATION_PATH)
    }
    cb(null, FILE_DESTINATION_PATH)
  },
  filename: function(req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}.jpg`
    req.body.filename = filename
    cb(null, filename)
  }
})

const upload = multer({ storage: diskStorage }).single('upload')

const resourceRouter = Router();

resourceRouter.post('/', upload, async (req, res) => {
  const createdResource = await resource.create({
    path: req.body.filename
  })
  res.json(createdResource)
})

export default resourceRouter