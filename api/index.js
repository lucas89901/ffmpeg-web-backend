const express = require('express');
const fs = require('node:fs/promises');
const mime = require('mime-types');

const router = express.Router();

const root = 'D:/OBS Records';

router.get('/files', async (req, res) => {
  let files = await fs.readdir(root, {
    withFileTypes: true,
  });
  files = files.filter(
    (file) => file.isFile() && mime.lookup(file.name).startsWith('video/')
  );
  files = await Promise.all(
    files.map(async (file) => {
      file = {name: file.name};
      stat = await fs.stat(`${root}/${file.name}`);
      //console.log(stat);
      file.size = stat.size;
      file.lastModified = stat.mtime;
      return file;
    })
  );
  res.json(files);
});

module.exports = router;
