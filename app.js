const express = require('express') // import
const app = express() //invoke
//routes
app.get('/', function (req, res) {
  res.send('Hello World')
});
//port number , host , callback func
app.listen(3000);