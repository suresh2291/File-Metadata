'use strict';
///api/fileanalyse
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
// require and use "multer"...

var app = express();
app.use(fileUpload())
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse',(req, res)=>{
  var fileUpload = req.files.upfile
  if (Object.keys(req.files).length == 0) {
    //{"username":saveData.username,"id":saveData.shortId}
    return res.status(400).send({"Error":"No files were uploaded."});
  }
 console.log(req.files.upfile);
  console.log('filename    ',fileUpload.name)
  console.log('filetype   ',fileUpload.mimetype)
  console.log('fileSize    ',fileUpload.size )
  //name: "download (2).jpg",
//type: "image/jpeg",
//size: 9243
res.send({"name":fileUpload.name,"type":fileUpload.mimetype,"size":fileUpload.size})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
