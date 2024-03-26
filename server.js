require('dotenv').config();
require('./config/database');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use("/api/bookmarks", require("./routes/bookmarks"));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})