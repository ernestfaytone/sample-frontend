const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
var app_path = "../dist/frontend";

app.use('/', express.static(path.join(__dirname, app_path)))
.listen(PORT,()=>console.log('Listening on ${PORT}'));

// app.use(express.static(__dirname + '/dist/frontend'));

// app.get('/*', function(req,res) {
//     res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
// });